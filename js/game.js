$(document).ready(function() {
  var myWords = ["Rock", "Paper", "Scissors"]; //An array

  $("button").click(function() {
    $(this).fadeOut('slow').fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br>I am an H1</br>" +"<div><img src='http://dlewis.net/nik-archives/wp-content/uploads/2011/10/Rock-Paper-Scissors.jpg'> </div>");
    });
  });
});
