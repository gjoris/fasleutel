import { describe, it, expect, beforeEach } from 'vitest';
import { QuizController } from '../../src/core/QuizController.js';
import { NoteService } from '../../src/core/NoteService.js';
import { StaffView } from '../../src/ui/StaffView.js';
import { UIView } from '../../src/ui/UIView.js';

describe('App Integration', () => {
    let noteService;
    let staffView;
    let uiView;
    let quizController;

    beforeEach(() => {
        // Setup a real DOM environment
        document.body.innerHTML = `
            <div id="menu-screen">
                <button id="start-practice" data-mode="practice" data-clef="g">Start</button>
                <div class="dropdown-content"></div>
            </div>
            <div id="quiz-screen" class="hidden">
                <div id="score"></div>
                <div id="timer" class="hidden"></div>
                <div id="staff-container"><svg id="staff"></svg></div>
                <div id="answer-buttons"></div>
                <button id="back-to-menu">Stop</button>
            </div>
            <div id="report-screen" class="hidden">
                <div id="report-summary"></div>
                <ul id="problem-notes"></ul>
                <button id="restart-game">Restart</button>
                <button id="report-to-menu">Menu</button>
            </div>
            <button id="debug-report-button"></button>
            <div id="current-lang-display"></div>
        `;

        noteService = new NoteService();
        staffView = new StaffView(document.getElementById('staff'));
        uiView = new UIView();
        quizController = new QuizController(noteService, staffView, uiView);
        
        quizController.init();
    });

    it('should flow from menu to quiz and update DOM with a real note', () => {
        // 1. Start game via UI
        document.getElementById('start-practice').click();
        
        // 2. Verify screen changed
        expect(document.getElementById('quiz-screen').classList.contains('hidden')).toBe(false);
        
        // 3. Verify a real note was rendered (check if SVG has elements)
        const svg = document.getElementById('staff');
        expect(svg.querySelector('ellipse')).not.toBeNull();
        expect(svg.querySelector('text')).not.toBeNull(); // The clef
    });

    it('should track score correctly through real components', () => {
        quizController.startGame('practice', 'g');
        
        // Get the current note name (it's random, so we inspect the state via a trick or check buttons)
        // Since we can't easily see private #currentNote, we'll use the fact that buttons are generated.
        
        // Let's simulate clicking all buttons until we hit the right one
        // or just check if score updates on ANY click.
        const scoreBefore = document.getElementById('score').textContent;
        
        const buttons = document.querySelectorAll('#answer-buttons button');
        buttons[0].click(); // Click 'do'
        
        const scoreAfter = document.getElementById('score').textContent;
        expect(scoreAfter).not.toBe(scoreBefore);
    });
});
