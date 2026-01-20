import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UIView } from '../src/ui/UIView.js';
import { translate } from '../src/utils/i18n.js';

describe('UIView', () => {
    let uiView;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="menu-screen">
                <button data-mode="practice" data-clef="g"></button>
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item" data-lang="en">EN</a>
                </div>
            </div>
            <div id="quiz-screen" class="hidden">
                <div id="score"></div>
                <div id="timer" class="hidden"></div>
                <div id="answer-buttons"></div>
                <button id="back-to-menu"></button>
            </div>
            <div id="report-screen" class="hidden">
                <div id="report-summary"></div>
                <ul id="problem-notes"></ul>
                <button id="restart-game"></button>
                <button id="report-to-menu"></button>
            </div>
            <button id="debug-report-button"></button>
            <div id="current-lang-display"></div>
        `;
        uiView = new UIView();
    });

    it('should show correct screens', () => {
        uiView.showScreen('quiz');
        expect(document.getElementById('quiz-screen').classList.contains('hidden')).toBe(false);
        expect(document.getElementById('menu-screen').classList.contains('hidden')).toBe(true);
    });

    it('should update score display for different modes', () => {
        uiView.updateScore(5, 10, 'practice');
        expect(document.getElementById('score').textContent).toContain('5/10');

        uiView.updateScore(8, 10, 'sprint');
        expect(document.getElementById('score').textContent).not.toContain('/10');
        expect(document.getElementById('score').textContent).toContain('8');
    });

    it('should update timer display', () => {
        uiView.updateTimer(30);
        expect(document.getElementById('timer').textContent).toContain('30');
        expect(document.getElementById('timer').classList.contains('hidden')).toBe(false);
    });

    it('should hide timer', () => {
        uiView.hideTimer();
        expect(document.getElementById('timer').classList.contains('hidden')).toBe(true);
    });

    it('should update current language display', () => {
        uiView.updateCurrentLanguageDisplay('fr');
        expect(document.getElementById('current-lang-display').textContent).toBe('FR');
    });

    it('should reset answer buttons', () => {
        uiView.resetAnswerButtons();
        const buttons = document.querySelectorAll('#answer-buttons button');
        buttons.forEach(btn => {
            expect(btn.classList.contains('is-success')).toBe(false);
            expect(btn.classList.contains('is-danger')).toBe(false);
        });
    });

    it('should set answer button states for correct answer', () => {
        uiView.setAnswerButtonsState(true, 'do', 'do');
        const doButton = document.querySelector('[data-note-name="do"]');
        expect(doButton.classList.contains('is-success')).toBe(true);
    });

    it('should set answer button states for incorrect answer', () => {
        uiView.setAnswerButtonsState(false, 're', 'do');
        const reButton = document.querySelector('[data-note-name="re"]');
        const doButton = document.querySelector('[data-note-name="do"]');
        expect(reButton.classList.contains('is-danger')).toBe(true);
        expect(doButton.classList.contains('is-success')).toBe(true);
    });

    it('should toggle answer buttons', () => {
        uiView.toggleAnswerButtons(true);
        document.querySelectorAll('#answer-buttons button').forEach(btn => {
            expect(btn.disabled).toBe(true);
        });
        uiView.toggleAnswerButtons(false);
        document.querySelectorAll('#answer-buttons button').forEach(btn => {
            expect(btn.disabled).toBe(false);
        });
    });

    it('should bind start game events', () => {
        const handler = vi.fn();
        uiView.bindStartGame(handler);
        document.querySelector('[data-mode="practice"]').click();
        expect(handler).toHaveBeenCalledWith('practice', 'g');
    });

    it('should bind answer clicks', () => {
        const handler = vi.fn();
        uiView.bindAnswer(handler);
        const button = document.querySelector('[data-note-name="do"]');
        button.click();
        expect(handler).toHaveBeenCalledWith('do');
    });

    it('should bind language switcher', () => {
        const handler = vi.fn();
        uiView.bindLanguageSwitcher(handler);
        document.querySelector('.dropdown-item').click();
        expect(handler).toHaveBeenCalledWith('en');
    });

    it('should bind keyboard answers', () => {
        const handler = vi.fn();
        uiView.bindKeyboardAnswers(handler);
        document.getElementById('quiz-screen').classList.remove('hidden');
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        expect(handler).toHaveBeenCalledWith('do');
    });

    it('should ignore keyboard if screen hidden or wrong key', () => {
        const handler = vi.fn();
        uiView.bindKeyboardAnswers(handler);
        
        // Hidden screen
        document.getElementById('quiz-screen').classList.add('hidden');
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
        expect(handler).not.toHaveBeenCalled();

        // Wrong key
        document.getElementById('quiz-screen').classList.remove('hidden');
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
        expect(handler).not.toHaveBeenCalled();
    });

    it('should bind other action buttons', () => {
        const handlers = {
            end: vi.fn(),
            restart: vi.fn(),
            reportMenu: vi.fn(),
            debug: vi.fn()
        };
        uiView.bindEndGame(handlers.end);
        uiView.bindRestartGame(handlers.restart);
        uiView.bindReportToMenu(handlers.reportMenu);
        uiView.bindDebugReport(handlers.debug);

        document.getElementById('back-to-menu').click();
        document.getElementById('restart-game').click();
        document.getElementById('report-to-menu').click();
        document.getElementById('debug-report-button').click();

        Object.values(handlers).forEach(h => expect(h).toHaveBeenCalled());
    });

    it('should show report with sorting', () => {
        const mockStaffView = {
            renderMini: vi.fn(),
            SVG_NAMESPACE: 'http://www.w3.org/2000/svg'
        };
        const incorrectAnswers = {
            'noteA': { note: { name: 'do', y: 3, clef: 'g' }, count: 2 },
            'noteB': { note: { name: 're', y: 2, clef: 'g' }, count: 5 }
        };

        uiView.showReport({
            score: 5,
            totalQuestions: 10,
            incorrectAnswers,
            staffView: mockStaffView
        });

        const listItems = document.querySelectorAll('.problem-note-item');
        expect(listItems.length).toBe(2);
        // noteB (re) has count 5, should be first
        expect(listItems[0].textContent).toContain('re');
        expect(listItems[0].textContent).toContain('5');
    });

    it('should show perfect score message', () => {
        uiView.showReport({
            score: 10,
            totalQuestions: 10,
            incorrectAnswers: {},
            staffView: {}
        });
        expect(document.getElementById('problem-notes').textContent).toContain(translate('perfect_score'));
    });
});