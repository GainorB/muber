const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// app takes incoming HTTP requests
// depending on the route/method it will run some time of code
const app = express();

// if the NODE_ENV isn't test we will connect to this DB
// else in test/test_helper we connect to the muber_test DB
if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber', { useMongoClient: true });
}

// fix mongoose deprecation promise error
mongoose.Promise = global.Promise;

// app.use has to be before the routes call
app.use(bodyParser.json());

routes(app);

// error handling middleware
// define after routes call
// we can use app.use to register any middleware with Express

// parameters
    // err: will be defined if the previous middleware through an error
    // incoming request object and outgoing response object
    // next: a function, you call to forceablly go to the next middleware in chain
app.use((err, req, res, next) => {
    console.log(err)
    // 422 Unprocessable Entity
    res.status(422).json({ error: err.message });
});

module.exports = app;