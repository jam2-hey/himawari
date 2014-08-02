var Q = require('q');
var _ = require('underscore');

module.exports = {

    db: null,

    init: function (_db) {
        this.db = _db;
    },

    getCurrentOrders: function () {
        var that = this,
            deferred = Q.defer(),
            sql = "SELECT `id` FROM `order` WHERE `archived` = 0;";
        this.db.query(sql, [], function (e, r, f) {
            var ary = [];
                console.log(r);
            for (var i in r) {
                ary.push(r[i].id);
            }
            that.getOrders(ary).then(function (data) {
                return deferred.resolve(data);
            });;
        })
        return deferred.promise;
    },

    getOrders: function (ids) {
        var deferred = Q.defer(),
            sql = "", where;

        if (ids instanceof Array) {
            where = "WHERE `order`.`id` IN (" + ids.join(",") + ")"
        } else {
            where = "WHERE `order`.`id` = " + ids;
        }

        sql  = "SELECT `order`.`id`, `detail`.`id`, `place_time`, `member_id`, `order`.`paid`, `archived`, `point_used`, `point_discount`, `order`.`type`, `order`.`number`, `discount`, `point_get`, `dish_id`, `dish_type_id`, `noodle_thickness`, `price`, `done` FROM  `order` LEFT JOIN  `order_detail` AS  `detail` ON  `order`.`id` =  `detail`.`order_id` " + where + ";";

        var op = {sql: sql, nestTables: true};
        this.db.query(op, function(error, result, fields) {
            var returns = {};
            if (error) deffered.reject(error);

            for (var k in result) {
                var r = result[k];
                if (!returns[r.order.id]) {
                    returns[r.order.id] = r.order;
                    returns[r.order.id].detail = {};
                }
                returns[r.order.id].detail[r.detail.id] = r.detail;
            }

            deferred.resolve(returns);
        });
        return deferred.promise;
    }
}
