/**
 * Het "brein" van de applicatie. Bevat de spellogica en verbindt alle onderdelen.
 */
export default class QuizController {
    constructor(noteService, staffView, uiView) {
        this.noteService = noteService;
        this.staffView = staffView;
        this.uiView = uiView;

        // Game State
        this.score = 0;
        this.totalQuestions = 0;
        this.incorrectAnswers = {};
        this.currentNote = null;
        this.gameMode = 'practice';
        this.currentClef = 'g';
        this.timerId = null;
        this.timeLeft = 0;
        this.TIME_LIMIT = 60;
    }

    init() {
        this.uiView.bindStartGame(this.startGame.bind(this));
        this.uiView.bindEndGame(this.endGame.bind(this));
        this.uiView.bindRestartGame(() => this.startGame(this.gameMode, this.currentClef));
        this.uiView.bindReportToMenu(this.resetApp.bind(this));
        this.uiView.bindAnswer(this.handleAnswer.bind(this));
    }

    startGame(mode, clef) {
        this.gameMode = mode;
        this.currentClef = clef;
        this.score = 0;
        this.totalQuestions = 0;
        this.incorrectAnswers = {};

        this.uiView.showScreen('quiz');

        if (this.gameMode === 'time-attack') {
            this._startTimer();
        } else {
            this.uiView.hideTimer();
            this.uiView.updateScore(this.score, this.totalQuestions, this.gameMode);
        }

        this.showNextNote();
    }

    endGame() {
        this._stopTimer();
        this.uiView.showReport({
            score: this.score,
            totalQuestions: this.totalQuestions,
            incorrectAnswers: this.incorrectAnswers
        });
    }

    resetApp() {
        this._stopTimer();
        this.uiView.showScreen('menu');
    }

    handleAnswer(selectedName) {
        this.uiView.toggleAnswerButtons(true);
        this.totalQuestions++;

        const isCorrect = selectedName === this.currentNote.name;
        if (isCorrect) {
            this.score++;
        } else {
            const noteId = `${this.currentNote.name}_${this.currentNote.octave}`;
            this.incorrectAnswers[noteId] = (this.incorrectAnswers[noteId] || 0) + 1;
        }

        this.uiView.setAnswerButtonsState(isCorrect, selectedName, this.currentNote.name);
        this.uiView.updateScore(this.score, this.totalQuestions, this.gameMode);

        const transitionTime = this.gameMode === 'time-attack' ? 500 : 1500;
        setTimeout(() => this.showNextNote(), transitionTime);
    }

    showNextNote() {
        this.currentNote = this.noteService.getRandomNote(this.currentClef);
        this.staffView.render(this.currentNote);
        this.uiView.toggleAnswerButtons(false);
    }

    _startTimer() {
        this.timeLeft = this.TIME_LIMIT;
        this.uiView.updateTimer(this.timeLeft);
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.uiView.updateTimer(this.timeLeft);
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    _stopTimer() {
        clearInterval(this.timerId);
    }
}
