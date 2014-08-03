angular.module('BackendHimawari')
    .controller('orderListController', ['$rootScope', '$scope', 'api', orderListController]);
    
function orderListController($rootScope, $scope, api) {
    var data = {i: 0, total: 4};

    api.get('/orders/current/')
        .then(function (data) {$scope.orders = data; check(); });
    api.get('/menus/')
        .then(function (data) {$scope.menu = data; check(); });
    api.get('/members/')
        .then(function (data) {$scope.members = data; check(); });
    api.get('/menus/groups/')
        .then(function (data) {$scope.groups = data; check(); });

    function check () {
        data.i = data.i + 1;
        if (data.i == data.total) allDone();
    }

    function allDone() {
        mapMember();
        processOrders();
        console.log($scope);
        $scope.$apply();
    }

    function mapMember() {
        $scope.member_map = {}
        for (var i in $scope.members) {
            $scope.member_map[$scope.members[i].username] = $scope.members[i];
        }
    }

    function processOrders() {
        var rows = [], row = [], idx = 0, t_pirce = 0;
        for (var k in $scope.orders) {
            t_pirce = 0;
            for (var dk in $scope.orders[k].detail) {
                t_pirce = t_pirce + $scope.orders[k].detail[dk].price;
            }
            $scope.orders[k].total_price = t_pirce;
            row.push($scope.orders[k]);
            if ((idx + 1) % 5 == 0) {
                rows.push(row);
                row = [];
            }
            idx++;
        }
        rows.push(row);
        $scope.rows = rows;
    }

    this.openOrderDetail = function (order_id) {
        console.log('open!');
        $rootScope.$broadcast('openOrderDetail', order_id);
    }
}
