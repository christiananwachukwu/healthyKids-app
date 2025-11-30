// js/quiz.js

// 1. Define the Quiz Questions and Answers
const QUIZ_DATA = [
    {
        question: "How long should you wash your hands to get rid of germs?",
        options: ["5 seconds", "10 seconds", "20 seconds", "Until they feel dry"],
        correctAnswer: "20 seconds"
    },
    {
        question: "What is the best drink for keeping your body hydrated?",
        options: ["Soda", "Juice", "Milk", "Water"],
        correctAnswer: "Water"
    },
    {
        question: "How many minutes should you brush your teeth?",
        options: ["1 minute", "2 minutes", "3 minutes", "5 minutes"],
        correctAnswer: "2 minutes"
    },
    {
        question: "Which of these is a 'GO' food you should eat every day?",
        options: ["Candy Bar", "Apple", "French Fries", "Donut"],
        correctAnswer: "Apple"
    }
];

// 2. DOM Elements and State Variables
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');
const nextButton = document.getElementById('next-button');
const quizArea = document.getElementById('quiz-area');
const resultsArea = document.getElementById('results-area');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionsSpan = document.getElementById('total-questions');

let currentQuestionIndex = 0;
let score = 0;
let answered = false; // Flag to prevent double-clicking

// 3. --- CORE QUIZ FUNCTIONS ---

function loadQuestion() {
    if (currentQuestionIndex >= QUIZ_DATA.length) {
        showResults();
        return;
    }

    answered = false;
    feedbackMessage.textContent = '';
    nextButton.style.display = 'none';
   
    const currentQ = QUIZ_DATA[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = '';

    currentQ.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(button, option, currentQ.correctAnswer));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (answered) return; // Prevent clicking multiple times

    answered = true;
   
    // Disable all buttons after one is clicked
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        score++;
        button.classList.add('correct');
        feedbackMessage.textContent = 'Correct! Great job! 🎉';
    } else {
        button.classList.add('wrong');
        feedbackMessage.textContent = `Oops! The correct answer was: ${correctAnswer}.`;
       
        // Highlight the correct answer
        Array.from(optionsContainer.children)
            .find(btn => btn.textContent === correctAnswer)
            .classList.add('correct');
    }

    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizArea.style.display = 'none';
    nextButton.style.display = 'none';
    resultsArea.style.display = 'block';

    finalScoreSpan.textContent = score;
    totalQuestionsSpan.textContent = QUIZ_DATA.length;
}

// 4. --- EVENT LISTENERS and INITIALIZATION ---

nextButton.addEventListener('click', nextQuestion);

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', loadQuestion);