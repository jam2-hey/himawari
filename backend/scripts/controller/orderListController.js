angular.module('BackendHimawari')
    .controller('orderListCtrl', ['$scope', 'api', function ($scope, api) {
        api.get('/orders/current/')
            .then(function (data) {
                $scope.orders = data;
                console.log(data);
            })
            .then(function () {
                return api.get('/menus/');
            })
            .then(function (data) {
                $scope.menu = data;
                console.log(data);
                return api.get('/members/');
            })
            .then(function (data) {
                $scope.member = data;
                console.log(data);
                $scope.member_map = {}
                for (var i in data) {
                    $scope.member_map[data[i].username] = data[i];
                }
                var rows = [], row = [], idx = 0, t_pirce = 0;
                for (var k in $scope.orders) {
                    t_pirce = 0;
                    for (var dk in $scope.orders[k].detail) {
                        t_pirce = t_pirce + $scope.orders[k].detail[dk].price;
                    }
                    $scope.orders[k].total_price = t_pirce;
                    row.push($scope.orders[k]);
                    console.log($scope.orders[k]);
                    if ((idx + 1) % 5 == 0) {
                        rows.push(row);
                        row = [];
                    }
                    idx++;
                }
                rows.push(row);
                $scope.rows = rows;
                $scope.$apply();
            }).fail(function (err) {
                console.log(err);
                console.log(err.stack);
            });
    }]);