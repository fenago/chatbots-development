#!/usr/bin/env node

//tweeter.js
//Author: Fenago

var TwitterPackage = require('twitter');
var request = require('request');

console.log("Hello World! I am a twitter bot!");

var secret = {
    consumer_key: 'YOUR_CONSUMER_KEY',
    consumer_secret: 'YOUR_CONSUMER_SECRET',
    access_token_key: 'YOUR_ACCESS_TOKEN_KEY',
    access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
}

var Twitter = new TwitterPackage(secret);

getAllSourcesAndTweet();

console.log("Hello World! I am twitter bot!");

// Add your twitter username instead of null i-e: "@twitter_username"
topNewsTweeter('cnn', null);

function topNewsTweeter(newsSource, screen_name) {
    request({
        url: 'https://newsapi.org/v1/articles?source='
            + newsSource +
            '&apiKey=YOUR_API_KEY',
        method: 'GET'
    },
        function (error, response, body) {
            //response is from the bot
            if (!error && response.statusCode == 200) {
                var botResponse = JSON.parse(body);
                console.log(botResponse);
                tweetTopArticle(botResponse.articles, screen_name);
            } else {
                console.log('Sorry. No new');
            }
        });
}

function tweetTopArticle(articles, screen_name) {
    var article = articles[0];
    tweet(article.title + " " + article.url, screen_name);
}



function tweetFromRandomSource(sources, screen_name) {
    var max = sources.length;
    var randomSource = sources[Math.floor(Math.random() *
        (max + 1))];
    topNewsTweeter(randomSource, screen_name);
}

function getAllSourcesAndTweet() {
    var sources = [];
    console.log('getting sources...')
    request({
        url: 'https://newsapi.org/v1/sources?apiKey=YOUR_API_KEY',
        method: 'GET'
    },
        function (error, response, body) {
            //response is from the bot
            if (!error && response.statusCode == 200) {
                // Print out the response body
                var botResponse = JSON.parse(body);
                for (var i = 0; i < botResponse.sources.length;
                    i++) {
                    console.log('adding.. ' +
                        botResponse.sources[i].id)
                    sources.push(botResponse.sources[i].id)
                }

                // Add your twitter username instead of null i-e: "@twitter_username"
                tweetFromRandomSource(sources, null);
            } else {
                console.log('Sorry. No news sources!');
            }
        });
}


function tweet(statusMsg, screen_name) {

    console.log('Sending tweet to: ' + screen_name);
    // console.log('In response to:' + status_id);
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
