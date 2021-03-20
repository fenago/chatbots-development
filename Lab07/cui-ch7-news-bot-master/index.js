//index.js

var TwitterPackage = require('twitter');
var request = require('request');

console.log("Hello World! I am a twitter bot!");

var secret = {
  consumer_key: 'zpOlUHpKU2c0LvDfDw6S4CXGn',
  consumer_secret: 'fEcbpv4gtd8Cxd5KRqO5768gqaikgs79trSnNKFp0KvqsTfbEa',
  access_token_key: '1373272905736392707-EY2ng3ufwXjeyMwC4XTi3QzDQBuwO2',
  access_token_secret: 'TOjwBmRBSoTKsayMIEq4f2GM6lJwZyQYxOkfgHYO1g5OW'
}

var Twitter = new TwitterPackage(secret);


//Twitter stream

// var hashtag = '#PlayAtHome'; //put any hashtag to listen e.g. #brexit
// console.log('Listening to:' + hashtag);

// Twitter.stream('statuses/filter', { track: hashtag }, function (stream) {
//   stream.on('data', function (tweet) {
//     console.log('Tweet:@' + tweet.user.screen_name +
//       '\t' + tweet.text);
//     console.log('------')
//   });

//   stream.on('error', function (error) {
//     console.log(error);
//   });
// });


//   stream.on('error', function (error) {
//     console.log(error);
//   });
// });



// Add your twitter username instead of null i-e: "@twitter_username"
tweet('I am a Twitter Bot!', null);

function tweet(statusMsg, screen_name) {

  console.log('Sending tweet to: ' + screen_name);
  var msg = statusMsg;
  if (screen_name != null) {
    msg = '@' + screen_name + ' ' + statusMsg;
  }
  console.log('Tweet:' + msg);
  Twitter.post('statuses/update', {
    status: msg
  }, function (err, response) {
    // if there was an error while tweeting
    if (err) {
      console.log('Something went wrong while TWEETING...');
      console.log(err);
    }
    else if (response) {
      console.log('Tweeted!!!');
      console.log(response)
    }
  });
}



// var retweetId = '1372079682301071364';
// retweet(retweetId);

// function retweet(retweetId){
//     Twitter.post('statuses/retweet/', {
//         id: retweetId
//     }, function(err, response) {
//         if (err) {
//             console.log('Something went wrong while RETWEETING...');
//             console.log(err);
//         }
//         else if (response) {
//             console.log('Retweeted!!!');
//             console.log(response)
//         }
//     }); 
// }


// search('#PlayAtHome', 'popular')
// function search(hashtag, resultType){
//     var params = {
//         q: hashtag, // REQUIRED
//         result_type: resultType,
//         lang: 'en'
//     }

//     Twitter.get('search/tweets', params, function(err, data) {
//         if (!err) {
//             console.log('Found tweets: ' + data.statuses.length);
//             console.log('First one: ' + data.statuses[1].text);
//         }
//         else {
//           console.log('Something went wrong while SEARCHING...');
//         }
//     });
// }
