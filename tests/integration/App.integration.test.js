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
                <button id="theme-toggle"></button>
                <span id="current-layout-display"></span>
                <div id="layout-selector-content"></div>
                <button id="start-practice" data-mode="practice" data-clef="g">Start</button>
                <div id="language-selector-content"></div>
            </div>
            <div id="quiz-screen" class="hidden">
                <div id="score"></div>
                <div id="timer" class="hidden"></div>
                <div id="streak-display" class="hidden"></div>
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
        
        const scoreBefore = document.getElementById('score').textContent;
        
        // Click the first button (it might be correct or incorrect)
        const buttons = document.querySelectorAll('#answer-buttons button');
        buttons[0].click();
        
        const scoreAfter = document.getElementById('score').textContent;
        // The score string should change (either to 1/1 or 0/1)
        expect(scoreAfter).not.toBe(scoreBefore);
        expect(scoreAfter).toMatch(/Score: (0|1)\/1/);
    });

    it('should switch layout and persist it', () => {
        // Mock a layout item in the DOM
        const layoutContent = document.getElementById('layout-selector-content');
        layoutContent.innerHTML = '<a href="#" class="dropdown-item" data-layout="sepia">Sepia</a>';
        
        // Re-bind because we changed the DOM items (direct listeners)
        quizController.init(); 

        const item = layoutContent.querySelector('[data-layout="sepia"]');
        item.click();

        expect(document.documentElement.getAttribute('data-layout')).toBe('sepia');
        expect(localStorage.getItem('fasleutel_layout')).toBe('sepia');
    });
});
