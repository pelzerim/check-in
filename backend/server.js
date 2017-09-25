// Librarys
const express        = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser     = require('body-parser');
const app            = express();

const port = process.env.PORT || 7000;


// Model
var Model = require('./app/models/model');

// Enable CORS for development
app.use(cors());

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/checkIn');

/// Express setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable cors for development
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Register routes
var routes = require('./app/routes/planeRoutes');
routes(app);

// 404 handling
app.use(function(req, res) {
    res.status(404).send(
        {url: req.originalUrl + ' was not found'}
        )
});

app.listen(port, () => {
    console.log('Listening to port ' + port);
});
