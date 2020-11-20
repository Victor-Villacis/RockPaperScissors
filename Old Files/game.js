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

var userChoice = prompt("Do you choose rock, paper or scissors?");
var computerChoice = Math.random();

if (computerChoice < 0.34) {
  computerChoice = "rock";
} else if(computerChoice <= 0.67) {
  computerChoice = "paper";
} else {
  computerChoice = "scissors";
} 

console.log("Computer choose: " + computerChoice);
console.log("You choose:" + userChoice); 


var compare = function (choice1, choice2) {
    if(choice1 === choice2) {
       return "The result is a tie";
        }    
    else if(choice1 === "scissors") 
{
    if (choice2 === "rock") {
            return "rock wins"; }
        else {
            return "scissors wins";
            }
}
        
     else if(choice1 === "paper") 
{
    if (choice2 === "rock") {
            return "paper wins"; }
        else {
            return "scissors wins";
            }
}

        
    else if(choice1 === "rock") 
{
    if (choice2 === "scissors") {
            return "rock wins"; }
        else {
            return "paper wins";
            }
}
           
  
};

compare(userChoice, computerChoice);



});
