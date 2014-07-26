function Himawari() {

    var CONFIG_FILE = './config.json',
        Mysql, Route, Router, Clients,
        Member, Members,
        config,
        io, _,
        db,
        router,
        clients,
        member,
        backend;

    var Q = require('q');
    var fs = require('fs');

    main();

    function main() {
        loadConfig()
            .then(function () {
                requires();
            })
            .then(function () { return initDatabase(); })
            .then(function () {
                handleConnections();
                initControllers();
            })
            .then(function () { return initRouter(); })
            .then(function () {

            });
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
        // Libraries
        io = require('socket.io').listen(9999);
        _ = require('underscore');
        Mysql = require('mysql');
        // Classes
        Route = require('./class/Route.js');
        Router = require('./class/Router.js');
        Clients = require('./class/Clients.js');
        // Model
        Member = require('./model/member.js');
        Members = require('./model/members.js');
    }

    function initDatabase() {
        var deferred = Q.defer();
        fs.readFile(config.files.db_config, 'utf8', function (ex, data) {
            var db_config  = JSON.parse(data);
            db = Mysql.createConnection(db_config);
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
        member = new Member(db);
        clients = new Clients();
    }

    function initRouter() {
        var deferred = Q.defer();
        router = new Router();
        router.load(config.files.route).then(function () {
            return deferred.resolve();
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
