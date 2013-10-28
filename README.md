# salarybot

A Twitterbot that will tweet in how many days you will get your salary.

The intention of this project was to write a Twitterbot in 30 mins. It took 45.

## Usage
### Step 1
Create the file `lib/config.js` with the following info

    var config = {
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '...'
    };

    module.exports = config;

### Step 2
Run `lib/app.js`


## Changelog
### v0.1.0
* Add more messages for variation
* Create scheduler to post every day at 9:30

### v0.0.2
* Change tweets to Swedish

### v0.0.1
* First version


## Todo
* Distribute tweets during the day
