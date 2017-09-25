/**
 * Created by immanuelpelzer on 25.09.17.
 */
'use strict';
module.exports = function(app) {
    var checkInController = require('../controllers/checkInController');

    // /planes Route: Get all planes, add plane
    app.route('/planes')
        .get(checkInController.list_all_planes)
        .post(checkInController.add_a_plane);

    // /plane/{planeId} route: Get single plane by id
    app.route('/planes/:planeId')
        .get(checkInController.read_a_plane);

    // /plane/{planeId}/passangers route: Get all passangers
    app.route('/planes/:planeId/passengers')
        .get(checkInController.list_all_passengers)
        .post(checkInController.add_passenger);

    // /plane/{planeId}/seats route: Get all seats
    app.route('/planes/:planeId/seats')
        .get(checkInController.list_all_seats);

    // /plane/{planeId}/seats route: Get all seats
    app.route('/planes/:planeId/seats/:seatId')
        .get(checkInController.read_seat)
        .put(checkInController.update_seat);


    // DEBUG
    // /plane/{planeId}/seats route: Get all seats
    app.route('/seats')
        .get(checkInController.list_all_the_seats);
    // DEBUG
    // /plane/{planeId}/seats route: Get all seats
    app.route('/login')
        .get(checkInController.login);

};