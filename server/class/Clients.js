module.exports = function Clients() {
    
    var sockets = {};

    this.addSocket = function (socket) {
        socket.on('disconnect', function () {
            
        });
        this.sockets.push(socket);
    }
}