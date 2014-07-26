module.exports = function Clients() {

    var sockets = {};

    this.addSocket = function (socket) {
        socket.on('disconnect', function () {
            console.log("Socket Disconnected: " + this.id);
            delete sockets[this.id]
        });
        
        sockets[socket.id] = socket;
    }
}