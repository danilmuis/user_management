const userModel = require('../db/models/user.model');
const tokenModel = require('../db/models/token.model');
const validation = require('../helpers/validation');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

class PublicController{

    async login(req, res){
        try{
            const userFound = await userModel.find({'email' : req.body.email}).select('+password');
            const checkLogin = await bcrypt.compare(req.body.password, userFound[0].password);
            if(checkLogin){
                const token = await auth.generateAuthToken(userFound[0]);
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
            const tokenFound = await tokenModel.find({token : req.body.refresh_token});
            if(tokenFound){
                const newToken = await auth.verifyRefreshToken(tokenFound[0].token);
                if(newToken){
                    res.status(200).json(newToken);
                }else{
                    await tokenModel.findOneAndDelete({token : tokenFound[0].token});
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