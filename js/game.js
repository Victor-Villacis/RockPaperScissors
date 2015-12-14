$(document).ready(function() {
  var myWords = ["Rock", "Paper", "Scissors"]; //An array

  $("#Rock").click(function() {
    $(this).animate({width:"415px"}).html("<div><img src='http://img07.deviantart.net/a22b/i/2013/053/8/f/the_rock_by_santiagowwe12-d5u3gll.png'></div>").fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br>I am an H1</br>" +"<div><img src='http://dlewis.net/nik-archives/wp-content/uploads/2011/10/Rock-Paper-Scissors.jpg'> </div>"); 
    });
  });



$("#Paper").click(function() {
    $(this).animate({width:"415px"}).html("<div><img src='http://www.ibidworld.com/images/papper%20and%20paper%20product/paper.jpg'></div>").fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br>I am an H1</br>" +"<div><img src=''> </div>"); 
    });
  });

  $("#Scissor").click(function() {
    $(this).animate({width:"415px"}).html("<div><img src='http://www.macdrifter.com/uploads/2012/08/BigLebowski_Scissors_400px.jpeg'></div>").fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br>I am an H1</br>" +"<div><img src=''> </div>"); 
    });
  });


});
