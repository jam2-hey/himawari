angular.module('BackendHimawari')
    .config(function ($provide) {
        $provide.factory('api', function () {
            var socket = io('http://ws-api.himawari.local:9999/backend');
            socket.connect();
            return new Api(socket);
        });
    })