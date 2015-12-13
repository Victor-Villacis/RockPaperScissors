$(document).ready(function() {
var userScore = 0, computerScore = 0, roundCount =1;

  $("#incUserBtn").click(function(){
    $("#userScore").html(userScore ++).append("<div>World</div>");
  });
});