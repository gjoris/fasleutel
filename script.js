document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        'nl': {
            'choose_mode': 'Kies een modus',
            'practice_mode': 'Oefenmodus',
            'practice_desc': 'Oefen zonder tijdslimiet.',
            'time_attack_mode': 'Tijdrace',
            'time_attack_desc': 'Raad zoveel mogelijk noten in 60 seconden.',
            'sprint_mode': 'Sprint (10 Noten)',
            'sprint_desc': 'Beantwoord 10 noten zo snel en accuraat mogelijk.',
            'debug_mode': 'Debug',
            'debug_desc': 'Toon direct een rapport met voorbeeld fouten.',
            'show_debug_report': 'Toon Debug Rapport',
            'quiz_question': 'Welke noot is dit?',
            'stop': 'Stoppen',
            'results': 'Resultaten',
            'score': 'Score',
            'time': 'Tijd',
            'points_out_of_total': '{{score}} / {{total}}',
            'accuracy': 'Nauwkeurigheid',
            'attention_points': 'Aandachtspunten',
            'perfect_score': 'Perfect! Je had geen enkele noot fout.',
            'note_count_incorrect': 'Noot: {{name}} ({{count}} keer fout)',
            'play_again': 'Opnieuw spelen',
            'back_to_menu': 'Terug naar menu',
            'g_clef': 'sol-sleutel',
            'f_clef': 'fa-sleutel',
            'both_clefs': 'beide sleutels',
            'made_with_love': 'Gemaakt met ❤️ voor 🎵.',
            'github_link_prefix': 'Bekijk de code op',
            'github_text': 'GitHub',
            'counter_visitors': 'Bezoekers',
            'counter_quizzes': 'Voltooide quizzen',
        },
        'en': {
            'choose_mode': 'Choose a mode',
            'practice_mode': 'Practice Mode',
            'practice_desc': 'Practice without time limit.',
            'time_attack_mode': 'Time Attack',
            'time_attack_desc': 'Guess as many notes as possible in 60 seconds.',
            'sprint_mode': 'Sprint (10 Notes)',
            'sprint_desc': 'Answer 10 notes as quickly and accurately as possible.',
            'debug_mode': 'Debug',
            'debug_desc': 'Show a report with sample errors directly.',
            'show_debug_report': 'Show Debug Report',
            'quiz_question': 'Which note is this?',
            'stop': 'Stop',
            'results': 'Results',
            'score': 'Score',
            'time': 'Time',
            'points_out_of_total': '{{score}} / {{total}}',
            'accuracy': 'Accuracy',
            'attention_points': 'Problem Notes',
            'perfect_score': 'Perfect! You got no notes wrong.',
            'note_count_incorrect': 'Note: {{name}} ({{count}} times wrong)',
            'play_again': 'Play Again',
            'back_to_menu': 'Back to Menu',
            'g_clef': 'g-clef',
            'f_clef': 'f-clef',
            'both_clefs': 'both clefs',
            'made_with_love': 'Made with ❤️ for 🎵.',
            'github_link_prefix': 'View code on',
            'github_text': 'GitHub',
            'counter_visitors': 'Visitors',
            'counter_quizzes': 'Completed quizzes',
        },
        'fr': {
            'choose_mode': 'Choisissez un mode',
            'practice_mode': 'Mode Entraînement',
            'practice_desc': 'Entraînez-vous sans limite de temps.',
            'time_attack_mode': 'Course contre la montre',
            'time_attack_desc': 'Devinez autant de notes que possible en 60 secondes.',
            'sprint_mode': 'Sprint (10 Notes)',
            'sprint_desc': 'Répondez à 10 notes aussi vite et précisément que possible.',
            'debug_mode': 'Débogage',
            'debug_desc': 'Afficher directement un rapport avec des erreurs d\'exemple.',
            'show_debug_report': 'Afficher le rapport de débogage',
            'quiz_question': 'Quelle est cette note ?',
            'stop': 'Arrêter',
            'results': 'Résultats',
            'score': 'Score',
            'time': 'Temps',
            'points_out_of_total': '{{score}} / {{total}}',
            'accuracy': 'Précision',
            'attention_points': 'Points d\'attention',
            'perfect_score': 'Parfait ! Vous n\'avez fait aucune erreur.',
            'note_count_incorrect': 'Note: {{name}} ({{count}} fois faux)',
            'play_again': 'Rejouer',
            'back_to_menu': 'Retour au menu',
            'g_clef': 'clé de sol',
            'f_clef': 'clé de fa',
            'both_clefs': 'les deux clés',
            'made_with_love': 'Fait avec ❤️ pour 🎵.',
            'github_link_prefix': 'Voir le code sur',
            'github_text': 'GitHub',
            'counter_visitors': 'Visiteurs',
            'counter_quizzes': 'Quiz complétés',
        },
        'de': {
            'choose_mode': 'Wählen Sie einen Modus',
            'practice_mode': 'Übungsmodus',
            'practice_desc': 'Üben Sie ohne Zeitlimit.',
            'time_attack_mode': 'Zeitangriff',
            'time_attack_desc': 'Erraten Sie so viele Noten wie möglich in 60 Sekunden.',
            'sprint_mode': 'Sprint (10 Noten)',
            'sprint_desc': 'Beantworten Sie 10 Noten so schnell und genau wie möglich.',
            'debug_mode': 'Debug',
            'debug_desc': 'Zeigen Sie direkt einen Bericht mit Beispielfehlern an.',
            'show_debug_report': 'Debug-Bericht anzeigen',
            'quiz_question': 'Welche Note ist das?',
            'stop': 'Stoppen',
            'results': 'Ergebnisse',
            'score': 'Punktzahl',
            'time': 'Zeit',
            'points_out_of_total': '{{score}} / {{total}}',
            'accuracy': 'Genauigkeit',
            'attention_points': 'Schwerpunkte',
            'perfect_score': 'Perfekt! Sie haben keine Fehler gemacht.',
            'note_count_incorrect': 'Note: {{name}} ({{count}} mal falsch)',
            'play_again': 'Nochmal spielen',
            'back_to_menu': 'Zurück zum Menü',
            'g_clef': 'Violinschlüssel',
            'f_clef': 'Bassschlüssel',
            'both_clefs': 'beide Schlüssel',
            'made_with_love': 'Mit ❤️ für 🎵 gemacht.',
            'github_link_prefix': 'Code ansehen auf',
            'github_text': 'GitHub',
            'counter_visitors': 'Besucher',
            'counter_quizzes': 'Abgeschlossene Quiz',
        },
        'it': {
            'choose_mode': 'Scegli una modalità',
            'practice_mode': 'Modalità Pratica',
            'practice_desc': 'Esercitati senza limiti di tempo.',
            'time_attack_mode': 'Attacco a tempo',
            'time_attack_desc': 'Indovina quante più note possibili in 60 secondi.',
            'sprint_mode': 'Sprint (10 Note)',
            'sprint_desc': 'Rispondi a 10 note il più velocemente e accuratamente possibile.',
            'debug_mode': 'Debug',
            'debug_desc': 'Mostra direttamente un rapporto con errori di esempio.',
            'show_debug_report': 'Mostra rapporto di debug',
            'quiz_question': 'Qual è questa nota?',
            'stop': 'Ferma',
            'results': 'Risultati',
            'score': 'Punteggio',
            'time': 'Tempo',
            'points_out_of_total': '{{score}} / {{total}}',
            'accuracy': 'Precisione',
            'attention_points': 'Punti di attenzione',
            'perfect_score': 'Perfetto! Non hai fatto errori.',
            'note_count_incorrect': 'Nota: {{name}} ({{count}} volte sbagliato)',
            'play_again': 'Gioca di nuovo',
            'back_to_menu': 'Torna al menu',
            'g_clef': 'chiave di violino',
            'f_clef': 'chiave di basso',
            'both_clefs': 'entrambe le chiavi',
            'made_with_love': 'Fatto con ❤️ per 🎵.',
            'github_link_prefix': 'Visualizza il codice su',
            'github_text': 'GitHub',
            'counter_visitors': 'Visitatori',
            'counter_quizzes': 'Quiz completati',
        },
        'es': {
            'choose_mode': 'Elige un modo',
            'practice_mode': 'Modo Práctica',
            'practice_desc': 'Practica sin límite de tiempo.',
            'time_attack_mode': 'Contrarreloj',
            'time_attack_desc': 'Adivina tantas notas como puedas en 60 segundos.',
            'sprint_mode': 'Sprint (10 Notas)',
            'sprint_desc': 'Responde 10 notas lo más rápido y preciso posible.',
            'debug_mode': 'Depuración',
            'debug_desc': 'Mostrar directamente un informe con errores de ejemplo.',
            'show_debug_report': 'Mostrar informe de depuración',
            'quiz_question': '¿Qué nota es esta?',
            'stop': 'Detener',
            'results': 'Resultados',
            'score': 'Puntuación',
            'time': 'Tiempo',
            'points_out_of_total': '{{score}} / {{total}}',
            'accuracy': 'Precisión',
            'attention_points': 'Puntos de atención',
            'perfect_score': '¡Perfecto! No cometiste ningún error.',
            'note_count_incorrect': 'Nota: {{name}} ({{count}} veces incorrecto)',
            'play_again': 'Jugar de nuevo',
            'back_to_menu': 'Volver al menú',
            'g_clef': 'clave de sol',
            'f_clef': 'clave de fa',
            'both_clefs': 'ambas claves',
            'made_with_love': 'Hecho con ❤️ para 🎵.',
            'github_link_prefix': 'Ver código en',
            'github_text': 'GitHub',
            'counter_visitors': 'Visitantes',
            'counter_quizzes': 'Cuestionarios completados',
        }
    };

    let currentLanguage = 'nl'; // Default language

    function translate(key, replacements = {}) {
        let text = translations[currentLanguage][key] || key; // Fallback to key if not found
        for (const placeholder in replacements) {
            text = text.replace(`{{${placeholder}}}`, replacements[placeholder]);
        }
        return text;
    }

    function applyTranslations(uiView) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            element.textContent = translate(key);
        });
        // Special handling for buttons with nested spans
        document.querySelectorAll('button[data-i18n-text]').forEach(button => {
            const key = button.dataset.i18nText;
            const span = button.querySelector('span:last-child');
            if (span) span.textContent = translate(key);
        });
        if (uiView) {
            uiView.updateCurrentLanguageDisplay(currentLanguage);
        }
        // Update dynamic text in UI (score, timer, etc.) - will be handled by UIView methods
    }

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
                    { name: 'fa', octave: 3, y: 5 },
                    { name: 'sol', octave: 3, y: 4.5 },
                    { name: 'la', octave: 3, y: 4 },
                    { name: 'si', octave: 3, y: 3.5 },
                    { name: 'do', octave: 4, y: 3 },
                    { name: 're', octave: 4, y: 2.5 },
                    { name: 'mi', octave: 4, y: 2 },
                    { name: 'fa', octave: 4, y: 1.5 },
                    { name: 'sol', octave: 4, y: 1 },
                    { name: 'la', octave: 4, y: 0.5 },
                    { name: 'si', octave: 4, y: 0 },
                    { name: 'do', octave: 5, y: -0.5 },
                    { name: 're', octave: 5, y: -1 },
                    { name: 'mi', octave: 5, y: -1.5 },
                    { name: 'fa', octave: 5, y: -2 },
                    { name: 'sol', octave: 5, y: -2.5 },
                    { name: 'la', octave: 5, y: -3 },
                ],
                f: [
                    { name: 'la', octave: 1, y: 5 },
                    { name: 'si', octave: 1, y: 4.5 },
                    { name: 'do', octave: 2, y: 4 },
                    { name: 're', octave: 2, y: 3.5 },
                    { name: 'mi', octave: 2, y: 3 },
                    { name: 'fa', octave: 2, y: 2.5 },
                    { name: 'sol', octave: 2, y: 2 },
                    { name: 'la', octave: 2, y: 1.5 },
                    { name: 'si', octave: 2, y: 1 },
                    { name: 'do', octave: 3, y: 0.5 },
                    { name: 're', octave: 3, y: 0 },
                    { name: 'mi', octave: 3, y: -0.5 },
                    { name: 'fa', octave: 3, y: -1 },
                    { name: 'sol', octave: 3, y: -1.5 },
                    { name: 'la', octave: 3, y: -2 },
                    { name: 'si', octave: 3, y: -2.5 },
                    { name: 'do', octave: 4, y: -3 },
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
            this.svg.setAttribute('viewBox', '0 0 400 200'); // Default viewBox for main staff
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
            // Adjust clefY to be relative to the staff lines and viewBox
            const clefY = note.clef === 'g'
                ? this.STAFF_BASE_Y + 3.8 * this.STAFF_LINE_GAP - 5 // Adjusted for better visual alignment
                : this.STAFF_BASE_Y + 2.9 * this.STAFF_LINE_GAP + 5; // Adjusted for better visual alignment
            const clefSize = note.clef === 'g' ? 70 : 48; // Unitless for SVG scaling

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
            const miniWidth = 150; // Fixed width for the mini staff SVG (used for viewBox)
            const miniHeight = 100; // Fixed height for the mini staff SVG (used for viewBox)

            // targetSvgElement.setAttribute('width', miniWidth); // Removed to allow CSS control
            // targetSvgElement.setAttribute('height', miniHeight); // Removed to allow CSS control
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
            this.NOTE_NAMES = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si']; // Lowercase
            this._initAnswerButtons();

            // Language selector
            this.languageSelector = document.querySelector('.dropdown-content');
            this.currentLangDisplay = document.getElementById('current-lang-display');
        }

        bindLanguageSwitcher(handler) {
            this.languageSelector.addEventListener('click', (event) => {
                if (event.target.classList.contains('dropdown-item')) {
                    event.preventDefault(); // Prevent default link behavior
                    const newLang = event.target.dataset.lang;
                    handler(newLang);
                }
            });
        }

        updateCurrentLanguageDisplay(lang) {
            this.currentLangDisplay.textContent = lang.toUpperCase();
        }

        bindStartGame(handler) {
            this.menuScreen.addEventListener('click', (event) => {
                let targetButton = event.target;
                // If the click is on an icon or span inside the button, find the parent button
                if (targetButton.tagName !== 'BUTTON') {
                    targetButton = event.target.closest('button');
                }
                if (targetButton && targetButton.tagName === 'BUTTON') {
                    const { mode, clef } = targetButton.dataset;
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
                let targetButton = event.target;
                if (targetButton.tagName !== 'BUTTON') {
                    targetButton = event.target.closest('button');
                }
                if (targetButton && targetButton.dataset.noteName) {
                    handler(targetButton.dataset.noteName);
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
                // Remove all potential Bulma color/style classes
                btn.classList.remove('is-primary', 'is-info', 'is-success', 'is-danger', 'is-light', 'is-warning');
                if (btn.dataset.noteName === selectedName) {
                    btn.classList.add(isCorrect ? 'is-success' : 'is-danger');
                }
                if (!isCorrect && btn.dataset.noteName === correctName) {
                    btn.classList.add('is-success');
                }
            });
        }

        toggleAnswerButtons(disabled) {
            this.answerButtonsContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.toggle('disabled', disabled);
                btn.disabled = disabled; // Add/remove the HTML disabled attribute
            });
        }

        resetAnswerButtons() {
            this.answerButtonsContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('is-success', 'is-danger'); // Only remove Bulma feedback classes
            });
        }

        _initAnswerButtons() {
            this.answerButtonsContainer.innerHTML = '';
            this.NOTE_NAMES.forEach(name => {
                const button = document.createElement('button');
                button.classList.add('button'); // Only add 'button' class for neutral styling
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
            this.uiView.bindLanguageSwitcher(this.setLanguage.bind(this)); // Bind language switcher

            applyTranslations(this.uiView); // Apply initial translations
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
            
            // Track quiz completion in GoatCounter (for all modes)
            if (window.goatcounter && this.totalQuestions > 0) {
                window.goatcounter.count({
                    path: 'quiz-completed',
                    title: 'Quiz Completed',
                    event: true
                });
            }
            
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

        setLanguage(newLang) {
            currentLanguage = newLang;
            applyTranslations(this.uiView);
            this.uiView.updateCurrentLanguageDisplay(newLang);
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

    // Controleer URL parameter voor debug modus
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug') && urlParams.get('debug') === 'true') {
        document.getElementById('debug-section').classList.remove('hidden');
    }

    app.init();

    // Fetch GoatCounter statistics
    function updateCounters() {
        // Site visits (homepage)
        let r1 = new XMLHttpRequest();
        r1.addEventListener('load', function() {
            if (this.status === 200) {
                try {
                    const data = JSON.parse(this.responseText);
                    document.getElementById('visitor-count').textContent = data.count || '0';
                } catch(e) {
                    console.error('Error parsing visitor count:', e);
                    document.getElementById('visitor-count').textContent = '-';
                }
            } else {
                console.error('Failed to fetch visitor count:', this.status);
                document.getElementById('visitor-count').textContent = '-';
            }
        });
        r1.open('GET', 'https://gjoris.goatcounter.com/counter/' + encodeURIComponent('/fasleutel') + '.json');
        r1.send();

        // Quiz completions
        let r2 = new XMLHttpRequest();
        r2.addEventListener('load', function() {
            if (this.status === 200) {
                try {
                    const data = JSON.parse(this.responseText);
                    document.getElementById('quiz-count').textContent = data.count || '0';
                } catch(e) {
                    console.error('Error parsing quiz count:', e);
                    document.getElementById('quiz-count').textContent = '0';
                }
            } else {
                console.error('Failed to fetch quiz count:', this.status, this.responseText);
                document.getElementById('quiz-count').textContent = '0';
            }
        });
        r2.open('GET', 'https://gjoris.goatcounter.com/counter/quiz-completed.json');
        r2.send();
    }
    
    updateCounters();
});
