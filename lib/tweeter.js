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


    tweetDaysLeft: function(daysLeft) {
        var message = this._generateDaysLeftMessage(daysLeft);

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
    },

    _generateDaysLeftMessage: function(daysLeft) {
        var messages = [
                "Det är %days% dagar kvar till löning.",
                "Inte lön idag, men bara %days% dagar kvar."
            ],
            message = messages[Math.floor(Math.random() * messages.length)];

        return message.replace('%days%', daysLeft);
    }
};
