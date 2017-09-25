'use strict';


var mongoose = require('mongoose'),
    Plane = mongoose.model('Plane');

exports.list_all_planes = function(req, res) {
    Plane.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_a_plane = function(req, res) {
    var new_plane = new Plane(req.body);
    new_plane.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_plane = function(req, res) {
    Plane.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
