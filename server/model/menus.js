var Q = require('q');
var _ = require('underscore');

module.exports = {

    db: null,

    init: function (_db) {
        this.db = _db;
    },

    getGroups: function () {
        var deferred = Q.defer();
        var sql = "SELECT * FROM `menu_dishes_group`;";
        this.db.query(sql, [], function (error, result, field) {
            var returns = {};
            if (error) deferred.reject(error);
            for (var k in result) {
                var r = result[k];
                returns[r.id] = r;
            }
            deferred.resolve(returns);
        });
        return deferred.promise;
    },

    getMenu: function () {
        var deferred = Q.defer();
		var sql = "SELECT `dish`.`id`,`dish`.`name`, `dish`.`short_name`, `dish`.`is_noodle`, `dish`.`status`, `dish`.`stock`, `dish`.`group_id`, `subtype`.`id`, `subtype`.`name`, `subtype`.`price` FROM `menu_dishes` AS `dish` LEFT JOIN `menu_dishes_type` AS `subtype` ON `dish`.`id` = `subtype`.`dishes_id`;";
		var op = {sql: sql, nestTables: true};

		this.db.query(op, function (error, result, fields) {
		    var returns = {};
		    if (error) deffered.reject(error);

		    for (var k in result) {
    		    var r = result[k];
    		    if (!returns[r.dish.id]) {
        		    returns[r.dish.id] = r.dish;
        		    returns[r.dish.id].subtype = {};
    		    }
    		    returns[r.dish.id].subtype[r.subtype.id] = r.subtype;
		    }

		    deferred.resolve(returns);
        });

        return deferred.promise;
	}

}
