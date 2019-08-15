/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

  let seconds = Math.floor(delta % 60);
  
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
    </article>
  `);
 
  const $tweetHeader = $(`
    <header class="tweeted-header">
        <span class="header-image-name">
          <img src=${obj.user.avatars} alt="Andrew Kim" class="tweet-header-image">
          ${obj.user.name}
        </span>
        <span>
          <p class="tweet-header-handle">${obj.user.handle}</p>
        </span>
      </header>
  `);

  const $tweetContent = $(`
   
    <p class="tweeted-text">
    </p>
  `).text(obj.content.text);

  const $tweetFooter = $(`
    <footer class="tweeted-footer">
      <span class="tweet-date">${timeDifference(obj.created_at)}</span>
      <span class="tweet-icon">
        <span>&#9825;</span>
        <i class="fas fa-retweet"></i>
        <span>&#9873;</span>
      </span>
    </footer>
  `);

  $tweet.append($tweetHeader);
  $tweet.append($tweetContent);
  $tweet.append($tweetFooter);

  return $tweet;
}

const renderTweets = function(tweetArray){
  //input: an array with objects as its elements
  const tweetContainer = $(".tweet-container");
  tweetContainer.empty();
  for (let element of tweetArray){
    let tweet = createTweetElement(element);
    tweetContainer.append(tweet);
  }
}

const loadTweets = function() {
  const url = "/tweets";
  const type = "GET";
  $.ajax({
    url: url,
    type: type,
    complete: function(data){
      renderTweets(data.responseJSON);
    }
  })
}

$(document).ready(function() {
  loadTweets();

  const $tweetContainer = $(".container");
  const $tweetComposer = $(".new-tweet");
  $tweetComposer.hide();
  $(".error-message").hide();
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    
    const url = "/tweets/";
    const data = $(this).serialize();
    const type = "POST";
    
    if(data.length-5){
      $.ajax({
        url: url,
        data: data,
        type: type,
      })
      .then(loadTweets)
      .then(function(){
        $(".counter")[0].innerHTML = 140;
        $(".tweet-text-area").val("");
      });
    } else {
      $(".error-message").show();
      setTimeout(function(){
        $(".error-message").hide();
      }, 1000);
    }
  });

  $("body").scroll(function(){

  });

  $(".container").scroll(function(){
    
  });

  const $postNewTweetButton = $(".new-tweet-button");
  const $textArea = $(".tweet-text-area");
  $postNewTweetButton.click(function(event) {
    event.preventDefault();
    $tweetComposer.slideToggle("slow", "linear");
    $textArea.focus();
  })

});
