module.exports = function Backend() {

    var socket,
        router;

    this.setRouter = function (_router) {
        router = _router;
    }

    this.setSocket = function (_socket) {
        var that = this;
        if (socket) {
            console.log("Backend already connected: Disconnect.");
            socket.disconnect();
        }
        console.log("Set backend socket: " + _socket.id);
        socket = _socket;

        socket.on('api', function (req, callback) {
            var route = router.match(req.method, req.target),
                parts, action_func;
            if (route) {
                parts = route.name.split('.');
                action_model = that.actions_model[parts[0]];
                console.log(route.args);
                action_model[parts[1]].apply(action_model, route.args)
                    .then(function (r) {
                        callback({status: 0, data: r})
                    });
            } else {
                callback({status: 1})
            }
        });
    }

    this.actions_model = {
        'members': require('../model/members.js'),
        'orders': require('../model/orders.js'),
        'menus': require('../model/menu.js')
    }
}