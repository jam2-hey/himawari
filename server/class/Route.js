module.exports = function Route(_method, _url, _action) {

    var method, url, action,
        METHODS = ['get', 'post', 'update', 'delete'];

    var _ = require('underscore');

    init();

    function init() {
        if (_.indexOf(METHODS, _method.toLowerCase()) == -1) {
            throw "Himawari.route: Method unknown.";
        }
        method = _method;
        url = ('/' + _url + '/').replace(/\/\//g, '/');
        action = _action;
        console.log('New Route:' + method + ":" + url + '-> ' + action);
    }

    this.getMethod = function () { return method; }

    this.getUrl = function () { return url; }

    this.getAction = function () { return action; }
}