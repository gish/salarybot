var defer = require('node-promise').defer,
    http = require('http'),
    tweeter = require('./tweeter'),
    logger = require('./logger');

var app = {
    //=====================
    // API
    //=====================
    start: function() {
        var interval = 1800*1E3; // 30 minutes

        logger.log("App started");

        this.timer = setInterval(function() {
            this._tick();
        }.bind(this), interval);

        this._tick();

        return this;
    },



    //=====================
    // Private methods
    //=====================
    _tick: function() {
        logger.log("Tick");

        if (this._shouldPost()) {

            logger.log("Will post");

            this._getSalaryInfoAsJson().then(function(salary) {
                if (!!salary) {

                    daysLeft = salary.data.daysleft;

                    if (daysLeft !== 0) {
                        tweeter.tweetDaysLeft(daysLeft);
                    } else {
                        tweeter.tweetPayDay();
                    }
                }
            });
        } else {
            logger.log("Won't post");
        }
    },


    _shouldPost: function() {
        var date = new Date();

        return date.getHours() == 17 && date.getMinutes() > 30;
    },


    _getSalaryInfoAsJson : function() {
        var options = {
            hostname: 'api.xn--rdetlning-u2a7r.nu',
            path: '/?format=json'
        },
        req,
        salary,
        deferred = defer();

        logger.log("Retrieving payday info");

        req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                deferred.resolve(JSON.parse(data));
            });
        });

        req.end();

        return deferred.promise;
    }
};

app.start();
