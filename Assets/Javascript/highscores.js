const scoreContainer = document.querySelector('.scores');
const goBackButton = document.querySelector('.high-score-button')
    .querySelectorAll('button')[0];
const resetHighScoresButton = document.querySelector('.high-score-button')
    .querySelectorAll('button')[1];

function getHighScores() {
    const highScoresHistory = JSON.parse(localStorage.getItem('highScores'));

    if (highScoresHistory.length >0 ) {
        const scores = highScoresHistory
            .map(history => `<p class="score">${history.initials} scored ${history.percentage}</p>`)
            .join('');
        scoreContainer.innerHTML = scores;

    } else {
        scoreContainer.innerHTML = `<p class="score"> No High Scores...</p>`
    }

}

goBackButton.addEventListener('click', () => {
    location.href = '/homework-4/index.html';
});

resetHighScoresButton.addEventListener("click", () => {
    localStorage.setItem('highScores', JSON.stringify([]));
    getHighScores();
})
getHighScores();