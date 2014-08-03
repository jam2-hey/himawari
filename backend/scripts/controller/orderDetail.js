angular.module('BackendHimawari')
    .controller('orderDetail', ['$scope', 'api', 'ngDialog', orderDetail]);
    
function orderDetail($scope, api, ngDialog) {
    $scope.$on('openOrderDetail', function (event, data) {
        
    });
}