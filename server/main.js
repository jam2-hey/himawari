function Himawari() {

    var io, Route, Router,
        sockets = {
            clients: [],
            backend: null
        }

    main();

    function main() {
        requires();
        handleConnections();
    }

    function requires() {
        // Libraries
        io = require('socket.io').listen(9999);
        // Classes
        Route = require('./class/Route.js');
        Router = require('./class/Router.js');
    }

    function handleConnections() {
        var client_socket = io.of('/client'),
            backend_socket = io.of('/backend');

        client_socket.on('connection', function(socket) {
            sockets.clients.push(socket);
        });

        backend_socket.on('connection', function(socket) {
            sockets.backend = socket;
        });
    }
}

var app = new Himawari();
