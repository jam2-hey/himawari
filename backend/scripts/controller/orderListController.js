angular.module('BackendHimawari')
    .controller('orderListCtrl', ['$scope', 'api', function ($scope, api) {
        api.get('/orders/current/')
            .then(function (data) {
                $scope.orders = data;
            })
            .then(function () {
                return api.get('/members/');
            })
            .then(function (data) {
                $scope.member = data;
                $scope.member_map = {}
                for (var i in data) {
                    $scope.member_map[data[i].username] = data[i];
                }
                $scope.$apply();
            });
    }]);