Q = require('q');
module.exports = {

    db: null,

    init: function (_db) {
        this.db = _db;
    },

    getAll: function () {
        var deferred = Q.defer(),
            sql = "SELECT * FROM `member`;";
        this.db.query(sql, [], function (e, r, f) {
            deferred.resolve(r);
        });
        return deferred.promise;
    }
}