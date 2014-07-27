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
        console.log(ids);
        var deferred = Q.defer(),
            sql = "",
            where = (ids instanceof Array) ? "WHERE `o`.`id` IN (" + ids.join(",") + ")" : "WHERE `o`.`id` = " + ids;

        sql  = "SELECT `o`.`id` AS `id`, `od`.`id` AS `detail_id`, `place_time`, `member_id`, `o`.`paid`, `archived`, `point_used`, `point_discount`, `o`.`type`, `o`.`number`, `discount`, `point_get`, `dish_id`, `dish_type_id`, `noodle_thickness`, `price`, `done` ";
        sql += "FROM  `order` AS  `o` ";
        sql += "LEFT JOIN  `order_detail` AS  `od` ON  `o`.`id` =  `od`.`order_id` ";
        sql += where + ";";

        this.db.query(sql, function(error, records, fields) {
            var r, id = [], carts = {}, returns = {}, array_result = [];
            if (error) {
                deferred.reject(error); return;
            }
            if (!records) {
                deferred.resolve([]); return;
            }
            for (var i = 0; i < records.length; i++) {
                r = records[i];
                if (!(r.id in returns)) {
                    returns[r.id] = {
                        'id': r.id,
                        'place_time': r.place_time,
                        'member_id': r.member_id,
                        'paid': r.paid,
                        'point_used': r.point_used,
                        'point_discount': r.point_discount,
                        'discount': r.discount,
                        'point_get': r.point_get,
                        'type': r.type,
                        'number': r.number,
                        'cart': []
                    };
                }
                returns[r.id].cart.push({
                    'id': r.detail_id,
                    'dish_id': r.dish_id,
                    'dish_type_id': r.dish_type_id,
                    'thickness': r.noodle_thickness,
                    'price': r.price,
                    'done': r.done
                });
            }
            deferred.resolve(_.toArray(returns));
        });
        return deferred.promise;
    }
}
