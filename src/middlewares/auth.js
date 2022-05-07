const jwt = require("jsonwebtoken");
const config = require('../configs/config');

class Authentication{

    async verifyToken(req, res, next){
        try {
            const bearer_header = req.headers['authorization'];
            const token = bearer_header.split('Bearer ')[1];
            const decoded_data = await jwt.verify(token, config.JWT_SECRET);
            req.user = decoded_data;
            next();
        } catch(error){
            res.status(401);
            res.json({ message: 'Unauthorized' });
        }
    }

    generateAccessToken(data){
        return jwt.sign(data, config.JWT_SECRET, { expiresIn: "1800s" });
    }
}

module.exports = new Authentication();
