class Player {
  constructor(name,choice,score, rock, paper, scissors) {
    this.name = name;
    this.choice = choice;
    this.score = score;
    this.rock = rock;
    this.paper = paper;
    this.scissors = scissors;
  }

  getName() {
    return this.name
  }

  getRock() {
    this.rock = document.querySelector('#rock');
    return this.rock.id
  }

  getPaper() {
    this.paper = document.querySelector('#paper')
    return this.paper.id
  }

  getScissors() {
    this.scissors = document.querySelector('#scissors')
    return this.scissors.id
  }

  getScore() {
    return this.score
  }

  getChoice() {
    return this.choice
  }

  get greeting() {                                          
    return this.message;
  }

  set greeting(value) {
    this.message = value;
  }
}

let player1 = new Player();
let player2 = new Player();




while(localStorage.content1 === undefined && localStorage.content2 === undefined) {
       console.log("hhh")
       break

}

if(localStorage.score1 === undefined) {
  localStorage.score1 = Number()
}

if(localStorage.score2 === undefined) {
  localStorage.score2 = Number()
}

  player1.score = document.querySelector("#scoreNumber1") 
                  player1.score.innerHTML = localStorage.score1

  player2.score = document.querySelector("#scoreNumber2") 
                  player2.score.innerHTML = localStorage.score2
  // player1.img.innerHTML = localStorage.content1
function gameLogic() {


  let conParse1 = new DOMParser().parseFromString(localStorage.content1, "text/html");
   player1.choice = conParse1.body.firstChild.id

  let conParse2 = new DOMParser().parseFromString(localStorage.content2, "text/html");
    player2.choice = conParse2.body.firstChild.id

    let a = player1.choice
    let b = player2.choice

   
    
    if(a === "rock" && b === "scissors1") {
      (function () {
        let winner = document.querySelector('#ok')
        winner.innerHTML = `Winner is ${localStorage.Hname1Text} with ${localStorage.content1}`
        player1.score = localStorage.score1
        localStorage.score1++
        player1.score = localStorage.score1
      }());  
  }  if(a === "rock" && b === "paper1") {
    (function () {
      let winner = document.querySelector('#ok')
        winner.innerHTML = `Winner is ${localStorage.Hname2Text} with ${localStorage.content2}`
        
        player2.score = localStorage.score2
        localStorage.score2++
        player2.score = localStorage.score2
        
      
    }());  
  }  if(a === "paper" && b === "rock1") {
    (function () {
      let winner = document.querySelector('#ok')
        winner.innerHTML = `Winner is ${localStorage.Hname1Text} with ${localStorage.content1}`
     
        player1.score = localStorage.score1
          localStorage.score1++
          player1.score = localStorage.score1
      
    }());  
  }  if(a === "paper" && b === "scissors1") {
    (function () {
      let winner = document.querySelector('#ok')
        winner.innerHTML = `Winner is ${localStorage.Hname2Text} with ${localStorage.content2}`
       
        player2.score = localStorage.score2
        localStorage.score2++
        player2.score = localStorage.score2
      
    }());  
  }  if(a === "scissors" && b === "paper1") {
    (function () {
      let winner = document.querySelector('#ok')
        winner.innerHTML = `Winner is ${localStorage.Hname1Text} with ${localStorage.content1}`
       
        player1.score = localStorage.score1
          localStorage.score1++
          player1.score = localStorage.score1
        
    }());  
  }  if(a === "scissors" && b === "rock1") {
    (function () {
      let winner = document.querySelector('#ok')
        winner.innerHTML = `Winner is ${localStorage.Hname2Text} with ${localStorage.content2}`
     
        player2.score = localStorage.score2
        localStorage.score2++
        player2.score = localStorage.score2
       
    }());  
  } if(a === undefined && b === undefined) {
    let winner = document.querySelector('#ok')
    winner.innerHTML = `<p>You must make a choice first</p>`
   
    }
   

       if(b === String && a === String) {
        let winner = document.querySelector('#ok')
        winner.innerHTML = `<p>I think I am getting there</p>`
        }

        
};




// setTimeout(function(){
//   location.reload();
// },3000)

function subinfo() {
     player1.name = document.getElementById("fname1").value;
    let Hname1Text = document.getElementById("Hname1");
        localStorage.Hname1Text = player1.name
        Hname1Text.innerHTML = localStorage.Hname1Text;
   
      if(player1.name) {
      let removeForm = document.querySelector('#form1');
      removeForm.setAttribute('class', 'faded')
      console.log("Removed Form")
    }
}




function subinfo2() {
  player2.name = document.getElementById("fname2").value;
 let Hname2Text = document.getElementById("Hname2");
     localStorage.Hname2Text = player2.name
     Hname2Text.innerHTML = localStorage.Hname2Text;

   if(player2.name) {
   let removeForm = document.querySelector('#form2');
   removeForm.setAttribute('class', 'faded')
   console.log("Removed Form")
 }
}






function keepName() {
  let currentName1 = localStorage.getItem("Hname1Text")
  document.getElementById("Hname1").innerHTML = currentName1

  let currentName2 = localStorage.getItem("Hname2Text")
  document.getElementById("Hname2").innerHTML = currentName2
}

