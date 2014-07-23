function Himawari() {

    var CONFIG_FILE = './config.json',
        config,
        io,
        Route, Router,
        router,
        db,
        sockets = {
            clients: [],
            backend: null
        };

    var Promise = require('promise');
    var fs = require('fs');

    main();

    function main() {
        loadConfig()
            .then(requires)
            .then(initDatabase)
            .then(handleConnections)
            .then(initControllers)
            .then(initRouter);
    }

    function loadConfig() {
        return new Promise(function (fullfill) {
            fs.readFile(CONFIG_FILE, 'utf8', function (ex, data) {
                if (ex) throw "Himawari: Connat load config file. Due to '" + ex + "'"
                config = JSON.parse(data);
                fullfill();
            });
        });
    }

    function requires() {
        return new Promise(function (fullfill) {
            // Libraries
            io = require('socket.io').listen(9999);
            _ = require('underscore');
            mysql = require('mysql');
            // Classes
            Route = require('./class/Route.js');
            Router = require('./class/Router.js');
            // Controller
            Member = require('./controller/members.js');
            fullfill();
        });
    }

    function initDatabase() {
        return new Promise(function (fullfill) {
            fs.readFile(config.files.db_config, 'utf8', function (ex, data) {
                var db_config  = JSON.parse(data);
                db = mysql.createConnection(db_config);
                db.connect(function (ex) {
                    if (ex) {
                        throw "Himawari: Cannot connect database. Due to '" + ex.stack + "'";
                    }
                    fullfill();
                });
            });
        });
    }

    function initControllers() {
        return new Promise(function (fullfill){
            Member.init(db);
            fullfill();
        });
    }

    function initRouter() {
        return new Promise(function (fullfill) {
            router = new Router();
            router.load(config.files.routes).then(function () {
                fullfill();
            });
        });
    }

    function handleConnections() {
        var client_socket = io.of('/client'),
            backend_socket = io.of('/backend');

        client_socket.on('connection', function(socket) {
            sockets.clients.push(socket);
        });

        backend_socket.on('connection', function(socket) {
            sockets.backend = socket;
        });
    }
}

var app = new Himawari();
