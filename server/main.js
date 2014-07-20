function Himawari() {

    var io,
        clients = [],
        backend = null;

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
            clients.push(socket);s
        });

        backend_socket.on('connection', function(socket) {
            backend = socket;
        });
    }
}

var app = new Himawari();
