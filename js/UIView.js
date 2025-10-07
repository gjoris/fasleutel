/**
 * Beheert alle overige DOM-interacties.
 */
export default class UIView {
    constructor() {
        this.menuScreen = document.getElementById('menu-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.reportScreen = document.getElementById('report-screen');
        this.scoreDisplay = document.getElementById('score');
        this.timerDisplay = document.getElementById('timer');
        this.answerButtonsContainer = document.getElementById('answer-buttons');
        this.reportSummary = document.getElementById('report-summary');
        this.problemNotesList = document.getElementById('problem-notes');
        this.NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
        this._initAnswerButtons();
    }

    bindStartGame(handler) {
        this.menuScreen.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const { mode, clef } = event.target.dataset;
                if (mode && clef) handler(mode, clef);
            }
        });
    }

    bindEndGame(handler) {
        document.getElementById('back-to-menu').addEventListener('click', handler);
    }

    bindRestartGame(handler) {
        document.getElementById('restart-game').addEventListener('click', handler);
    }

    bindReportToMenu(handler) {
        document.getElementById('report-to-menu').addEventListener('click', handler);
    }

    bindAnswer(handler) {
        this.answerButtonsContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                handler(event.target.dataset.noteName);
            }
        });
    }

    showScreen(screenName) {
        this.menuScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.reportScreen.classList.add('hidden');
        document.getElementById(`${screenName}-screen`).classList.remove('hidden');
    }

    updateScore(score, totalQuestions, gameMode) {
        if (gameMode === 'practice') {
            this.scoreDisplay.textContent = `Score: ${score}/${totalQuestions}`;
        } else {
            this.scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    updateTimer(timeLeft) {
        this.timerDisplay.textContent = `Tijd: ${timeLeft}`;
        this.timerDisplay.classList.toggle('hidden', false);
    }

    hideTimer() {
        this.timerDisplay.classList.add('hidden');
    }

    showReport({ score, totalQuestions, incorrectAnswers }) {
        const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        this.reportSummary.innerHTML = `Eindscore: <strong>${score} / ${totalQuestions}</strong> (${accuracy}%)`;

        this.problemNotesList.innerHTML = '';
        const sortedProblemNotes = Object.entries(incorrectAnswers).sort(([, a], [, b]) => b - a);

        if (sortedProblemNotes.length === 0) {
            this.problemNotesList.innerHTML = '<li>Perfect! Je had geen enkele noot fout.</li>';
        } else {
            sortedProblemNotes.forEach(([noteId, count]) => {
                const [name, octave] = noteId.split('_');
                const listItem = document.createElement('li');
                listItem.textContent = `Noot: ${name}${octave} (${count} keer fout)`;
                this.problemNotesList.appendChild(listItem);
            });
        }
        this.showScreen('report');
    }

    setAnswerButtonsState(isCorrect, selectedName, correctName) {
        this.answerButtonsContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            if (btn.dataset.noteName === selectedName) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            if (!isCorrect && btn.dataset.noteName === correctName) {
                btn.classList.add('correct');
            }
        });
    }

    toggleAnswerButtons(disabled) {
        this.answerButtonsContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('disabled', disabled);
        });
    }

    _initAnswerButtons() {
        this.answerButtonsContainer.innerHTML = '';
        this.NOTE_NAMES.forEach(name => {
            const button = document.createElement('button');
            button.textContent = name;
            button.dataset.noteName = name;
            this.answerButtonsContainer.appendChild(button);
        });
    }
}
