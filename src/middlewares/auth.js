const jwt = require("jsonwebtoken");
const config = require('../configs/config');
const moment = require('moment');
const tokenModel = require('../db/models/token.model');

class Authentication{

    async verifyToken(req, res, next){
        try {
            const bearer_header = req.headers['authorization'];
            const token = bearer_header.split('Bearer ')[1];
            const decoded_data = await jwt.verify(token, config.JWT_SECRET);
            req.user = decoded_data;
            next();
        } catch(error){
            res.status(401).json({ message: 'Unauthorized' });
        }
    }

    async verifyRefreshToken(token){
        try {
            const decodedToken = await jwt.verify(token, config.JWT_SECRET);
            if(moment().unix() < decodedToken.exp){
                return await this.generateAuthToken(decodedToken);
            }else{
                return null;
            }
        } catch(error){
            return null;
        }
    }
    
    generateToken(payload, expires){
        payload.iat = moment().unix();
        payload.exp = expires.unix();
        return jwt.sign(payload, config.JWT_SECRET);
    }
      
    async saveToken(token){
        const newToken = new tokenModel({token : token})
        await newToken.save();
        
    }

    async generateAuthToken(user){
        try {
            const id = user.id || user._id.toString();
            const accessTokenExpires = moment().add(config.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
            const payload = {
                id: id,
                email: user.email,
                name: user.name,
                admin : user.admin
            }
            const accessToken = this.generateToken(payload, accessTokenExpires);
            const refreshTokenExpires = moment().add(config.JWT_REFRESH_EXPIRATION_DAYS, 'days');
            const refreshToken = this.generateToken(payload, refreshTokenExpires);
            await this.saveToken(refreshToken);
        
            return {
                access: {
                    token: accessToken,
                    expires: accessTokenExpires.format("DD/MM/YYYY HH:mm:ss"),
                },
                refresh: {
                    token: refreshToken,
                    expires: refreshTokenExpires.format("DD/MM/YYYY HH:mm:ss"),
                }
            };
        } catch (error) {
            return null;
        }
    }

    adminCheck(req, res, next){
        if (req.user.admin) {
            next();
        }else{
            res.status(403).json({"message" : "Forbidden"});
        }
    }
}

module.exports = new Authentication();
