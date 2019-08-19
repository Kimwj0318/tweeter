$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let charRemaining = $(this).siblings(".counter")[0];
    const maxLength = 140;
    let currentLength = this.value.length;

    $(charRemaining).text(maxLength - currentLength)
    if(currentLength === maxLength) {
      $(charRemaining).removeClass("black");
      $(charRemaining).addClass("red");
      
    } else {
      $(charRemaining).removeClass("red");
      $(charRemaining).addClass("black");
    }
  })

});
