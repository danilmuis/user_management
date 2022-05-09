const express = require('express');
require('dotenv').config()
const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const PORT = process.env.PORT || 30000
const db = require("./configs/db");

// enable logging
if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('combined'))
}

// Connect to DB
db()
  .then(() => console.log("Connected to DB"))
  .catch((err) => `Error Connection to DB ${err.message}`);
  
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options('*', cors());


app.use('/v1', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).send({
        "message" : "Not Found"
    })
    next();
});

app.listen(PORT,() => console.log('App running on port '+PORT))
module.exports = app;