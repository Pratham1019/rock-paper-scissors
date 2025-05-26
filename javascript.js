const choices = ["ROCK", "PAPER", "SCISSORS"]; // Possible inputs
let humanScore = 0, computerScore = 0;

function getHumanChoice() {
    let humanChoice = prompt("Rock, Paper or Scissors?", "").toUpperCase();

    while (!choices.includes(humanChoice)) {
        // console.log("Incorrect input");
        humanChoice = prompt("Incorrect choice, Rock, Paper or Scissors?", "").toUpperCase();
    }

    return humanChoice;
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice, computerChoice) {
    let result = "It's a Tie";

    if (humanChoice == "ROCK" && computerChoice == "PAPER" ||
        humanChoice == "PAPER" && computerChoice == "SCISSORS" ||
        humanChoice == "SCISSORS" && computerChoice == "ROCK"
    ) {
        result = "You Lost";
        computerScore++;

    } else if (humanChoice == "PAPER" && computerChoice == "ROCK" ||
        humanChoice == "SCISSORS" && computerChoice == "PAPER" ||
        humanChoice == "ROCK" && computerChoice == "SCISSORS"
    ) {
        result = "You Won";
        humanScore++;
    }

    return result;
}

while (humanScore < 5 && computerScore < 5) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    alert(`You chose ${humanChoice} and the computer chose ${computerChoice} and ${result}\nYour Score: ${humanScore} | Computer Score: ${computerScore}`);
}

alert(humanScore === 5 ? "Game Over. You won the match!" : "Game Over. You Lost :(");
