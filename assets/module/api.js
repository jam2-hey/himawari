function Api(_socket) {
    var socket,
        RESPONSE_CODE = {OK: 0, FAILED: 1};
    
    initialize();
    
    function initialize() {
        socket = _socket;
    }
    
    this.get = function (target, data) {
        return new Promise(function (fulfill, reject) {
            socket.emit('get-api-call', {target: target, data: data}, function(response) {
                if (response.status == RESPONSE_CODE.OK) {
                    fullfill(response.body);
                } else {
                    reject(response.error);
                }
            })
        });
    };
    
    this.post = function (target, data) {
        return new Promise(function (fulfill, reject) {
            socket.emit('post-api-call', {target: target, data: data}, function(response) {
                if (response.status == RESPONSE_CODE.OK) {
                    fullfill(response.body);
                } else {
                    reject(response.error);
                }
            })
        });
    };
}