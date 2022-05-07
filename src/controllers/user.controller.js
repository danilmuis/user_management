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
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async add(req,res){
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
            const newUser = new userModel(req.body)
            await newUser.save();
            res.status(201).json({"message" : "User Created"});
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
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async updateById(req, res){
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
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
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async getProfile(req, res) {
        try {
            let result = await userModel.find({email:req.user.email});
            res.status(200).json({data : result});
        } catch (error) {
            res.status(500).json({"message" : "Something Went Wrong"});
        }
    }

    async updateProfile(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
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