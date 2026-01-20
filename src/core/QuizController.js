import { applyTranslations, setLanguage } from '../utils/i18n.js';

export class QuizController {
    #noteService;
    #staffView;
    #uiView;
    #score = 0;
    #totalQuestions = 0;
    #incorrectAnswers = {};
    #currentNote = null;
    #gameMode = 'practice';
    #currentClef = 'g';
    #timerId = null;
    #timeLeft = 0;
    #TIME_LIMIT = 60;
    #SPRINT_QUESTIONS_LIMIT = 10;
    #isLocked = false;

    constructor(noteService, staffView, uiView) {
        this.#noteService = noteService;
        this.#staffView = staffView;
        this.#uiView = uiView;
    }

    init() {
        this.#uiView.bindStartGame(this.startGame.bind(this));
        this.#uiView.bindEndGame(this.endGame.bind(this));
        this.#uiView.bindRestartGame(() => this.startGame(this.#gameMode, this.#currentClef));
        this.#uiView.bindReportToMenu(this.resetApp.bind(this));
        this.#uiView.bindAnswer(this.handleAnswer.bind(this));
        this.#uiView.bindKeyboardAnswers(this.handleAnswer.bind(this));
        this.#uiView.bindDebugReport(this.showDebugReport.bind(this));
        this.#uiView.bindLanguageSwitcher(this.setLanguage.bind(this));

        applyTranslations(this.#uiView);
    }

    startGame(mode, clef) {
        this.#gameMode = mode;
        this.#currentClef = clef;
        this.#score = 0;
        this.#totalQuestions = 0;
        this.#incorrectAnswers = {};
        this.#isLocked = false;

        this.#uiView.showScreen('quiz');

        if (this.#gameMode === 'time-attack') {
            this.#startTimer();
            this.#uiView.updateScore(this.#score, this.#totalQuestions, this.#gameMode);
        } else if (this.#gameMode === 'sprint') {
            this.#uiView.hideTimer();
            this.#uiView.updateScore(this.#score, this.#SPRINT_QUESTIONS_LIMIT, this.#gameMode);
        } else {
            this.#uiView.hideTimer();
            this.#uiView.updateScore(this.#score, this.#totalQuestions, this.#gameMode);
        }

        this.showNextNote();
    }

    endGame() {
        this.#stopTimer();
        
        if (window.goatcounter && this.#totalQuestions > 0) {
            window.goatcounter.count({
                path: 'quiz-completed',
                title: 'Quiz Completed',
                event: true
            });
        }
        
        this.#uiView.showReport({
            score: this.#score,
            totalQuestions: this.#totalQuestions,
            incorrectAnswers: this.#incorrectAnswers,
            staffView: this.#staffView
        });
    }

    resetApp() {
        this.#stopTimer();
        this.#uiView.showScreen('menu');
    }

    handleAnswer(selectedName) {
        if (this.#isLocked) return;
        this.#isLocked = true;

        this.#uiView.toggleAnswerButtons(true);
        this.#totalQuestions++;

        const isCorrect = selectedName === this.#currentNote.name;
        if (isCorrect) {
            this.#score++;
        } else {
            const noteId = `${this.#currentNote.name}_${this.#currentNote.octave}_${this.#currentNote.clef}`;
            if (!this.#incorrectAnswers[noteId]) {
                this.#incorrectAnswers[noteId] = { note: this.#currentNote, count: 0 };
            }
            this.#incorrectAnswers[noteId].count++;
        }

        this.#uiView.setAnswerButtonsState(isCorrect, selectedName, this.#currentNote.name);
        this.#uiView.updateScore(this.#score, 
            this.#gameMode === 'sprint' ? this.#SPRINT_QUESTIONS_LIMIT : this.#totalQuestions,
            this.#gameMode
        );

        const transitionTime = this.#gameMode === 'time-attack' ? 500 : 1500;
        
        if (this.#gameMode === 'sprint' && this.#totalQuestions >= this.#SPRINT_QUESTIONS_LIMIT) {
            setTimeout(() => this.endGame(), transitionTime);
        } else {
            setTimeout(() => this.showNextNote(), transitionTime);
        }
    }

    showNextNote() {
        this.#isLocked = false;
        this.#uiView.resetAnswerButtons();
        this.#currentNote = this.#noteService.getRandomNote(this.#currentClef);
        this.#staffView.render(this.#currentNote);
        this.#uiView.toggleAnswerButtons(false);
    }

    showDebugReport() {
        this.#score = 10;
        this.#totalQuestions = 20;
        this.#incorrectAnswers = {
            "do_4_g": { note: { name: 'do', octave: 4, y: 3, clef: 'g' }, count: 3 },
            "fa_5_g": { note: { name: 'fa', octave: 5, y: -2, clef: 'g' }, count: 2 },
            "mi_2_f": { note: { name: 'mi', octave: 2, y: 3, clef: 'f' }, count: 4 },
            "la_1_f": { note: { name: 'la', octave: 1, y: 5, clef: 'f' }, count: 1 },
            "si_4_g": { note: { name: 'si', octave: 4, y: 0, clef: 'g' }, count: 5 }
        };
        this.endGame();
    }

    #startTimer() {
        this.#timeLeft = this.#TIME_LIMIT;
        this.#uiView.updateTimer(this.#timeLeft);
        this.#timerId = setInterval(() => {
            this.#timeLeft--;
            this.#uiView.updateTimer(this.#timeLeft);
            if (this.#timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    #stopTimer() {
        clearInterval(this.#timerId);
    }

    setLanguage(newLang) {
        setLanguage(newLang);
        applyTranslations(this.#uiView);
    }
}
