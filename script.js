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

    // --- SVG Paden voor Sleutels ---
    const clefPaths = {
        g: 'M11.7-26.9c-0.9-2.5-2.2-4.8-3.8-6.9c-2.3-2.9-5.1-5.2-8.2-6.7c-5-2.5-10.9-2.7-16.3-0.4c-5.4,2.3-9.5,7-11.4,12.6c-1.2,3.4-1.5,7-1,10.5c0.5,3.5,1.8,6.9,3.8,9.9c1.3,2,2.9,3.8,4.7,5.4c3.6,3,7.9,5,12.5,5.5c5.1,0.5,10.1-0.5,14.7-3c2.3-1.2,4.4-2.9,6.2-4.9c2.4-2.7,4-6,4.8-9.5c0.8-3.5,0.7-7.1-0.1-10.6c-1-4.2-3-8-5.8-11.3c-0.2-0.2-0.4-0.4-0.6-0.6c-0.7-0.7-1.5-0.8-2.2-0.1c-0.7,0.7-0.8,1.5-0.1,2.2c0.1,0.1,0.2,0.2,0.3,0.3c2.4,2.9,4.2,6.2,5,9.8c0.7,3,0.8,6.1,0.1,9.1c-0.7,2.9-2.1,5.6-4.1,7.8c-1.6,1.8-3.5,3.2-5.6,4.3c-4,2.1-8.5,3-12.9,2.5c-4-0.4-7.8-2.2-10.9-4.7c-1.6-1.3-3-2.9-4.1-4.6c-1.8-2.7-2.9-5.7-3.4-8.8c-0.5-3.1-0.2-6.2,0.8-9.2c1.7-5,5.3-9,9.9-11c4.8-2.1,10-1.9,14.4,0.3c2.8,1.4,5.2,3.4,7.2,5.9c1.5,1.9,2.7,4,3.5,6.2c0.5,1.5,0.9,3,1.2,4.5c0.1,0.8,0.9,1.3,1.7,1.2c0.8-0.1,1.3-0.9,1.2-1.7C12.6-24.1,12.2-25.5,11.7-26.9z M-11.9,22.4c-2.6,0-5.2-0.8-7.4-2.3c-2.3-1.5-4-3.6-5-6.1c-1-2.5-1.3-5.2-0.8-7.8c0.4-2.6,1.6-5,3.4-7.1c0.6-0.7,1.5-0.8,2.2-0.2c0.7,0.6,0.8,1.5,0.2,2.2c-1.5,1.8-2.5,3.8-2.9,6c-0.4,2.2-0.1,4.5,0.7,6.6c0.8,2.1,2.2,3.9,4.1,5.1c1.9,1.2,4.1,1.8,6.4,1.8c0.8,0,1.5,0.7,1.5,1.5C-10.4,21.7-11.1,22.4-11.9,22.4z',
        f: 'M-28.8-6.3c-2.9-1.2-5.3-3.2-6.9-5.8c-1.6-2.6-2.4-5.6-2.2-8.6c0.2-3,1.3-5.9,3.2-8.3c1.9-2.4,4.6-4.2,7.6-5.1c3-1,6.2-1,9.2,0.1c0.8,0.3,1.2,1.2,0.9,2c-0.3,0.8-1.2,1.2-2,0.9c-2.5-0.9-5.1-0.9-7.6-0.1c-2.5,0.8-4.7,2.3-6.3,4.3c-1.6,2-2.5,4.4-2.7,7c-0.2,2.6,0.5,5.2,1.9,7.4c1.4,2.2,3.5,3.9,6,4.9c0.8,0.3,1.2,1.2,0.9,2C-28, -6, -28.4, -6.2, -28.8, -6.3z M-23.2,1.2c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S-22.1,1.2-23.2,1.2z M-23.2-15.8c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S-22.1-15.8-23.2-15.8z'
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

        // Teken de sleutel
        const clef = document.createElementNS(SVG_NAMESPACE, 'path');
        clef.setAttribute('d', clefPaths[note.clef]);
        const clefTransform = note.clef === 'g' 
            ? 'translate(40, 135) scale(1.8)' 
            : 'translate(40, 112) scale(1.8)';
        clef.setAttribute('transform', clefTransform);
        staffSvg.appendChild(clef);

        // Teken de noot
        const noteY = STAFF_BASE_Y + (STAFF_LINE_GAP * 2) + (note.y * STAFF_LINE_GAP / 2);
        const noteHead = document.createElementNS(SVG_NAMESPACE, 'ellipse');
        noteHead.setAttribute('cx', '200');
        noteHead.setAttribute('cy', noteY);
        noteHead.setAttribute('rx', '8');
        noteHead.setAttribute('ry', '6');
        noteHead.setAttribute('fill', 'black');
        staffSvg.appendChild(noteHead);

        // Teken hulplijnen indien nodig
        if (note.y <= -3 || note.y >= 3) {
            const ledgerY = Math.round(note.y) % 2 === 0 ? noteY : noteY + STAFF_LINE_GAP/2;
             if (note.y === 3 || note.y === -3) { // C noten
                const ledgerLine = document.createElementNS(SVG_NAMESPACE, 'line');
                ledgerLine.setAttribute('x1', '190');
                ledgerLine.setAttribute('y1', noteY);
                ledgerLine.setAttribute('x2', '210');
                ledgerLine.setAttribute('y2', noteY);
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
