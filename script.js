const questions = [
    {
        question: "What is the correct form of the verb in this sentence: 'She _____ (to go) to the market yesterday.'?",
        options: ["goes", "went", "gone", "going"],
        answer: 1
    },
    {
        question: "Choose the correct sentence.",
        options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She don't likes apples."],
        answer: 2
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    nextButton.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(index) {
    const correct = index === questions[currentQuestionIndex].answer;
    if (correct) {
        score++;
    }
    Array.from(optionsContainer.children).forEach((button, i) => {
        if (i === questions[currentQuestionIndex].answer) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.textContent = `${score} out of ${questions.length}`;
}

function restartGame() {
    startGame();
}

document.addEventListener('DOMContentLoaded', startGame);
