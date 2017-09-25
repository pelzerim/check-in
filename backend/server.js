// Librarys
const io = require('socket.io')();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = 7000;

// Prepare sockets
io.listen(3000)
io.sockets.on('connection', function (socket) {
    console.log("connected");
});
module.exports.io = io;

// Model
var Model = require('./app/models/model');

// Enable CORS for development
app.use(cors());

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/checkIn');

/// Express setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Enable cors for development
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");

    next();
});

// Register routes
var routes = require('./app/routes/planeRoutes');
routes(app);

// 404 handling
app.use(function (req, res) {
    res.status(404).send(
        {url: req.originalUrl + ' was not found'}
    )
});




module.exports = {
    server: app.listen(port, () => {
        console.log('Listening to port ' + port);
    })
};

