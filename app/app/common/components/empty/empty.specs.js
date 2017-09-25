// /**
//  * Created by immanuelpelzer on 24.09.17.
//  */
// 'use strict';
//
// // Mocked Service
// angular.module('mock.chat', []).
// factory('Chat', function($q) {
//     var userService = {};
//     var self = this;
//     self.counter = 0;
//
//     userService.login = function() {
//         if (self.counter != 0){
//             return $q.reject({error: 0, message: "Name taken"});
//         } else {
//             self.counter++;
//             var mockUser = {
//                 id: 8888,
//                 name: "test user"
//             };
//             return $q.when(mockUser);
//         }
//
//     };
//     return userService;
// });
//
// describe('ChatLoginComponent', function() {
//
//     var $componentController;
//     var ctrl, scope;
//
//     beforeEach(module('myApp'));
//
//     // Test the controller
//     describe('Error message should', function() {
//
//         beforeEach(inject(function(_$componentController_) {
//             $componentController = _$componentController_;
//             ctrl = $componentController('chatLogin', null);
//
//         }));
//
//         it(' have an empty error on start', function() {
//             expect(ctrl.errorMessage).toEqual('');
//         });
//
//         it(' set error message to the one passed', function() {
//             ctrl.setError("Name taken");
//             expect(ctrl.errorMessage).toEqual("Name taken");
//         });
//
//         it(' reset error message right', function() {
//             ctrl.setError("Name taken");
//             ctrl.setError("");
//             expect(ctrl.errorMessage).toEqual("");
//         });
//     });
//
//     // Test the controller
//     describe('Login function should', function() {
//
//         var Chat, $scope, onSuccessSpy;
//
//         beforeEach(module('mock.chat'));
//
//         beforeEach(inject(function(_$componentController_, _$rootScope_, _Chat_) { // inject mocked service
//             Chat = _Chat_;
//
//             $scope = _$rootScope_.$new();
//             onSuccessSpy = jasmine.createSpy('onSuccessfulLogin');
//             var bindings = {
//                 onSuccessfulLogin: onSuccessSpy
//             };
//
//             ctrl = _$componentController_('chatLogin', {
//                 Chat: Chat,
//                 $scope : $scope
//             }, bindings);
//         }));
//
//         it('should show "name taken" after second login', function() {
//             ctrl.login("Immi");
//             ctrl.login("Immi");
//             $scope.$apply();
//             expect(ctrl.errorMessage).toBe("Name taken");
//         });
//
//         it('should call the `onSuccessfulLogin` binding, after successful login', function() {
//             ctrl.login("Immi");
//             $scope.$apply();
//             expect(onSuccessSpy).toHaveBeenCalled();
//         });
//     });
// });
