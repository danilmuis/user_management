const joi = require('joi');
const passwordErrorMessage = "Password must have at least 8 characters, uppercase, lowercase, number, and symbol";

function errorMessage(error){
    let error_message = [];
    error.details.forEach(item => {
        const err_obj = {
            [item.path] : item.message.replace(/\"/gi, '')
        }
        error_message.push(err_obj)
    });
    return error_message;
}

class Validation{
    
    async validateAddUser(req, res, next){

        const schema = joi.object({
            email : joi.string().required(),
            name : joi.string().required(),
            password : joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8})/).required().label("Password").messages({"string.pattern.base": passwordErrorMessage}),
            admin : joi.boolean().required()
        });
        try {
            await schema.validateAsync(req.body, {abortEarly: false});
            next()
        } catch(error) {
            res.status(400).json({message: errorMessage(error)});
        }

    }

    async validateUpdateUser(req, res, next){

        const schema = joi.object({
            name : joi.string(),
            password : joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8})/).label("Password").messages({"string.pattern.base": passwordErrorMessage}),
            admin : joi.boolean()
        });
        try {
            await schema.validateAsync(req.body, {abortEarly: false});
            next()
        } catch(error) {
            res.status(400).json({message: errorMessage(error)});
        }

    }

    async validateUpdateProfile(req, res, next){

        const schema = joi.object({
            name : joi.string(),
            password : joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8})/).label("Password").messages({"string.pattern.base": passwordErrorMessage}),
        });
        try {
            await schema.validateAsync(req.body, {abortEarly: false});
            next()
        } catch(error) {
            res.status(400).json({message: errorMessage(error)});
        }

    }

}

module.exports = new Validation();

