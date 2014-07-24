function Himawari() {

    var CONFIG_FILE = './config.json',
        config,
        io,
        db,
        router,
        clients,
        backend;

    var Q = require('q');
    var fs = require('fs');

    main();

    function main() {
        loadConfig()
            .then(requires)
            .then(initDatabase)
            .then(handleConnections)
            .then(initControllers)
            .then(initRouter)
            .then(function (){});
    }

    function loadConfig() {
        var deferred = Q.defer();
        fs.readFile(CONFIG_FILE, 'utf8', function (ex, data) {
            if (ex) throw "Himawari: Connat load config file. Due to '" + ex + "'"
            config = JSON.parse(data);
            deferred.resolve();
        });
        return deferred.promise;
    }

    function requires() {
        var deferred = Q.defer();
        // Libraries
        io = require('socket.io').listen(9999);
        _ = require('underscore');
        mysql = require('mysql');
        // Classes
        Route = require('./class/Route.js');
        Router = require('./class/Router.js');
        Clients = require('./class/Clients.js');
        // Controller
        Member = require('./controller/members.js');
        deferred.resolve();
        return deferred.promise;
    }

    function initDatabase() {
        var deferred = Q.defer();
        fs.readFile(config.files.db_config, 'utf8', function (ex, data) {
            var db_config  = JSON.parse(data);
            db = mysql.createConnection(db_config);
            db.connect(function (ex) {
                if (ex) {
                    throw "Himawari: Cannot connect database. Due to '" + ex.stack + "'";
                }
                deferred.resolve();
            });
        });
        return deferred.promise;
    }

    function initControllers() {
        var deferred = Q.defer();
        Member.init(db);
        clients = new Clients();
        deferred.resolve();
        return deferred.promise;
    }

    function initRouter() {
        var deferred = Q.defer();
        router = new Router();
        router.load(config.files.routes).then(function () {
            deferred.resolve();
        });
        return deferred.promise;
    }

    function handleConnections() {
        var client_socket = io.of('/client'),
            backend_socket = io.of('/backend');

        client_socket.on('connection', function(socket) {
            clients.addSocket(socket);
        });

        backend_socket.on('connection', function(socket) {
            sockets.backend = socket;
        });
    }
}

var app = new Himawari();
