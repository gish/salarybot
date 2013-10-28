var Twit = require('twit'),
    appConfig = require('./config'),
    logger = require('./logger');

module.exports = {
    //=====================
    // API
    //=====================
    tweet: function(message) {
        var T = new Twit(appConfig);

        logger.log("Attempting to tweet: " + message);

        T.post('statuses/update', { status: message }, function(err, reply) {

            if (err) {
                this._handleError(err);
            } else {
                logger.log("Tweeted: " + message);
            }
        }.bind(this));

        return this;
    },


    tweetDaysLeft: function() {
        var message = "Det är " + daysLeft + " dagar kvar till löning!";

        this.tweet(message);
    },


    tweetPayDay: function() {
        var message = "Idag får du lön!";

        this.tweet(message);
    },



    //=====================
    // Private methods
    //=====================
    _handleError: function(err) {
        logger.error("Twitter error: " + err.message);
    }
};
