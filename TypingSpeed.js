const paragraphs = [
    "The quick brown fox jumps over the lazy dog while searching for adventure in the forest.",
    "Programming is the art of telling another human what you want the computer to do.",
    "Success is not final, failure is not fatal. It is the courage to continue that counts.",
    "The only way to do great work is to love what you do and never give up on your dreams.",
    "Technology is best when it brings people together and helps them achieve their goals.",
    "Learning to code opens up a world of possibilities and endless opportunities for growth.",
    "Every expert was once a beginner who refused to give up and kept practicing consistently.",
    "The future belongs to those who believe in the beauty of their dreams and take action.",
    "Web development combines creativity with logic to build amazing digital experiences online.",
    "Practice makes perfect. The more you code, the better you become at solving problems."
];

let currentParagraph = '';
let startTime = null;
let timerInterval = null;
let testDuration = 60;
let timeLeft = testDuration;
let testActive = false;

const startScreen = document.getElementById('start-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const paragraphElement = document.getElementById('paragraph');
const userInput = document.getElementById('user-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const errorsElement = document.getElementById('errors');
const accuracyElement = document.getElementById('accuracy');

startBtn.addEventListener('click', startTest);
submitBtn.addEventListener('click', submitTest);
restartBtn.addEventListener('click', restartTest);
userInput.addEventListener('input', updateTest);

function startTest() {
    startScreen.classList.remove('active');
    testScreen.classList.add('active');
    
    currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    displayParagraph();
    
    timeLeft = testDuration;
    testActive = true;
    startTime = Date.now();
    
    userInput.disabled = false;
    userInput.focus();
    userInput.value = '';
    
    startTimer();
}

function displayParagraph() {
    paragraphElement.innerHTML = '';
    currentParagraph.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        paragraphElement.appendChild(span);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

function updateTest() {
    if (!testActive) return;
    
    const userText = userInput.value;
    const paragraphChars = paragraphElement.querySelectorAll('span');
    
    let errors = 0;
    let correctChars = 0;
    
    paragraphChars.forEach((char, index) => {
        char.classList.remove('correct', 'incorrect', 'current');
        
        if (index < userText.length) {
            if (userText[index] === char.textContent) {
                char.classList.add('correct');
                correctChars++;
            } else {
                char.classList.add('incorrect');
                errors++;
            }
        } else if (index === userText.length) {
            char.classList.add('current');
        }
    });
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const words = userText.trim().split(/\s+/).length;
    const wpm = Math.round(words / timeElapsed) || 0;
    
    wpmElement.textContent = wpm;
    errorsElement.textContent = errors;
    
    const totalChars = userText.length;
    const accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);
    accuracyElement.textContent = accuracy + '%';
}

function endTest() {
    testActive = false;
    clearInterval(timerInterval);
    userInput.disabled = true;
    userInput.value = '';
}

function submitTest() {
    if (!testActive) {
        endTest();
    }
    
    clearInterval(timerInterval);
    testActive = false;
    userInput.disabled = true;
    
    calculateResults();
}

function calculateResults() {
    const userText = userInput.value;
    const paragraphText = currentParagraph;
    
    const timeElapsed = testDuration - timeLeft;
    const timeInMinutes = timeElapsed / 60;
    
    let correctChars = 0;
    let totalErrors = 0;
    let correctWords = 0;
    
    const userWords = userText.trim().split(/\s+/);
    const paragraphWords = paragraphText.split(/\s+/);
    
    for (let i = 0; i < userText.length; i++) {
        if (i < paragraphText.length) {
            if (userText[i] === paragraphText[i]) {
                correctChars++;
            } else {
                totalErrors++;
            }
        } else {
            totalErrors++;
        }
    }
    
    for (let i = 0; i < userWords.length; i++) {
        if (i < paragraphWords.length && userWords[i] === paragraphWords[i]) {
            correctWords++;
        }
    }
    
    const wpm = Math.round((userWords.length / timeInMinutes)) || 0;
    const accuracy = userText.length === 0 ? 0 : Math.round((correctChars / userText.length) * 100);
    
    document.getElementById('final-wpm').textContent = wpm;
    document.getElementById('total-words').textContent = userWords.length;
    document.getElementById('final-accuracy').textContent = accuracy + '%';
    document.getElementById('correct-chars').textContent = correctChars;
    document.getElementById('total-errors').textContent = totalErrors;
    document.getElementById('time-spent').textContent = timeElapsed + 's';
    document.getElementById('correct-words').textContent = correctWords;
    
    testScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

function restartTest() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    userInput.value = '';
    wpmElement.textContent = '0';
    errorsElement.textContent = '0';
    accuracyElement.textContent = '100%';
}