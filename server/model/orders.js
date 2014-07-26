var Q = require('q');

module.exports = {
    
    db: null,
    
    init: function (_db) {
        this.db = _db;
    },
    
    getCurrentOrder: function () {
        var deferred = Q.defer(),
            sql = "SELECT * FROM `order` WHERE `archived` = 0;";
        this.db.query(sql, [], function (e, r, f) {
            deferred.resolve(r);
        })
        return deferred.promise;
    }
}