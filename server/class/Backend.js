module.exports = function Backend() {

    var socket;

    this.setSocket = function (_socket) {
        if (socket) {
            console.log("Backend already connected: Disconnect.");
            socket.disconnect();
        }
        console.log("Set backend socket: " + _socket.id);
        socket = _socket;
    }
}