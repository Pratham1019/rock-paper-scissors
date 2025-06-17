const playerBtns = document.querySelectorAll(".player-choice");

const playerChoiceImg = document.querySelector("#player-img");
const cpuChoiceImg = document.querySelector("#cpu-img");

const playerScoreText = document.querySelector(".player-score-count");
const cpuScoreText = document.querySelector(".cpu-score-count");
const stat = document.querySelector("#status");

const playerWinAudio = document.querySelector("#player-win-audio");
const cpuWinAudio = document.querySelector("#cpu-win-audio");
const gameStartAudio = document.querySelector("#game-start-audio");
const tieAudio = document.querySelector("#tie-audio");
const gameWinAudio = document.querySelector("#game-win-audio");
const gameLossAudio = document.querySelector("#game-loss-audio");

let playerScore;
let cpuScore;

const choices = ["ROCK", "PAPER", "SCISSORS"];

const results = {
    ROCK: { ROCK: 0, PAPER: -1, SCISSORS: 1 },
    PAPER: { ROCK: 1, PAPER: 0, SCISSORS: -1 },
    SCISSORS: { ROCK: -1, PAPER: 1, SCISSORS: 0 }
};

const messages = {
    "ROCKSCISSORS": "Rock smashes Scissors. You win!",
    "ROCKPAPER": "Paper captures the Rock. You lose!",
    "PAPERROCK": "Paper captures the Rock. You win!",
    "PAPERSCISSORS": "Scissors cuts the Paper. You lose!",
    "SCISSORSPAPER": "Scissors cuts the Paper. You win!",
    "SCISSORSROCK": "Rock smashes Scissors. You lose!"
};

function startGame() {
    playerChoiceImg.src = "";
    cpuChoiceImg.src = "";

    stat.textContent = "Start Playing!";
    playerScore = 0;
    cpuScore = 0;
    playerScoreText.textContent = playerScore;
    cpuScoreText.textContent = cpuScore;
}

function getCpuChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function setPlayerImage(playerChoice) {
    if (playerChoice === "SCISSORS") {
        playerChoiceImg.style.cssText = "transform: scaleX(-1)";
    } else {
        playerChoiceImg.style.cssText = "transform: rotate(20deg);";
    }

    playerChoiceImg.src = `assets/svgs/${playerChoice.toLowerCase()}.svg`;
}

function setCpuImage(cpuChoice) {
    if (cpuChoice === "SCISSORS") {
        cpuChoiceImg.style.cssText = "transform: scaleX(1)";
    } else {
        cpuChoiceImg.style.cssText = "transform: scaleX(-1) rotate(20deg);";
    }

    cpuChoiceImg.src = `assets/svgs/${cpuChoice.toLowerCase()}.svg`;
}

function playRound(playerChoice, cpuChoice) {
    playerBtns.forEach(btn => btn.disabled = true);

    const result = results[playerChoice][cpuChoice];

    // Play audio first
    if (result === 1) {
        playerWinAudio.currentTime = 0;
        playerWinAudio.play();
    } else if (result === -1) {
        cpuWinAudio.currentTime = 0;
        cpuWinAudio.play();
    } else {
        tieAudio.currentTime = 0;
        tieAudio.play();
    }

    setTimeout(() => {
        setPlayerImage(playerChoice);
        setCpuImage(cpuChoice);

        if (result === 1) {
            playerScore++;
            playerScoreText.textContent = playerScore;
            stat.textContent = messages[playerChoice + cpuChoice] || "Something went wrong.";
        } else if (result === -1) {
            cpuScore++;
            cpuScoreText.textContent = cpuScore;
            stat.textContent = messages[playerChoice + cpuChoice] || "Something went wrong.";
        } else {
            stat.textContent = "It's a tie. Play again.";
        }

        if (playerScore >= 5 || cpuScore >= 5) {
            stat.textContent += " Game Over! Reload to play again.";
            playerBtns.forEach(btn => btn.disabled = true);

            if (playerScore - cpuScore > 0) {
                gameWinAudio.currentTime = 0;
                gameWinAudio.play();
            } else {
                gameLossAudio.currentTime = 0;
                gameLossAudio.play();
            }
        } else {
            setTimeout(() => {
                playerBtns.forEach(btn => btn.disabled = false);
            }, 500);
        }
    }, 0);
}

startGame();

playerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const playerChoice = btn.dataset.choice;
        const cpuChoice = getCpuChoice();
        playRound(playerChoice, cpuChoice);
    });
});


