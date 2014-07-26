var app = angular.module('BackendHimawari', []);

var socket = io('http://ws-api.himawari.local:9999/backend');
socket.connect();