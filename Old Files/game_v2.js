const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
    if (
        userInput === "rock" ||
        userInput === "paper" ||
        userInput === "scissors" ||
        userInput === "bomb"
    ) {
        return userInput;
    } else {
        return (
            promtedChoice + " - what is this? Please pick rock paper or scissors"
        );
    }
};

const getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0) {
        return "rock";
    } else if (choice === 1) {
        return "paper";
    } else {
        return "scissors";
    }
};

/*logic behind this is that rock ties with rock, rock beats scissors  and loses to paper. So Tied is above, if user is rock and 			computer 		is paper then computer won, if no user won.*/

const determineWinner = (userChoice, computerChoice) => {
    //tied
    if (userChoice === computerChoice) {
        return "game is tied";
    } else if (userChoice === "rock") {
        //user is rock
        if (computerChoice === "paper") {
            return "computer won with paper";
        } else {
            return "you won with rock";
        }
    } else if (userChoice === "paper") {
        //user is paper
        if (computerChoice === "scissors") {
            return "computer won with scissors";
        } else {
            return "you won with paper";
        }
    } else if (userChoice === "scissors") {
        // user is scissors
        if (computerChoice === "rock") {
            return "computer won with rock";
        } else {
            return "you won with scissors";
        }
    } else if (userChoice === "bomb") {
        //user is bomb ***This works***
        // else if(userChoice === 'bomb'){
        //   return 'You win with a bomb'
        // }

        if (computerChoice === "rock") {
            return "bomb beats rock";
        }
        if (computerChoice === "paper") {
            return "bomb beats paper";
        }
        if (computerChoice === "scissors") {
            return "bomb beats scissors";
        }
    }
};

const playGame = promtedChoice => {
    const userChoice = getUserChoice(promtedChoice);
    const computerChoice = getComputerChoice();
    console.log("I threw " + userChoice);
    console.log("Computer threw " + computerChoice);
    console.log(determineWinner(userChoice, computerChoice));
};

let promtedChoice = prompt("Plese pick rock paper or scissors");

playGame(promtedChoice);