module.exports = function Router() {

    var routes = {'get': [], 'post': [], 'update': [], 'delete': []};

    var Route = require('./Route.js');
    var Q = require('q');

    this.addRoute = function (route) {
        if (route instanceof Route) {
            routes[route.getMethod()].push(route);
        } else {
            throw "Himawari.Router: Invalid 'Route' object.";
        }
    }

    this.match = function (reqMethod, reqUrl) {
        var pre_regex, regex, route, args;

        if (!reqMethod.toLowerCase() in routes) throw "Himawari.Router: Method unknown.";
        for (var i = 0; i < routes[reqMethod].length; i++) {
            route = routes[reqMethod][i];
            pre_regex = route.getUrl().replace(/\/:[\w]+\//g, '/([\\w\\d]+)/');
            regex = new RegExp('^' + pre_regex + '$');
            if (regex.test(reqUrl)) {
                args = regex.exec(reqUrl).splice(1);
                return {name: route.getAction(), args: args};
            }
        }
        return false;
    }

    this.load = function (file) {
        var self = this,
            deferred = Q.defer();

        require('fs').readFile(file, 'utf8', function (ex, data) {
            if (ex) throw 'Himawari.Router: Load error, due to \'' + ex + '\'';
            var route_def = JSON.parse(data);
            for (var i = 0; i < route_def.length; i++) {
                r = route_def[i];
                self.addRoute(new Route(r[0], r[1], r[2]));
            }
            deferred.resolve();
        });
        return deferred.promise;
    }

    this.getRoutes = function () {
        return routes;
    }
}