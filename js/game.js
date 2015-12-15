$(document).ready(function() {
  var myWords = ["Rock", "Paper", "Scissors"]; //An array

  $("#Rock").click(function() {
    $(this).animate().html("<div class='night-hotel'>Rock</div>").fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br>WOW!! YOU WON</br>" +"<div><img src=''> </div>"); 
    });
  });



$("#Paper").click(function() {
    $(this).animate().html("<div class='night-hotel'> Paper</div>").fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br>SORRY YOU LOST</br>" +"<div><img src=''> </div>"); 
    });
  });

  $("#Scissor").click(function() {
    $(this).animate().html("<div class='night-hotel'>Scissor</div>").fadeIn('fast', function() {
      var myRandomNumber = Math.floor(Math.random() * myWords.length);
      $("h1").html("<h1>" + myWords[myRandomNumber] + "<br> WOW!! YOU WON</br>" +"<div><img src=''> </div>"); 
    });
  });

var compare = function (userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return("The result is a tie!");
    }
    if (userChoice === "rock") {
        if (computerChoice === "scissors") {
            return ("rock wins");
        } else {
            return ("paper wins");
        }
    }
    if (userChoice === "paper") {
        if (computerChoice === "rock") {
            return ("paper wins");
        } else {
            return ("scissors wins");
        }
    }
     if (userChoice=== "scissors") {
        if (computerChoice === "rock") {
            return ("rock wins");
        } else {
            return ("scissors wins");
        }
    }
};


});
