const userModel = require('../db/models/user.model');
const bcrypt = require('bcrypt');

class UserController{

    async getAll(req, res){
        try {
            const result = await userModel.find();
            res.status(200).json({data : result});
        } catch (error) {
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async getById(req, res){
        try {
            let result = await userModel.findById(req.params.id);
            res.status(200).json({data : result});
        } catch (error) {
            // res.status(500).json({"message" : "Something Went Wrong"});
            res.status(200).json({data : null});
        }
    }

    async add(req,res){
        try {
            let account = await userModel.findOne({email:req.body.email});
            if(account){
                res.status(400).json({"message" : "Email has been used"});
            }else{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                const newUser = new userModel(req.body)
                await newUser.save();
                res.status(201).json({"message" : "User Created"});
            }
        } catch (error) {
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async deleteById(req, res){
        try {
            const result = await userModel.findByIdAndDelete(req.params.id);
            if(result){
                res.status(200).json({"message" : "User Deleted"});
            }else{
                res.status(404).json({"message" : "User Not Found"});
            }
            
        } catch (error) {
            res.status(404).json({"message" : "User Not Found"});
        }
    }

    async updateById(req, res){
        try {
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
            }
            
            const result = await userModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
              );
            if(result){
                res.status(200).json({"message" : "User Updated"});
            }else{
                res.status(404).json({"message" : "User Not Found"});
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({"message" : "User Not Found"});
        }
    }

    async getProfile(req, res) {
        try {
            let result = await userModel.findOne({email:req.user.email}).select('-admin');
            res.status(200).json({data : result});
        } catch (error) {
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async updateProfile(req, res) {
        try {
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
            }
            
            const result = await userModel.findByIdAndUpdate(
                req.user.id,
                { $set: req.body },
                { new: true }
              );
            if(result){
                res.status(200).json({"message" : "User Updated"});
            }else{
                res.status(404).json({"message" : "User Not Found"});
            }
        } catch (error) {
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }
}

module.exports = new UserController();