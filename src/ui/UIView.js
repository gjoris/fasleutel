import { translate } from '../utils/i18n.js';

export class UIView {
    #menuScreen;
    #quizScreen;
    #reportScreen;
    #scoreDisplay;
    #timerDisplay;
    #streakDisplay;
    #answerButtonsContainer;
    #reportSummary;
    #problemNotesList;
    #languageSelector;
    #currentLangDisplay;
    #NOTE_NAMES = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];

    constructor() {
        this.#menuScreen = document.getElementById('menu-screen');
        this.#quizScreen = document.getElementById('quiz-screen');
        this.#reportScreen = document.getElementById('report-screen');
        this.#scoreDisplay = document.getElementById('score');
        this.#timerDisplay = document.getElementById('timer');
        this.#streakDisplay = document.getElementById('streak-display');
        this.#answerButtonsContainer = document.getElementById('answer-buttons');
        this.#reportSummary = document.getElementById('report-summary');
        this.#problemNotesList = document.getElementById('problem-notes');

        this.#initAnswerButtons();

        this.#languageSelector = document.querySelector('.dropdown-content');
        this.#currentLangDisplay = document.getElementById('current-lang-display');
    }

    bindLanguageSwitcher(handler) {
        this.#languageSelector.addEventListener('click', (event) => {
            if (event.target.classList.contains('dropdown-item')) {
                event.preventDefault();
                handler(event.target.dataset.lang);
            }
        });
    }

    updateCurrentLanguageDisplay(lang) {
        this.#currentLangDisplay.textContent = lang.toUpperCase();
    }

    updateStreak(streak) {
        if (!this.#streakDisplay) return;
        this.#streakDisplay.textContent = `🔥 ${streak}`;
        if (streak > 0) {
            this.#streakDisplay.classList.remove('hidden');
            this.#streakDisplay.classList.add('bounce');
            setTimeout(() => this.#streakDisplay.classList.remove('bounce'), 300);
        } else {
            this.#streakDisplay.classList.add('hidden');
        }
    }

    bindStartGame(handler) {
        this.#menuScreen.addEventListener('click', (event) => {
            let targetButton = event.target.closest('button');
            if (targetButton && targetButton.dataset.mode) {
                handler(targetButton.dataset.mode, targetButton.dataset.clef);
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

    bindDebugReport(handler) {
        document.getElementById('debug-report-button').addEventListener('click', handler);
    }

    bindAnswer(handler) {
        this.#answerButtonsContainer.addEventListener('click', (event) => {
            let targetButton = event.target.closest('button');
            if (targetButton && targetButton.dataset.noteName) {
                handler(targetButton.dataset.noteName);
            }
        });
    }

    bindKeyboardAnswers(handler) {
        window.addEventListener('keydown', (event) => {
            if (this.#quizScreen.classList.contains('hidden')) return;

            const key = event.key;
            if (key >= '1' && key <= '7') {
                const index = parseInt(key) - 1;
                handler(this.#NOTE_NAMES[index]);
            }
        });
    }

    showScreen(screenName) {
        this.#menuScreen.classList.add('hidden');
        this.#quizScreen.classList.add('hidden');
        this.#reportScreen.classList.add('hidden');
        document.getElementById(`${screenName}-screen`).classList.remove('hidden');
    }

    updateScore(score, totalQuestions, gameMode) {
        if (gameMode === 'practice') {
            this.#scoreDisplay.textContent = `${translate('score')}: ${score}/${totalQuestions}`;
        } else {
            this.#scoreDisplay.textContent = `${translate('score')}: ${score}`;
        }
    }

    updateTimer(timeLeft) {
        this.#timerDisplay.textContent = `${translate('time')}: ${timeLeft}`;
        this.#timerDisplay.classList.remove('hidden');
    }

    hideTimer() {
        this.#timerDisplay.classList.add('hidden');
    }

    showReport({ score, totalQuestions, incorrectAnswers, staffView, maxStreak }) {
        const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
        this.#reportSummary.innerHTML = `
            <p>${translate('results')}: <strong>${score} / ${totalQuestions}</strong> (${accuracy}%)</p>
            <p>${translate('max_streak')}: <strong>${maxStreak}</strong> 🔥</p>
        `;

        this.#problemNotesList.innerHTML = '';
        const sortedProblemNotes = Object.values(incorrectAnswers).sort(
            (a, b) => b.count - a.count
        );

        if (sortedProblemNotes.length === 0) {
            this.#problemNotesList.innerHTML = `<li>${translate('perfect_score')}</li>`;
        } else {
            sortedProblemNotes.forEach((problemData) => {
                const listItem = document.createElement('li');
                listItem.classList.add('problem-note-item');

                const svgContainer = document.createElementNS(staffView.SVG_NAMESPACE, 'svg');
                svgContainer.classList.add('mini-staff');
                staffView.renderMini(problemData.note, svgContainer);
                listItem.appendChild(svgContainer);

                const noteText = document.createElement('span');
                noteText.textContent = translate('note_count_incorrect', {
                    name: problemData.note.name,
                    count: problemData.count,
                });
                listItem.appendChild(noteText);
                this.#problemNotesList.appendChild(listItem);
            });
        }
        this.showScreen('report');
    }

    setAnswerButtonsState(isCorrect, selectedName, correctName) {
        this.#answerButtonsContainer.querySelectorAll('button').forEach((btn) => {
            btn.classList.remove(
                'is-primary',
                'is-info',
                'is-success',
                'is-danger',
                'is-light',
                'is-warning'
            );
            if (btn.dataset.noteName === selectedName) {
                btn.classList.add(isCorrect ? 'is-success' : 'is-danger');
            }
            if (!isCorrect && btn.dataset.noteName === correctName) {
                btn.classList.add('is-success');
            }
        });
    }

    toggleAnswerButtons(disabled) {
        this.#answerButtonsContainer.querySelectorAll('button').forEach((btn) => {
            btn.disabled = disabled;
        });
    }

    resetAnswerButtons() {
        this.#answerButtonsContainer.querySelectorAll('button').forEach((btn) => {
            btn.classList.remove('is-success', 'is-danger');
        });
    }

    #initAnswerButtons() {
        this.#answerButtonsContainer.innerHTML = '';
        this.#NOTE_NAMES.forEach((name, index) => {
            const button = document.createElement('button');
            button.classList.add('button');
            button.innerHTML = `<span>${name}</span><br><small class="has-text-grey-light">(${index + 1})</small>`;
            button.dataset.noteName = name;
            this.#answerButtonsContainer.appendChild(button);
        });
    }
}