keepName()

document.querySelector("#form1").addEventListener("submit", function(eventInput) {
 //prevents from submitting
  eventInput.preventDefault();
});


document.querySelector("#form2").addEventListener("submit", function(eventInput) {
  //prevents from submitting
   eventInput.preventDefault();
 });
 
function clearBoth() {
  
  
    let dropZone = document.querySelector('#removeMe') 
        dropZone.setAttribute('class', ' animate__bounceOut')
        setTimeout(function(){
          dropZone.setAttribute('class', 'faded')
        },1400)
        console.log("Removed Choices") 
  
  
  
    let dropZone1 = document.querySelector('#removeMe1') 
        dropZone1.setAttribute('class', '  animate__bounceOut')
        setTimeout(function(){
          dropZone1.setAttribute('class', 'faded')
        },1400)
        console.log("Removed Choices") 


        
}


function dontTouch() {

  let clearOne = document.querySelector("#target");
  clearOne.setAttribute('class', 'dontTouch drop-zone');
}

function dontTouch2() {

  let clearOne = document.querySelector("#target1");
  clearOne.setAttribute('class', 'dontTouch drop-zone');
 
}


function showPiece(){
  let addPiece = document.querySelector("#target1");
      if(localStorage.content2) {
        addPiece.innerHTML = localStorage.content2
        gameLogic()
      } else {
        addPiece.innerHTML = `<button class="btn red-text text-darken-2" id="refresh">${localStorage.Hname1Text} Click After Turn</button><img src='/images/tenor.gif' class='drop-zone'>`
        btnTarget = document.querySelector('#refresh')
        btnTarget.addEventListener('click', function() {
        location.reload()
           })
      }
}



function showPiece1(){
  let addPiece1 = document.querySelector("#target");
      if(localStorage.content1) {
        addPiece1.innerHTML = localStorage.content1
        gameLogic()
      } else {
        addPiece1.innerHTML = `<button class=" btn red-text text-darken-2" id="refresh">${localStorage.Hname2Text} Click After Turn</button><img src='/images/tenor.gif' class='drop-zone'>`
        btnTarget = document.querySelector('#refresh')
        btnTarget.addEventListener('click', function() {
        location.reload()
        
           })
      }
}


//choose who goes first, then the second player will see the winner. The previous player will only see the winner after he clicks the button. I need to store the winner and 
//and also keep score and track the score. 
//also have a button to clear choice and to reset the game. 

//add a chat? ????????
/// i will need node then to dynamically have an event loop and call upon the server for informtion. 
//you will also need to add sesion storage as it is the only way to play thorugh broswe
var cancel = function(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  return false;
};

var dropped = function(e) {
  cancel(e);

  var target = this, content = '';
  var types = e.dataTransfer.types;


  if (types.length > 0) {

    if (types === 'Text') {
      target.innerText = e.dataTransfer.getData('Text');
    } else {
      types.forEach(function(type) {
        content = e.dataTransfer.getData(type);
        localStorage.content2 = content
        b = player2.choice
        console.log(b)
        var p = document.createElement('h3');
            p.innerHTML =  content;

        target.appendChild(p);
        //    let me = []
        // me.push(content)
            
        // console.log(me)

      });
    }
  }
};


var target1 = document.getElementById('target1');
target1.addEventListener('drop', dropped, false);
target1.addEventListener('dragenter', cancel, false);
target1.addEventListener('dragover', cancel, false);
target1.addEventListener('dragleave', cancel, false);
target1.addEventListener('gameLogic', dropped, false);
target1.addEventListener('check', dropped, false);



var cancel = function(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  return false;
};

var dropped = function(e) {
  cancel(e);

  var target = this, content = '';
  var types = e.dataTransfer.types;


  if (types.length > 0) {

    if (types === 'Text') {
      target.innerText = e.dataTransfer.getData('Text');
    } else {
      types.forEach(function(type) {
        content = e.dataTransfer.getData(type);
        localStorage.content1 = content
        a = player1.choice
        console.log(a)
        var p = document.createElement('h3');
            p.innerHTML =  content;

        target.appendChild(p);

      });
    }
  }
};




var target = document.getElementById('target');
target.addEventListener('drop', dropped, false);
target.addEventListener('dragenter', cancel, false);
target.addEventListener('dragover', cancel, false);
target.addEventListener('dragleave', cancel, false);
target.addEventListener('gameLogic', dropped, false);
target.addEventListener('check', dropped, false);




let playAgain = document.querySelector('#playAgain');
playAgain.addEventListener('click', function(e) {
  setTimeout(function(){
  localStorage.removeItem('content1');
  localStorage.removeItem('content2');
  location.reload()
  }, 3500)
  gameLogic();
});


//this will listen for an event listner and when it does it will fire across all windows. 
// window.addEventListener('clearButton', function(e) {
//   location.reload()
// })

let newGame = document.querySelector('#clearGame');
    newGame.addEventListener('click', function(e) {
      localStorage.clear()
      location.reload()
    })
