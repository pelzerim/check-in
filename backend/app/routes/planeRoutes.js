/**
 * Created by immanuelpelzer on 25.09.17.
 */
'use strict';
module.exports = function(app) {
    var checkInController = require('../controllers/checkInController');

    // /planes Route: Get all planes
    app.route('/planes')
        .get(checkInController.list_all_planes)
        .post(checkInController.create_a_plane);

    // /plane/{planeId} route: Get single plane by id
    app.route('/planes/:planeId')
        .get(checkInController.read_a_plane)

};