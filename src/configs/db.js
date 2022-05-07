var mongoose = require('mongoose');
const seeder = require('../db/seeds/user.seed');
const config = require('./config');
let url = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}` + 
      `@${config.MONGO_HOST}:${config.MONGO_PORT}`;
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
};
module.exports = () => {
    console.log(`Connect to mongodb with url ${url} and options ${JSON.stringify(options)}`);
    mongoose.set('debug', true);
    mongoose.connect(url, options);
    const connection = mongoose.connection;

    connection.once("open", function() {
        console.log("MongoDB database connection established successfully");
        seeder();
    });
    return mongoose.connect(url);
};