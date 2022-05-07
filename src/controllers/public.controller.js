const userModel = require('../db/models/user.model');
const tokenModel = require('../db/models/token.model');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

class PublicController{

    async login(req, res){
        try{
            const userFound = await userModel.findOne({'email' : req.body.email}).select('+password');
            const checkLogin = await bcrypt.compare(req.body.password, userFound.password);
            if(checkLogin){
                const token = await auth.generateAuthToken(userFound);
                if(token){
                    res.status(200).json(token);
                }else{
                    res.status(500).json({"message" : "Something Went Wrong"});
                }
            }
            else{
                res.status(401).json({"message" : "Login Failed"});
            }
        } catch(error){
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async refreshToken(req, res){
        try{
            const tokenFound = await tokenModel.findOne({token : req.body.refresh_token});
            if(tokenFound){
                const newToken = await auth.verifyRefreshToken(tokenFound.token);
                if(newToken){
                    res.status(200).json(newToken);
                }else{
                    await tokenModel.findOneAndDelete({token : tokenFound.token});
                    res.status(401).json({"message" : "Unauthorized"});
                }
            }else{
                res.status(401).json({"message" : "Unauthorized"});
            }
        } catch(error){
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

}

module.exports = new PublicController();