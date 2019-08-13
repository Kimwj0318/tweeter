/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" 
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const timeDifference = function(time) {
  // The function was copied from stackOverflow and readjusted to meet the requirements of this project
  const endDate = Date.now();
  const startDate = time;

  let delta = (endDate - startDate) / 1000;

  let years = Math.floor(delta/ (60*60*24*365));
  delta -= years * (60*60*24*365);

  let months = Math.floor(delta/ (60*60*24*30));
  delta -= months * (60*60*24*30);

  let days = Math.floor(delta / (60*60*24));
  delta -= days * 86400;

  let hours = Math.floor(delta / (60*60)) % 24;
  delta -= hours * 3600;

  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  let seconds = delta % 60;
  
  if (years) {
    return years + " years ago"
  }

  if (months) {
    return months + " months ago"
  }

  if (days) {
    return days + " days ago"
  }

  if (hours) {
    return hours + " hours ago"
  }

  if (minutes) {
    return minutes + " minutes ago"
  }

  return seconds + " seconds ago";
}

const createTweetElement = function(obj) {
  //input: an object with 3 keys: user, content, and date
  const $tweet = $(`
    <article class="tweeted-article">
      <header class="tweeted-header">
        <span class="header-image-name">
          <img src="${obj.user.avatars}" alt="Andrew Kim" class="tweet-header-image">
          ${obj.user.name}
        </span>
        <span>
          <p class="tweet-header-handle">${obj.user.handle}</p>
        </span>
      </header>
      <p class="tweeted-text">
        ${obj.content.text}
      </p>
      <footer class="tweeted-footer">
        <span class="tweet-date">${timeDifference(obj.created_at)}</span>
        <span>
          <span>&#9825;</span>
          <i class="fas fa-retweet"></i>
          <span>&#9873;</span>
        </span>
      </footer>
    </article>
  `);
 
  return $tweet;
}

const renderTweets = function(tweetArray){
  //input: an array with objects as its elements
  const tweetContainer = $(".tweet-container");
  for (let element of tweetData){
    let tweet = createTweetElement(element);
    tweetContainer.append(tweet);
  }
}

$(document).ready(function() {
  renderTweets(tweetData);
});
