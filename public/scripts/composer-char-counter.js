$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let parent = this.closest(".tweet-form");
    let charRemaining = $(this).siblings(".counter")[0];
    const maxLength = 140;
    let currentLength = this.value.length;

    charRemaining.innerHTML = maxLength - currentLength
    if(currentLength === maxLength) {
      charRemaining.style.color = "red";
    } else {
      charRemaining.style.color= "black";
    }
  })

});