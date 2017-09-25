/**
 * Created by immanuelpelzer on 24.09.17.
 */
EmptyCtrl.$inject = ['User','StudentDataOp']; // e.g. 'Chat'

function EmptyCtrl (User, StudentDataOp) { // e.g. (Chat)
    var ctrl = this;

    StudentDataOp.getStudents().then(function () {
        ctrl.show = "super";
    }).catch(function (err) {
        ctrl.show = "err";
    });

    ctrl.show = "nothing";
    ctrl.stuff = function() {
    };
}

angular.module('myApp').component('emptyStuff', {
    templateUrl: 'common/components/empty/empty.template.html',
    controller: EmptyCtrl,
    bindings: { // see https://docs.angularjs.org/guide/component
        item: '=', // two way
        hero: '<', // one way binding
        comment: '@', // string
        onDelete : '&' // function callbacks
    }
});
