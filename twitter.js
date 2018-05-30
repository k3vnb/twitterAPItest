// in terminal run node twitter.js

var TwitterPackage = require('twitter');

// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: 'xxxx',
  consumer_secret: 'xxxx',
  access_token_key: 'xxxx',
  access_token_secret: 'xxxx'
}

setInterval (function twitterInterval(){
  var Twitter = new TwitterPackage(secret);

  var query = "bot";
  Twitter.get('search/tweets', {q: query, count: 1, lang:"en"}, function(error, tweets, response) {

    var tweet_list = tweets['statuses'];

    for (var i = 0; i < tweet_list.length; i++) {
      if ('retweeted_status' in tweet_list[i]) {
        continue;
      }
      var screen_name = tweet_list[i].user.screen_name;
      let adjArr = ['confused', 'delighted', 'anguished', 'relevant', 'of loose morals'];
      for (var j = 0; j < adjArr.length; j++){
        var message = "@" + screen_name + " bot is " + adjArr[j] + ", a bot of logix not understanding feelings";
        var tweet_id = tweet_list[i].id_str

        try {
          Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
            console.log("Tweet posted successfully!")
          });
        }

        catch(err) {
          console.log(err);
        }
      }
    }

  });
}, 5000);
