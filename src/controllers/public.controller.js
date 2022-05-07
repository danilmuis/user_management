const userModel = require('../db/models/user.model');
const authentication = require('../middlewares/auth');
const validation = require('../helpers/validation');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

class PublicController{

    async login(req, res){
        try{
            const userFound = await userModel.find({'email' : req.body.email});
            const checkLogin = await bcrypt.compare(req.body.password, userFound[0].password);
            if(checkLogin){
                const token = auth.generateAccessToken({
                    email: userFound[0].email,
                    name: userFound[0].name,
                    admin : userFound[0].admin
                });
                const data = {
                    access_token : token,
                    refresh_token : token
                }
                res.status(200).json(data);
            }
            else{
                res.status(401).json({"message" : "Login Failed"});
            }
        } catch(error){
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

}

module.exports = new PublicController();