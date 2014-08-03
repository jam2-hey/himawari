angular.module('BackendHimawari')
    .controller('mainCtrl', function($scope, ngDialog) {
        $scope.$on('openOrderDetail', function (event, data) {
            ngDialog.open({
                template: 'template/orderDetail.html',
                controller: 'orderDetail',
                className: 'ngdialog-theme-default orderDetail'
            });
        });
    });
