/**
 * Created by erlend on 26.11.2016.
 */




// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var btoa = require('btoa');

var cors = require('cors');// call express
var superagent = require('superagent');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;        // set our port

var moment = require('moment');

const basicAuth = `Basic ${btoa('admin:district')}`;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/organisationUnits')

// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {


        superagent.post('https://play.dhis2.org/test/api/organisationUnits')
            .send(req.body)
            .set('Authorization', basicAuth)
            .set('Accept', 'application/json')
            .end(function(err, response){
                console.log(response)
                res.json(response)
            });

        });



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);