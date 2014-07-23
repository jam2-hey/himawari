module.exports = function Router() {
    
    var routes = {'get': [], 'post': [], 'update': [], 'delete': []};

    this.route = function (route) {
        if (typeof route == 'Route') {
            routes[route.getMethod].push(route);
        } else {
            throw "Himawari.Route: Invalid 'Route' object.";
        }
    }
    
    this.match = function (reqMethod, reqUrl) {
        var pre_regex, regex, route, args;
        if (!regMethod.toLowerCase() in routes) throw "Himawari.Router: Method unknown.";
        for (var i = 0; i < routes[reqMethod].length; i++) {
            route = routes[reqMethod]routes[i];
            pre_regex = route.getUrl().replace(/\/:[\w]+\//g, '/([\\w\\d]+)/');
            regex = new RegExp('^' + pre_regex + '$');
            if (reg.test(reqUrl)) {
                args = reg.match(regUrl).splice(1);
                return {action: route.getAction(), args: args};
            }
        }
        return false;
    }
    
    this.load = function (file, callback) {
        var route_def;
        require('fs').readFile(file, 'utf8', function (ex, data) {
            if (ex) throw 'Himawari.Router: Load error, due to \'' + ex + '\'';
            route_def = JSON.parse(data);
            process();
        });
        function process() {
            var r;
            for (var i = 0; i < route_def.length; i++) {
                r = route_def[i];
                this.route(new Route(r[0], r[1], r[2]));
            }
            if (typeof callback === 'function') callback();
        }
    }
}