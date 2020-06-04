/* eslint-disable no-console */
// import required packages
const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');

// import configurations
const properties = require('./config/properties');
const db = require('./config/database');

// ========= Routes ============
const tasksRoutes = require('./api/tasks/tasks.routes');
const userRoutes = require('./api/users/users.routes');

const app = express();

// configure bodyparser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

// initialise express router
const router = express.Router();

// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
    );
    next();
});

// use express router
app.use('/api', router);

// call routing
tasksRoutes(router);
userRoutes(router);

// intialise server
// eslint-disable-next-line no-unused-vars
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
});
