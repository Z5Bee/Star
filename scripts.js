// =========================
// Grab HTML Elements
// =========================

const titleScreen = document.getElementById("title-screen");
const gameArea = document.getElementById("game-area");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const retryBtn = document.getElementById("retry-btn");

const instructionText = document.getElementById("instruction-text");
const paperImage = document.getElementById("paper-image");
const feedbackText = document.getElementById("feedback-text");
const wishInput = document.getElementById("wish-input");
const wishDisplay = document.getElementById("wish-display");

const stepCounter = document.getElementById("step-counter");
const progressBar = document.getElementById("progress-bar");
const mistakeCount = document.getElementById("mistake-count");

const choiceButtons = document.querySelectorAll(".choice-btn");


// =========================
// Variables
// =========================

let currentStep = 0;
let mistakes = 0;


// =========================
// Folding Steps
// =========================

const steps = [

{
    instruction: "Fold the paper to the left.",
    image: "images/step1.png",
    answer: "Fold Left"
},

{
    instruction: "Fold the paper to the right.",
    image: "images/step2.png",
    answer: "Fold Right"
},

{
    instruction: "Fold the paper to the left again.",
    image: "images/step3.png",
    answer: "Fold Left"
}

];


// =========================
// Start Game
// =========================

startBtn.addEventListener("click", startGame);

function startGame(){

    currentStep = 0;
    mistakes = 0;

    titleScreen.classList.add("hidden");
    winScreen.classList.add("hidden");
    loseScreen.classList.add("hidden");

    gameArea.classList.remove("hidden");

    loadStep();

}


// =========================
// Load Current Step
// =========================

function loadStep(){

    let step = steps[currentStep];

    instructionText.textContent = step.instruction;

    paperImage.src = step.image;

    stepCounter.textContent =
        `Step ${currentStep + 1} of ${steps.length}`;

    progressBar.max = steps.length;
    progressBar.value = currentStep + 1;

    mistakeCount.textContent = `${mistakes} / 3`;

    feedbackText.textContent = "";

}


// =========================
// Check Player Choice
// =========================

choiceButtons.forEach(button =>{

    button.addEventListener("click", function(){

        checkAnswer(button.textContent);

    });

});


// =========================
// Answer Logic
// =========================

function checkAnswer(playerChoice){

    let correctAnswer = steps[currentStep].answer.trim();
    let normalizedChoice = playerChoice.trim();

    if(normalizedChoice === correctAnswer){

        feedbackText.textContent = "✔ Correct!";

        currentStep++;

        if(currentStep >= steps.length){

            winGame();

        }else{

            setTimeout(loadStep,800);

        }

    }else{

        mistakes++;

        feedbackText.textContent = "✖ That's not quite right.";

        mistakeCount.textContent = `${mistakes} / 3`;

        if(mistakes >= 3){

            loseGame();

        }

    }

}


// =========================
// Win
// =========================

function winGame(){

    gameArea.classList.add("hidden");

    const typedWish = wishInput.value.trim();
    const displayWish = typedWish ? `"${typedWish}"` : "Your wish has been sent into the stars.";

    wishDisplay.textContent = displayWish;
    wishDisplay.classList.remove("hidden");

    winScreen.classList.remove("hidden");

}


// =========================
// Lose
// =========================

function loseGame(){

    gameArea.classList.add("hidden");

    loseScreen.classList.remove("hidden");

}


// =========================
// Restart Buttons
// =========================

restartBtn.addEventListener("click", startGame);

retryBtn.addEventListener("click", startGame);