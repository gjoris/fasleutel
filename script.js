document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elementen ---
    const menuScreen = document.getElementById('menu-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const scoreDisplay = document.getElementById('score');
    const staffSvg = document.getElementById('staff');
    const answerButtonsContainer = document.getElementById('answer-buttons');

    const startGClefButton = document.getElementById('start-g-clef');
    const startFClefButton = document.getElementById('start-f-clef');
    const startBothClefsButton = document.getElementById('start-both-clefs');
    const backToMenuButton = document.getElementById('back-to-menu');

    // --- Constanten en State ---
    const NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const STAFF_LINE_GAP = 12;
    const STAFF_LINES = 5;
    const STAFF_BASE_Y = 100; // Y-positie van de bovenste lijn

    let currentClef = '';
    let currentNote = null;
    let score = 0;
    let totalQuestions = 0;

    // --- Noten Definities ---
    // Positie 'y' is relatief aan de middelste lijn van de notenbalk (0)
    // Positieve waarden gaan omlaag, negatieve waarden omhoog.
    const notes = {
        g: [
            { name: 'Fa', octave: 3, y: 5 },   // Onderste lijn
            { name: 'Sol', octave: 3, y: 4.5 },
            { name: 'La', octave: 3, y: 4 },
            { name: 'Si', octave: 3, y: 3.5 },
            { name: 'Do', octave: 4, y: 3 },    // Hulplijn
            { name: 'Re', octave: 4, y: 2.5 },
            { name: 'Mi', octave: 4, y: 2 },    // Eerste lijn
            { name: 'Fa', octave: 4, y: 1.5 },
            { name: 'Sol', octave: 4, y: 1 },    // Tweede lijn (G-sleutel lijn)
            { name: 'La', octave: 4, y: 0.5 },
            { name: 'Si', octave: 4, y: 0 },    // Middelste lijn
            { name: 'Do', octave: 5, y: -0.5 },
            { name: 'Re', octave: 5, y: -1 },
            { name: 'Mi', octave: 5, y: -1.5 },
            { name: 'Fa', octave: 5, y: -2 },   // Vijfde lijn
            { name: 'Sol', octave: 5, y: -2.5 },
            { name: 'La', octave: 5, y: -3 },   // Hulplijn
        ],
        f: [
            { name: 'La', octave: 1, y: 5 }, // Hulplijn
            { name: 'Si', octave: 1, y: 4.5 },
            { name: 'Do', octave: 2, y: 4 },
            { name: 'Re', octave: 2, y: 3.5 },
            { name: 'Mi', octave: 2, y: 3 },
            { name: 'Fa', octave: 2, y: 2.5 },
            { name: 'Sol', octave: 2, y: 2 },   // Eerste lijn
            { name: 'La', octave: 2, y: 1.5 },
            { name: 'Si', octave: 2, y: 1 },
            { name: 'Do', octave: 3, y: 0.5 },
            { name: 'Re', octave: 3, y: 0 },    // Middelste lijn
            { name: 'Mi', octave: 3, y: -0.5 },
            { name: 'Fa', octave: 3, y: -1 },   // Vierde lijn (F-sleutel lijn)
            { name: 'Sol', octave: 3, y: -1.5 },
            { name: 'La', octave: 3, y: -2 },   // Vijfde lijn
            { name: 'Si', octave: 3, y: -2.5 },
            { name: 'Do', octave: 4, y: -3 }, // Hulplijn
        ]
    };

    // --- Functies ---

    function init() {
        // Genereer de antwoordknoppen eenmalig
        answerButtonsContainer.innerHTML = '';
        NOTE_NAMES.forEach(name => {
            const button = document.createElement('button');
            button.textContent = name;
            button.dataset.noteName = name;
            answerButtonsContainer.appendChild(button);
        });

        // Event listeners
        startGClefButton.addEventListener('click', () => startGame('g'));
        startFClefButton.addEventListener('click', () => startGame('f'));
        startBothClefsButton.addEventListener('click', () => startGame('both'));
        backToMenuButton.addEventListener('click', resetApp);
        answerButtonsContainer.addEventListener('click', handleAnswerClick);
    }

    function startGame(clef) {
        currentClef = clef;
        score = 0;
        totalQuestions = 0;
        menuScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        showNextNote();
    }

    function resetApp() {
        quizScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
    }

    function showNextNote() {
        updateScore();
        resetAnswerButtons();

        // Kies een willekeurige noot
        let clefForNote = currentClef;
        if (currentClef === 'both') {
            clefForNote = Math.random() < 0.5 ? 'g' : 'f';
        }
        const availableNotes = notes[clefForNote];
        currentNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
        currentNote.clef = clefForNote;

        drawStaffAndNote(currentNote);
    }

    function drawStaffAndNote(note) {
        staffSvg.innerHTML = ''; // Maak SVG leeg

        // Teken 5 notenbalklijnen
        for (let i = 0; i < STAFF_LINES; i++) {
            const y = STAFF_BASE_Y + i * STAFF_LINE_GAP;
            const line = document.createElementNS(SVG_NAMESPACE, 'line');
            line.setAttribute('x1', '10');
            line.setAttribute('y1', y);
            line.setAttribute('x2', '390');
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'black');
            line.setAttribute('stroke-width', '1');
            staffSvg.appendChild(line);
        }

        // Teken de sleutel als tekst
        const clefChar = note.clef === 'g' ? '𝄞' : '𝄢';
        const clefText = document.createElementNS(SVG_NAMESPACE, 'text');
        clefText.setAttribute('x', '20');
        const clefY = note.clef === 'g' ? STAFF_BASE_Y + 3.8 * STAFF_LINE_GAP : STAFF_BASE_Y + 2.9 * STAFF_LINE_GAP;
        clefText.setAttribute('y', clefY);
        const clefSize = note.clef === 'g' ? '70px' : '48px';
        clefText.setAttribute('font-size', clefSize);
        clefText.setAttribute('fill', 'black');
        clefText.textContent = clefChar;
        staffSvg.appendChild(clefText);


        // Teken de noot
        const noteY = STAFF_BASE_Y + (STAFF_LINE_GAP * 2) + (note.y * STAFF_LINE_GAP);
        const noteHead = document.createElementNS(SVG_NAMESPACE, 'ellipse');
        noteHead.setAttribute('cx', '200');
        noteHead.setAttribute('cy', noteY);
        noteHead.setAttribute('rx', '8');
        noteHead.setAttribute('ry', '6');
        noteHead.setAttribute('fill', 'black');
        staffSvg.appendChild(noteHead);

        // Teken hulplijnen (ledger lines) indien nodig
        if (note.y >= 3) { // Noten onder de notenbalk
            for (let y_pos = 3; y_pos <= note.y; y_pos += 1) {
                const ledgerLineY = STAFF_BASE_Y + (STAFF_LINE_GAP * 2) + (y_pos * STAFF_LINE_GAP);
                const ledgerLine = document.createElementNS(SVG_NAMESPACE, 'line');
                ledgerLine.setAttribute('x1', '190');
                ledgerLine.setAttribute('y1', ledgerLineY);
                ledgerLine.setAttribute('x2', '210');
                ledgerLine.setAttribute('y2', ledgerLineY);
                ledgerLine.setAttribute('stroke', 'black');
                ledgerLine.setAttribute('stroke-width', '1.5');
                staffSvg.appendChild(ledgerLine);
            }
        } else if (note.y <= -3) { // Noten boven de notenbalk
            for (let y_pos = -3; y_pos >= note.y; y_pos -= 1) {
                const ledgerLineY = STAFF_BASE_Y + (STAFF_LINE_GAP * 2) + (y_pos * STAFF_LINE_GAP);
                const ledgerLine = document.createElementNS(SVG_NAMESPACE, 'line');
                ledgerLine.setAttribute('x1', '190');
                ledgerLine.setAttribute('y1', ledgerLineY);
                ledgerLine.setAttribute('x2', '210');
                ledgerLine.setAttribute('y2', ledgerLineY);
                ledgerLine.setAttribute('stroke', 'black');
                ledgerLine.setAttribute('stroke-width', '1.5');
                staffSvg.appendChild(ledgerLine);
            }
        }
    }

    function handleAnswerClick(event) {
        if (event.target.tagName !== 'BUTTON') return;

        const selectedName = event.target.dataset.noteName;
        const correctName = currentNote.name;
        totalQuestions++;

        // Disable alle knoppen
        disableAnswerButtons(true);

        if (selectedName === correctName) {
            score++;
            event.target.classList.add('correct');
        } else {
            event.target.classList.add('incorrect');
            // Markeer de juiste knop
            const correctButton = answerButtonsContainer.querySelector(`[data-note-name="${correctName}"]`);
            correctButton.classList.add('correct');
        }

        updateScore();

        // Wacht even en toon dan de volgende noot
        setTimeout(showNextNote, 1500);
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}/${totalQuestions}`;
    }

    function resetAnswerButtons() {
        disableAnswerButtons(false);
        answerButtonsContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
        });
    }

    function disableAnswerButtons(disabled) {
        answerButtonsContainer.querySelectorAll('button').forEach(btn => {
            if(disabled) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        });
    }

    // --- Start de applicatie ---
    init();
});
