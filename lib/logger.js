module.exports = {
    //=====================
    // API
    //=====================
    log: function(message) {
        var timestamp = this._getTimeStamp();

        console.log(timestamp, message);
    },

    error: function(message) {
        var timestamp = this._getTimeStamp();

        console.error(timestamp, message);
    },



    //=====================
    // Private methods
    //=====================
    _getTimeStamp: function() {
        var date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        return "[" + hours + ":" + minutes + ":" + seconds + "]";
    }
};
