module.exports = function Member(_db) {

    var db = _db,
        username,
        special_day,
        nick,
        last_visit,
        join_time,
        point,
        note;
    
    init();
    
    function init() {
        return;
    }
    
    this.getUsername = function() { return username; }
    this.getSpecialDay = function() { return special_day; }
    this.getNick = function() { return nick; }
    this.getLastVisit = function() { return last_visit; }
    this.getJoinTime = function() { return join_time; }
    this.getPoint = function() { return point; }
    this.getNote = function() { return note; }
    
    this.setUsername = function(value) {
        if (value && value.length < 20) {
            username = value;
            return username;
        } else {
            return false;
        }
    }
    
    this.setSpecialDay = function(value) {
        var failed = false;
        var dim = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (value && value.match(/^\d{4}$/)){
            var month = parseInt(value.substr(0, 2), 10),
                day = parseInt(value.substr(2, 2), 10);
            if (month in dim && dim[month] <= day) {
                special_day = padNumber(month, 2) + padNumber(day, 2); 
            } else {
                failed = true;
            }
        } else {
            failed = true;
        }
        return (!failed) ? special_day : false;
    }
    
    this.setLastVisit = function(value) {
        if (value instanceof Date) {
            last_visit = value;
            return last_visit;
        } else {
            return false;
        }
    }

    this.setJoinTime = function(value) {
        if (value instanceof Date) {
            last_visit = value;
            return last_visit;
        } else {
            return false;
        }
    }
    
    this.setPoint = function (value) {
        if (value && value.toString().match(/^\d{1,5}$/)) {
            point = value;
            return point;
        } else {
            return false;
        }
    }
    
    this.setNote = function (value) {
        note = value;
        return note;
    }
    
    this.setNick = function (value) {
        nick = value;
        return nick;
    }

    this.createFromArray = function (array) {
        this.setUsername(array.username);
        this.setSpecialDay(array.special_day);
        this.setNick(array.nick);
        this.setLastVisit(array.last_visit);
        this.setJoinTime(array.join_time);
        this.setPoint(array.point);
        this.setNote(array.note);
    }
    
    function padNumber(number, length) {
        number = number + '';
        return number.length >= length ? number : new Array(length - number.length + 1).join('0') + number;
    }
}