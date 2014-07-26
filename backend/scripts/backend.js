var app = angular.module('BackendHimawari', []);

var socket = io('http://ws-api.himawari.local:9999/backend');
socket.connect();

var api = new Api(socket);

api.get('/members/').then(function (data) {
    console.log("Back!");
    console.log(data);
})