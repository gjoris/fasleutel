document.addEventListener('DOMContentLoaded', () => {

    //================================================================
    // 1. Data Layer
    //================================================================

    /**
     * Beheert de definitie en het ophalen van noten.
     */
    class NoteService {
        constructor() {
            this.notes = {
                g: [
                    { name: 'Fa', octave: 3, y: 5 },
                    { name: 'Sol', octave: 3, y: 4.5 },
                    { name: 'La', octave: 3, y: 4 },
                    { name: 'Si', octave: 3, y: 3.5 },
                    { name: 'Do', octave: 4, y: 3 },
                    { name: 'Re', octave: 4, y: 2.5 },
                    { name: 'Mi', octave: 4, y: 2 },
                    { name: 'Fa', octave: 4, y: 1.5 },
                    { name: 'Sol', octave: 4, y: 1 },
                    { name: 'La', octave: 4, y: 0.5 },
                    { name: 'Si', octave: 4, y: 0 },
                    { name: 'Do', octave: 5, y: -0.5 },
                    { name: 'Re', octave: 5, y: -1 },
                    { name: 'Mi', octave: 5, y: -1.5 },
                    { name: 'Fa', octave: 5, y: -2 },
                    { name: 'Sol', octave: 5, y: -2.5 },
                    { name: 'La', octave: 5, y: -3 },
                ],
                f: [
                    { name: 'La', octave: 1, y: 5 },
                    { name: 'Si', octave: 1, y: 4.5 },
                    { name: 'Do', octave: 2, y: 4 },
                    { name: 'Re', octave: 2, y: 3.5 },
                    { name: 'Mi', octave: 2, y: 3 },
                    { name: 'Fa', octave: 2, y: 2.5 },
                    { name: 'Sol', octave: 2, y: 2 },
                    { name: 'La', octave: 2, y: 1.5 },
                    { name: 'Si', octave: 2, y: 1 },
                    { name: 'Do', octave: 3, y: 0.5 },
                    { name: 'Re', octave: 3, y: 0 },
                    { name: 'Mi', octave: 3, y: -0.5 },
                    { name: 'Fa', octave: 3, y: -1 },
                    { name: 'Sol', octave: 3, y: -1.5 },
                    { name: 'La', octave: 3, y: -2 },
                    { name: 'Si', octave: 3, y: -2.5 },
                    { name: 'Do', octave: 4, y: -3 },
                ]
            };
        }

        getRandomNote(clef) {
            let clefForNote = clef;
            if (clef === 'both') {
                clefForNote = Math.random() < 0.5 ? 'g' : 'f';
            }
            const availableNotes = this.notes[clefForNote];
            const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
            return { ...randomNote, clef: clefForNote };
        }
    }

    //================================================================
    // 2. View/Rendering Layer
    //================================================================

    /**
     * Beheert alle teken-operaties op de SVG notenbalk.
     */
    class StaffView {
        constructor(svgElement) {
            this.svg = svgElement;
            this.SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
            this.STAFF_LINE_GAP = 12;
            this.STAFF_LINES = 5;
            this.STAFF_BASE_Y = 100;
        }

        render(note) {
            this.svg.innerHTML = '';
            this._drawStaffLines();
            this._drawClef(note);
            this._drawNote(note);
            this._drawLedgerLines(note);
        }

        _drawStaffLines() {
            for (let i = 0; i < this.STAFF_LINES; i++) {
                const y = this.STAFF_BASE_Y + i * this.STAFF_LINE_GAP;
                const line = this._createElementNS('line', {
                    x1: '10', y1: y, x2: '390', y2: y,
                    stroke: '#000000', 'stroke-width': '1'
                });
                this.svg.appendChild(line);
            }
        }

        _drawClef(note) {
            const clefChar = note.clef === 'g' ? '𝄞' : '𝄢';
            const clefY = note.clef === 'g'
                ? this.STAFF_BASE_Y + 3.8 * this.STAFF_LINE_GAP
                : this.STAFF_BASE_Y + 2.9 * this.STAFF_LINE_GAP;
            const clefSize = note.clef === 'g' ? '70px' : '48px';

            const clefText = this._createElementNS('text', {
                x: '20', y: clefY, fill: '#000000', 'font-size': clefSize
            });
            clefText.textContent = clefChar;
            this.svg.appendChild(clefText);
        }

        _drawNote(note) {
            const noteY = this.STAFF_BASE_Y + (this.STAFF_LINE_GAP * 2) + (note.y * this.STAFF_LINE_GAP);
            const noteHead = this._createElementNS('ellipse', {
                cx: '200', cy: noteY, rx: '8', ry: '6', fill: '#000000'
            });
            this.svg.appendChild(noteHead);
        }

        _drawLedgerLines(note) {
            const drawLine = (y_pos) => {
                const ledgerLineY = this.STAFF_BASE_Y + (this.STAFF_LINE_GAP * 2) + (y_pos * this.STAFF_LINE_GAP);
                const ledgerLine = this._createElementNS('line', {
                    x1: '190', y1: ledgerLineY, x2: '210', y2: ledgerLineY,
                    stroke: '#000000', 'stroke-width': '1.5'
                });
                this.svg.appendChild(ledgerLine);
            };

            if (note.y >= 3) { // Noten onder de notenbalk
                for (let y_pos = 3; y_pos <= note.y; y_pos += 1) {
                    drawLine(y_pos);
                }
            } else if (note.y <= -3) { // Noten boven de notenbalk
                for (let y_pos = -3; y_pos >= note.y; y_pos -= 1) {
                    drawLine(y_pos);
                }
            }
        }

        _createElementNS(type, attributes) {
            const el = document.createElementNS(this.SVG_NAMESPACE, type);
            for (const key in attributes) {
                el.setAttribute(key, attributes[key]);
            }
            return el;
        }

        renderMini(note, targetSvgElement) {
            targetSvgElement.innerHTML = '';
            const miniWidth = 150; // Fixed width for the mini staff SVG
            const miniHeight = 100; // Fixed height for the mini staff SVG

            targetSvgElement.setAttribute('width', miniWidth);
            targetSvgElement.setAttribute('height', miniHeight);
            targetSvgElement.setAttribute('viewBox', `0 0 ${miniWidth} ${miniHeight}`); // 1:1 scaling

            // Use smaller internal drawing units for the mini staff
            const miniStaffLineGap = 9; // 0.75x original gap
            const miniStaffBaseY = (miniHeight / 2) - (miniStaffLineGap * 2); // Center staff vertically (50 - 18 = 32)

            // Adjust positions based on new gap
            const miniNoteX = (miniWidth / 2) + 15; // Center X (75 + 15 = 90)
            const miniClefX = miniNoteX - 30; // Clef closer to note (90 - 30 = 60)
            const miniNoteRx = 6; // 0.75x original
            const miniNoteRy = 4.5; // 0.75x original
            const miniClefFontSize = (note.clef === 'g' ? 70 : 48) * 0.75; // 0.75x original font size

            // Draw 5 staff lines
            for (let i = 0; i < this.STAFF_LINES; i++) {
                const y = miniStaffBaseY + i * miniStaffLineGap;
                const line = this._createElementNS('line', {
                    x1: miniClefX - 10, y1: y, x2: miniNoteX + 10, y2: y, // Shorter lines around clef and note
                    stroke: '#000000', 'stroke-width': 1 // Thinner lines
                });
                targetSvgElement.appendChild(line);
            }

            // Draw clef
            const clefChar = note.clef === 'g' ? '𝄞' : '𝄢';
            const clefY = note.clef === 'g'
                ? miniStaffBaseY + 3.8 * miniStaffLineGap
                : miniStaffBaseY + 2.9 * miniStaffLineGap;

            const clefText = this._createElementNS('text', {
                x: miniClefX, y: clefY, fill: '#000000', 'font-size': `${miniClefFontSize}px`
            });
            clefText.textContent = clefChar;
            targetSvgElement.appendChild(clefText);

            // Draw note
            const noteY = miniStaffBaseY + (miniStaffLineGap * 2) + (note.y * miniStaffLineGap);
            const noteHead = this._createElementNS('ellipse', {
                cx: miniNoteX, cy: noteY, rx: miniNoteRx, ry: miniNoteRy, fill: '#000000'
            });
            targetSvgElement.appendChild(noteHead);

            // Draw ledger lines
            const drawLine = (y_pos) => {
                const ledgerLineY = miniStaffBaseY + (miniStaffLineGap * 2) + (y_pos * miniStaffLineGap);
                const ledgerLine = this._createElementNS('line', {
                    x1: miniNoteX - 8, y1: ledgerLineY, x2: miniNoteX + 8, y2: ledgerLineY, // Proportional width
                    stroke: '#000000', 'stroke-width': 1.0 // Proportional thickness
                });
                targetSvgElement.appendChild(ledgerLine);
            };

            if (note.y >= 3) { // Noten onder de notenbalk
                for (let y_pos = 3; y_pos <= note.y; y_pos += 1) {
                    drawLine(y_pos);
                }
            } else if (note.y <= -3) { // Noten boven de notenbalk
                for (let y_pos = -3; y_pos >= note.y; y_pos -= 1) {
                    drawLine(y_pos);
                }
            }
        }
    }

    /**
     * Beheert alle overige DOM-interacties.
     */
    class UIView {
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

        bindDebugReport(handler) {
            document.getElementById('debug-report-button').addEventListener('click', handler);
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

        showReport({ score, totalQuestions, incorrectAnswers, staffView }) {
            const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
            this.reportSummary.innerHTML = `Eindscore: <strong>${score} / ${totalQuestions}</strong> (${accuracy}%)`;

            this.problemNotesList.innerHTML = '';
            const sortedProblemNotes = Object.values(incorrectAnswers).sort((a, b) => b.count - a.count);

            if (sortedProblemNotes.length === 0) {
                this.problemNotesList.innerHTML = '<li>Perfect! Je had geen enkele noot fout.</li>';
            } else {
                sortedProblemNotes.forEach(problemData => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('problem-note-item');

                    const svgContainer = document.createElementNS(staffView.SVG_NAMESPACE, 'svg');
                    svgContainer.classList.add('mini-staff');
                    staffView.renderMini(problemData.note, svgContainer);
                    listItem.appendChild(svgContainer);

                    const noteText = document.createElement('span');
                    noteText.textContent = `${problemData.note.name} (${problemData.count} keer fout)`;
                    listItem.appendChild(noteText);

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

        resetAnswerButtons() {
            this.answerButtonsContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('correct', 'incorrect');
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

    //================================================================
    // 3. Controller Layer
    //================================================================

    /**
     * Het "brein" van de applicatie. Bevat de spellogica en verbindt alle onderdelen.
     */
    class QuizController {
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
            this.SPRINT_QUESTIONS_LIMIT = 10; // Nieuwe constante voor Sprint modus
        }

        init() {
            this.uiView.bindStartGame(this.startGame.bind(this));
            this.uiView.bindEndGame(this.endGame.bind(this));
            this.uiView.bindRestartGame(() => this.startGame(this.gameMode, this.currentClef));
            this.uiView.bindReportToMenu(this.resetApp.bind(this));
            this.uiView.bindAnswer(this.handleAnswer.bind(this));
            this.uiView.bindDebugReport(this.showDebugReport.bind(this)); // Bind debug button
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
                this.uiView.updateScore(this.score, this.totalQuestions, this.gameMode);
            } else if (this.gameMode === 'sprint') { // Nieuwe logica voor Sprint modus
                this.uiView.hideTimer();
                this.uiView.updateScore(this.score, this.SPRINT_QUESTIONS_LIMIT, this.gameMode);
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
                incorrectAnswers: this.incorrectAnswers,
                staffView: this.staffView // Pass staffView instance
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
                const noteId = `${this.currentNote.name}_${this.currentNote.octave}_${this.currentNote.clef}`;
                if (!this.incorrectAnswers[noteId]) {
                    this.incorrectAnswers[noteId] = { note: this.currentNote, count: 0 };
                }
                this.incorrectAnswers[noteId].count++;
            }

            this.uiView.setAnswerButtonsState(isCorrect, selectedName, this.currentNote.name);
            this.uiView.updateScore(this.score, 
                this.gameMode === 'sprint' ? this.SPRINT_QUESTIONS_LIMIT : this.totalQuestions,
                this.gameMode
            );

            const transitionTime = this.gameMode === 'time-attack' ? 500 : 1500;
            
            // Controleer of de Sprint modus is afgelopen
            if (this.gameMode === 'sprint' && this.totalQuestions >= this.SPRINT_QUESTIONS_LIMIT) {
                setTimeout(() => this.endGame(), transitionTime);
            } else {
                setTimeout(() => this.showNextNote(), transitionTime);
            }
        }

        showNextNote() {
            this.uiView.resetAnswerButtons();
            this.currentNote = this.noteService.getRandomNote(this.currentClef);
            this.staffView.render(this.currentNote);
            this.uiView.toggleAnswerButtons(false);
        }

        showDebugReport() {
            // Voorbeelddata voor debugging
            this.score = 10;
            this.totalQuestions = 20;
            this.incorrectAnswers = {
                "Do_4_g": { note: { name: 'Do', octave: 4, y: 3, clef: 'g' }, count: 3 },
                "Fa_5_g": { note: { name: 'Fa', octave: 5, y: -2, clef: 'g' }, count: 2 },
                "Mi_2_f": { note: { name: 'Mi', octave: 2, y: 3, clef: 'f' }, count: 4 },
                "La_1_f": { note: { name: 'La', octave: 1, y: 5, clef: 'f' }, count: 1 },
                "Si_4_g": { note: { name: 'Si', octave: 4, y: 0, clef: 'g' }, count: 5 }
            };
            this.endGame();
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

    //================================================================
    // 4. App Initialization
    //================================================================

    const noteService = new NoteService();
    const staffView = new StaffView(document.getElementById('staff'));
    const uiView = new UIView();
    const app = new QuizController(noteService, staffView, uiView);

    window.app = app; // Maak app globaal toegankelijk voor debugging

    app.init();
});
