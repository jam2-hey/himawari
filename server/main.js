function Himawari() {

    var io,
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
        io = require('socket.io').listen(9999);
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
