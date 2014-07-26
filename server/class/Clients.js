module.exports = function Clients() {

    var sockets = {},
        router;

    this.setRouter = function (_router) {
        router = _router;
    }

    this.addSocket = function (socket) {
        socket.on('disconnect', function () {
            console.log("Socket Disconnected: " + this.id);
            delete sockets[this.id]
        });
        
        sockets[socket.id] = socket;
    }
}