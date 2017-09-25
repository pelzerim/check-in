PayCtrl.$inject = ['CheckIn']; // e.g. 'Chat'

function PayCtrl (CheckIn) { // e.g. (Chat)
    var ctrl = this;
    ctrl.pay = function () {
        ctrl.onDidPay();
    }
}

angular.module('myApp').component('pay', {
    templateUrl: 'common/components/pay/pay.template.html',
    controller: PayCtrl,
    bindings : {
        onDidPay : "&"
    }
});
