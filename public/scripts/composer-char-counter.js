$(document).ready(function() {
  let charRemaining = document.getElementById("text-counter");
  let maxLength = 140;
  charRemaining.innerHTML = maxLength;
  $("#tweet-text").keydown(function() {
    let currentLength = this.value.length;
    charRemaining.innerHTML = maxLength - currentLength

    if(currentLength === maxLength) {
      charRemaining.style.color = "red";
    }
  })

});