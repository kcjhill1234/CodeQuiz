let timer_length = 30;
const error_reduction = 5;
let timer;
const timerElement = document.getElementById('timer');
const questionsContainer = document.querySelector('timer');
const startElement = document.querySelector('.start');
const quizElement = document.querySelector('.container');
const endElement = document.querySelector('.end');
const questionContainer = document.getElementById('question');
const questionButtons = document.getElementById('question-buttons');
const questionCount = questions.length;
const resultContainer = document.querySelector('.result');


let currentQuestion = 0;
let shuffledQuestions;
let score = 0


endElement.querySelector('button').addEventListener('click', event => {
    event.preventDefault();
    const initials = endElement.querySelector('input').value;
    const percentage = `${Math.ceil((score / questionCount) * 100)}%`
    const highScore = {
        initials,
        percentage
    }
    let highScoreHistory = JSON.parse(localStorage.getItem('highScores'));
    if (highScoreHistory) {
        highScoreHistory.push(highScore);

    } else {
        highScoreHistory = [highScore];
    }
    localStorage.setItem("highScores", JSON.stringify(highScoreHistory));
    location.href = '/homework-4/highScores.html';
})
startElement.querySelector('button').addEventListener('click', startGame);


quizElement.style.display = 'none'
endElement.style.display = 'none'

function startGame() {
    startTimer();
    startElement.style.display = 'none';
    quizElement.style.display = 'flex';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    renderNextQuestion();
}

function renderNextQuestion() {
    questionButtons.innerHTML = '';
    const question = shuffledQuestions[currentQuestion];

    questionContainer.textContent = question.questions;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        button.classList.add('answer');
        questionButtons.appendChild(button);

    })

}
function selectAnswer(event) {

    const isCorrect = event.target.dataset.correct;

    if (isCorrect) {
        ++score;
        resultContainer.textContent = 'Correct'
    } else {
        timer_length -= error_reduction;
        resultContainer.textContent = 'Wrong!';

    }
    setTimeout(() => {
        resultContainer.textContent = '';
    }, 300)

    if (currentQuestion === shuffledQuestions.length - 1) {
        stopTimer();
        endOfGame();
    } else {
        ++currentQuestion;
        renderNextQuestion();
    }

}

function endOfGame() {
    quizElement.style.display = 'none';
    endElement.style.display = 'flex';
    const percentage = Math.ceil((score / questionCount) * 100);
    endElement.querySelector('p').textContent = `Your Score was ${percentage}%`;

}

function startTimer() {
    timer = setInterval(renderTimer, 1000)
}

function stopTimer() {
    timerElement.textContent = '';
    clearInterval(timer);
}

function renderTimer() {
    if (timer_length === 0) {
        stopTimer();
        endOfGame();
        return;
    }
    timerElement.textContent = `Time: ${timer_length}`;
    timer_length--;

}
