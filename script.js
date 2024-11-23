const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");
const scoresPara = document.getElementById("scores");
// let textNode = document.createTextNode("");

let currentWord = "";
let score = 0;
let startTime = null;
let words = [];

// Fetch words from API
async function fetchWords() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=50");
        if (!response.ok) {
            throw new Error("Failed to fetch words");
        }
        words = await response.json();
    } catch (error) {
        console.error(error);
        alert("Failed to fetch words. Check your internet connection.");
    }
}


// Get a random word from the fetched words
function getRandomWord() {
    if (words.length === 0) {
        return "loading"; // Fallback word if API fails or no words available
    }
    return words[Math.floor(Math.random() * words.length)];
}

// Start the game
function startGame() {
    score = 0;
    updateScore();
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    fetchWords().then(() => {
        nextWord();
    });
}

// Move to the next word
function nextWord() {
    currentWord = getRandomWord();
    wordElement.textContent = currentWord;
    resetTimer();
}

// Reset the timer for a new word
function resetTimer() {
    startTime = Date.now(); // Record the start time
    updateTimer(0); // Reset the timer display
}

// Update the timer display
function updateTimer(elapsedTime) {
    timeElement.textContent = elapsedTime.toFixed(2);
}

// Calculate and display the time taken for the last word
function recordTime() {
    const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
    updateTimer(elapsedTime);
    return elapsedTime;
}

// Check input
inputElement.addEventListener("input", () => {
    if (inputElement.value === currentWord) {
        const timeTaken = recordTime(); // Record and display the time taken
        // const message = `You took ${timeTaken.toFixed(2)} seconds for "${currentWord}"`;

        scoresPara.innerHTML = `You took ${timeTaken.toFixed(2)} seconds for "${currentWord}"`;

        // // Create a text node and a new line
        // const textNode = document.createTextNode(message);
        // const lineBreak = document.createElement("br");

        // // Append the text node and line break to the scoresPara
        // scoresPara.appendChild(textNode);
        // scoresPara.appendChild(lineBreak);

        // Update the score and move to the next word
        score++;
        updateScore();
        inputElement.value = "";
        nextWord();
    }
});


// Update the score display
function updateScore() {
    scoreElement.textContent = score;
}

// Restart the game
restartButton.addEventListener("click", () => {
    startGame();
});

// Initialize the game
startGame();

const themeToggle = document.getElementById('theme-toggle');

// Toggle Dark Mode
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    // Update the button text based on the current mode
    themeToggle.textContent = document.body.classList.contains('dark') ? "☀️" : "🌙";
});

// Initialize with light mode
document.body.classList.add('dark');
themeToggle.textContent = "☀️"; // Set initial button text
