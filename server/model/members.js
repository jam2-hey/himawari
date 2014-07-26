module.exports = function Members(_db) {

    var db = _db,
        collection = [];

    var Member = require('./member.js');
    var Q = require('q');
    var _ = require('underscore');

    init();
    
    function init() {
        return;
    }
    
    this.getCollection = function () {
        return collection;
    }
    
    this.each = function (iterator) {
        _.each(collection, interator);
    }

    this.getAll = function () {
        var deferred = Q.defer(),
            sql = "SELECT * FROM `member`;";

        db.query(sql, [], function (e, r, f) {
            for(var k in r) {
                var member = new Member(db);
                member.createFromArray(r[k]);
                collection.push(member);
            }
            deferred.resolve();
        });
        return deferred.promise;
    }
    
    this.getMemberById = function (id) {
        
    }

}