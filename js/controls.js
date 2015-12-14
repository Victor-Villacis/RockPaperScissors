$(document).ready(function() {
  $("#gameOn").on("click", function () {
    //alert("hello");
    //on and off associated with the data state
    if($(this).attr("data-state") === "off") {
      $(this)
        .attr("data-state", "on")
        .toggleClass("btn-success btn-danger")
        .html("STOP");

        bindControls();

    } else {
       $(this)
        .attr("data-state", "off")
        .toggleClass("btn-success btn-danger")
        .html("START UP AGAIN");

         $(".btn-info").off("click");
        
      
    }
  });

  function bindControls () {
    var gameState = {
    userScore: 0,
    computerScore: 0,
    roundCount: 1,
  }

  $(".btn-info").click(function(){
    var tagName = $(this).attr("data-tag");
    gameState[tagName]++;
    $("#" + tagName).html(gameState[tagName]);
  });
 }

  bindControls();
});