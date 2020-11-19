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


// player1.choice = [player1.getRock(), player1.getPaper(),player1.getScissors()];
// player2.choice = [player2.getRock(), player2.getPaper(),player2.getScissors()];




// function gameLogic2() {
//   if(rocky1() === 'rock') {
//     player1 = 'rock';
//   }
// }


function rocky1() {
  localStorage.rocky1 =  player1.getRock()
   player1 = localStorage.rocky1
  console.log(player1)
  return player1
}
function paper1() {
  player1 =  player1.getPaper()
  localStorage.paper1 = player1
  console.log(player1)
  return player1
}

function scissors1() {
  player1 =  player1.getScissors()
  localStorage.scissors1 = player1
  console.log(player1)
  return player1
}

function rocky2() {
  player2 =  player2.getRock()
  localStorage.rocky2 = player2
  console.log(player2)
  return player2
}
function paper2() {
  player2 =  player2.getPaper()
  localStorage.paper2 = player2
  console.log(player2)
  return player2
}

function scissors2() {
  player2 =  player2.getScissors()
  localStorage.scissors2 = player2
  console.log(player2)
  return player2
}

// function test(){
//    if(player1 === 'rock' && player2 === 'scissors1') {
//      console.log("I am ok")
//    }
// }



function gameLogic() {
    if(localStorage.rocky1 === "rock" && localStorage.scissors2 === "scissors") {
      let winner = document.querySelector('#ok')
          winner.innerHTML = localStorage.rocky1
          setTimeout(function(){
            localStorage.removeItem('rocky1');
            localStorage.removeItem('scissors2');
          },3000)
      // console.log( `${localStorage.getItem("Hname1Text")} won with ${localStorage.rocky1}`)
    
  }  if(localStorage.rocky1 === "rock" && localStorage.paper2 === "paper") {
      console.log( `${localStorage.getItem("Hname2Text")} won with ${localStorage.paper2}`)
  }  if(localStorage.paper1 === "paper" && localStorage.rock2 === "rock") {
      console.log( `${localStorage.getItem("Hname1Text")} won with ${localStorage.paper1}`)
  }  if(localStorage.paper1 === "paper" && localStorage.scissors2 === "scissors") {
      console.log( `${localStorage.getItem("Hname2Text")} won with ${localStorage.scissors2}`)
  }  if(localStorage.scissors1 === "scissors" && localStorage.paper2 === "paper") {
      console.log( `${localStorage.getItem("Hname1Text")} won with  ${localStorage.scissors1}`)
  }  if(localStorage.scissors1 === "scissors" && localStorage.rock2 === "rock") {
      console.log( `${localStorage.getItem("Hname2Text")} won with ${localStorage.rock2}`)
  } else if(player1 === player2){
      console.log( `game tied with ${player2} " " ${player1}`)
  } 
}




// const game = (player1, player2) => {
//          if(player1 === "rock" && player2 === "scissors") {
//       return `${localStorage.getItem("Hname1Text")} won with ${player1}`
//   } else if(player1 === "paper" && player2 === "rock") {
//       return `${localStorage.getItem("Hname1Text")} won with ${player1}`
//   } else if(player1 === "scissors" && player2 === "paper") {
//       return `${localStorage.getItem("Hname1Text")} won with ${player1}`
//   } else if(player2 === "rock" && player1 === "scissors") {
//       return `${localStorage.getItem("Hname2Text")} won with ${player2}`
//   } else if(player2 === "paper" && player1 === "rock") {
//       return `${localStorage.getItem("Hname2Text")} won with ${player2}`
//   } else if(player2 === "scissors" && player1 === "paper") {
//       return `${localStorage.getItem("Hname2Text")} won with ${player2}`
//   } else {
//       return "game tied"
//   }
// }






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
 

function clearChoice() {
  let dropZone = document.querySelector('#removeMe') 
      dropZone.setAttribute('class', 'animate__bounceOut')
      setTimeout(function(){
        dropZone.setAttribute('class', 'faded')
      },1400)
      console.log("Removed Choices") 
}

function clearChoice1() {
  let dropZone1 = document.querySelector('#removeMe1') 
      dropZone1.setAttribute('class', 'animate__bounceOut')
      setTimeout(function(){
        dropZone1.setAttribute('class', 'faded')
      },1400)
      console.log("Removed Choices") 
}
// let dragStart = function(e) {
 
//     e.dataTransfer.setData('text/plain', e.target.id);
//     console.log(e.target.id + "lkfsjdlkfjkd")
  
// }

