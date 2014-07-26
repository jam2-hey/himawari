function Api(_socket) {
    var socket = _socket,
        RESPONSE_CODE = {OK: 0, FAILED: 1};

    initialize();

    function initialize() {

    }

    this.get = function (target, data) {
        return request('get', target, data);
    };

    this.post = function (target, data) {
        return request('post', target, data);
    };

    this.update = function (target, data) {
        return request('update', target, data);
    };

    this.del = function (target, data) {
        return request('del', target, data);
    };

    function request (method, target, data) {
        var deferred = q.defer();
        socket.emit('api', {method: method, target: target, data: data}, function(response) {
            if (response.status == RESPONSE_CODE.OK) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    }
}