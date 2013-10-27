var Twit = require('twit'),
    defer = require('node-promise').defer,
    http = require('http'),
    appConfig = require('./config');

var getSalaryInfoAsJson = function() {
    var options = {
        hostname: 'api.xn--rdetlning-u2a7r.nu',
        path: '/?format=json'
    },
    req,
    salary,
    deferred = defer();

    req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            deferred.resolve(JSON.parse(data));
        });
    });

    req.end();

    return deferred.promise;
};

var tweet = function(message) {
    var T = new Twit(appConfig);
    T.post('statuses/update', { status: message }, function(err, reply) {
        console.log("Tweeted: " + message);
    });
};

var tweetDaysLeft = function(daysLeft) {
    var message = "Det är " + daysLeft + " dagar kvar till löning!";

    tweet(message);
};

var tweetPayDay = function() {
    var message = "Idag får du lön!";

    tweet(message);
};


var app = function() {
    var daysLeft;

    getSalaryInfoAsJson().then(function(salary) {
        if (!!salary) {
            daysLeft = salary.data.daysleft;
            if (daysLeft !== 0) {
                tweetDaysLeft(daysLeft);
            } else {
                tweetPayDay();
            }
        }
    });
};

app();
