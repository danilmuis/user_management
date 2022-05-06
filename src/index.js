const express = require('express');
const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const PORT = process.env.NODE_PORT || 30000
// enable logging
app.use(morgan('combined'))

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
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    res.status(404).send({
        "messagee" : "Not Found"
    })
    next();
});

app.listen(PORT,() => console.log('App running on port '+PORT))
module.exports = app;