// let cancel = function(e) {
//   if (e.preventDefault) e.preventDefault();
//   if (e.stopPropagation) e.stopPropagation();
//   return false;
// }

// let droppedRock = function(e) {

//     id = e.dataTransfer.getData('text/plain');
//     e.target.appendChild(document.querySelector("#rock"))

//  }

//  let droppedPaper = function(e) {

//   id = e.dataTransfer.getData('text/plain');
//   e.target.appendChild(document.querySelector("#paper"))
  

// }


// let droppedScissors = function(e) {

//   id = e.dataTransfer.getData('text/plain');
//   e.target.appendChild(document.querySelector("#scissors"))


// }



// let rockImg = document.querySelector('#rock');
// rockImg.addEventListener('dragStart', dragStart, false);

// let paperImg = document.querySelector('#paper');
// paperImg.addEventListener('dragStart', dragStart, false);

// let scissorsImg = document.querySelector('#scissors');
// scissorsImg.addEventListener('dragStart', dragStart, false);
    
// let targetRock = document.querySelector("#target-container1");
// let targetPaper = document.querySelector("#target-container2");
// let targetScissors = document.querySelector("#target-container3");
    
//     targetRock.addEventListener('drop', droppedRock, false);
//     targetPaper.addEventListener('drop', droppedPaper, false);
//     targetScissors.addEventListener('drop', droppedScissors, false);

    
//     targetRock.addEventListener('dragenter', cancel, false);
//     targetPaper.addEventListener('dragenter', cancel, false);
//     targetScissors.addEventListener('dragenter', cancel, false);

//     targetRock.addEventListener('dragover', cancel, false);
//     targetPaper.addEventListener('dragover', cancel, false);
//     targetScissors.addEventListener('dragover', cancel, false);

var cancel = function(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  return false;
};

var dropped = function(e) {
  cancel(e);

  var target = this, content = '';
  var types = e.dataTransfer.types;
  // content = e.dataTransfer.getData(types[2]);

  // var h3 = document.createElement('h3');
  // h3.innerHTML =    content;
  // target.appendChild(h3);
 
  //   let me = []
  //   me.push(content)

  //   console.log(me)

  if (types.length > 0) {

    if (types === 'Text') {
      target.innerText = e.dataTransfer.getData('Text');
    } else {
      types.forEach(function(type) {
        content = e.dataTransfer.getData(type);

        var p = document.createElement('h3');
            p.innerHTML =  content;

        target.appendChild(p);
        //    let me = []
        // me.push(content)
            
        // console.log(me)

      });
    }
  }

  target.classList.remove('over');

  // If you want to clear all data from 
  // the dataTransfer object you 
  // can call:
  //
  //  e.dataTransfer.clearData(); 
  //
  // or you can clear values based on conent type:
  //
  //  e.dataTransfer.clearData('text/plain');
  //
  // where 'text/plain' can be 
  // substituted for any of the 
  // conent types where you want to 
  // remove the value.
};


var target = document.getElementById('target1');
target.addEventListener('drop', dropped, false);
target.addEventListener('dragenter', cancel, false);
target.addEventListener('dragover', cancel, false);
target.addEventListener('dragleave', cancel, false);




var cancel = function(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  return false;
};

var dropped = function(e) {
  cancel(e);

  var target = this, content = '';
  var types = e.dataTransfer.types;
  // content = e.dataTransfer.getData(types[2]);

  // var h3 = document.createElement('h3');
  // h3.innerHTML =    content;
  // target.appendChild(h3);
 
  //   let me = []
  //   me.push(content)

  //   console.log(me)

  if (types.length > 0) {

    if (types === 'Text') {
      target.innerText = e.dataTransfer.getData('Text');
    } else {
      types.forEach(function(type) {
        content = e.dataTransfer.getData(type);

        var p = document.createElement('h3');
            p.innerHTML =  content;

        target.appendChild(p);
        //    let me = []
        // me.push(content)
            
        // console.log(me)

      });
    }
  }

  target.classList.remove('over');

  // If you want to clear all data from 
  // the dataTransfer object you 
  // can call:
  //
  //  e.dataTransfer.clearData(); 
  //
  // or you can clear values based on conent type:
  //
  //  e.dataTransfer.clearData('text/plain');
  //
  // where 'text/plain' can be 
  // substituted for any of the 
  // conent types where you want to 
  // remove the value.
};


var target = document.getElementById('target');
target.addEventListener('drop', dropped, false);
target.addEventListener('dragenter', cancel, false);
target.addEventListener('dragover', cancel, false);
target.addEventListener('dragleave', cancel, false);




var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function(e) {
  e.preventDefault();
  target.innerHTML = '';
});