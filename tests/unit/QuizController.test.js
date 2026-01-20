import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QuizController } from '../../src/core/QuizController.js';
import { NoteService } from '../../src/core/NoteService.js';
import { SoundService } from '../../src/utils/SoundService.js';

vi.mock('../../src/utils/SoundService.js', () => {
    return {
        SoundService: class {
            playCorrect = vi.fn();
            playIncorrect = vi.fn();
        }
    };
});

describe('QuizController', () => {
    let quizController;
    let mockNoteService;
    let mockStaffView;
    let mockUIView;

    beforeEach(() => {
        // Setup mocks
        mockNoteService = {
            getRandomNote: vi.fn().mockReturnValue({ name: 'do', octave: 4, y: 3, clef: 'g' })
        };
        mockStaffView = {
            render: vi.fn(),
            renderMini: vi.fn(),
            SVG_NAMESPACE: 'http://www.w3.org/2000/svg'
        };
        mockUIView = {
            bindStartGame: vi.fn(),
            bindEndGame: vi.fn(),
            bindRestartGame: vi.fn(),
            bindReportToMenu: vi.fn(),
            bindAnswer: vi.fn(),
            bindKeyboardAnswers: vi.fn(),
            bindDebugReport: vi.fn(),
            bindLanguageSwitcher: vi.fn(),
            showScreen: vi.fn(),
            updateScore: vi.fn(),
            updateTimer: vi.fn(),
            hideTimer: vi.fn(),
            showReport: vi.fn(),
            setAnswerButtonsState: vi.fn(),
            toggleAnswerButtons: vi.fn(),
            resetAnswerButtons: vi.fn(),
            updateCurrentLanguageDisplay: vi.fn(),
            updateStreak: vi.fn(),
            bindThemeToggle: vi.fn(),
            setTheme: vi.fn()
        };

        quizController = new QuizController(mockNoteService, mockStaffView, mockUIView);
    });

    it('should load saved theme on init', () => {
        localStorage.setItem('fasleutel_theme', 'dark');
        quizController.init();
        expect(mockUIView.setTheme).toHaveBeenCalledWith('dark');
    });

    it('should cycle through themes', () => {
        document.documentElement.setAttribute('data-theme', 'light');
        quizController.toggleTheme();
        expect(mockUIView.setTheme).toHaveBeenCalledWith('dark');
        
        document.documentElement.setAttribute('data-theme', 'dark');
        quizController.toggleTheme();
        expect(mockUIView.setTheme).toHaveBeenCalledWith('material');

        document.documentElement.setAttribute('data-theme', 'sepia');
        quizController.toggleTheme();
        expect(mockUIView.setTheme).toHaveBeenCalledWith('light');
    });

    it('should initialize correctly and bind events', () => {
        quizController.init();
        expect(mockUIView.bindStartGame).toHaveBeenCalled();
        expect(mockUIView.bindAnswer).toHaveBeenCalled();
        expect(mockUIView.bindKeyboardAnswers).toHaveBeenCalled();
    });

    it('should track and reset streaks', () => {
        quizController.startGame('practice', 'g');
        
        // Correct answer
        quizController.handleAnswer('do');
        expect(mockUIView.updateStreak).toHaveBeenCalledWith(1);

        // Incorrect answer
        quizController.handleAnswer('re');
        expect(mockUIView.updateStreak).toHaveBeenCalledWith(0);
    });

    it('should start game and show first note', () => {
        quizController.startGame('practice', 'g');
        expect(mockUIView.showScreen).toHaveBeenCalledWith('quiz');
        expect(mockNoteService.getRandomNote).toHaveBeenCalledWith('g');
        expect(mockStaffView.render).toHaveBeenCalled();
    });

    it('should handle correct answers', () => {
        quizController.startGame('practice', 'g');
        // The mock note is 'do'
        quizController.handleAnswer('do');
        
        // We can't directly check #score, but we can check if updateScore was called with 1
        expect(mockUIView.updateScore).toHaveBeenCalledWith(1, 1, 'practice');
    });

    it('should handle incorrect answers', () => {
        quizController.startGame('practice', 'g');
        quizController.handleAnswer('re'); // Wrong answer
        
        expect(mockUIView.updateScore).toHaveBeenCalledWith(0, 1, 'practice');
    });

    it('should end game correctly', () => {
        quizController.startGame('practice', 'g');
        quizController.endGame();
        expect(mockUIView.showReport).toHaveBeenCalled();
    });

    it('should handle sprint mode completion', () => {
        vi.useFakeTimers();
        quizController.startGame('sprint', 'g');
        
        // Answer 10 questions
        for(let i = 0; i < 10; i++) {
            quizController.handleAnswer('do');
            // Fast forward through the 1500ms transition for each answer except the last one
            if (i < 9) vi.advanceTimersByTime(1500);
        }

        // Final transition
        vi.advanceTimersByTime(1500);
        expect(mockUIView.showReport).toHaveBeenCalled();
        vi.useRealTimers();
    });

    it('should handle time-attack mode and timer', () => {
        vi.useFakeTimers();
        quizController.startGame('time-attack', 'g');
        
        expect(mockUIView.updateTimer).toHaveBeenCalled();
        
        // Advance time by 60 seconds
        vi.advanceTimersByTime(60000);
        
        expect(mockUIView.showReport).toHaveBeenCalled();
        vi.useRealTimers();
    });

    it('should show debug report', () => {
        quizController.showDebugReport();
        expect(mockUIView.showReport).toHaveBeenCalled();
    });

    it('should reset app', () => {
        quizController.resetApp();
        expect(mockUIView.showScreen).toHaveBeenCalledWith('menu');
    });

    it('should set language', () => {
        quizController.setLanguage('fr');
        expect(mockUIView.updateCurrentLanguageDisplay).toHaveBeenCalledWith('fr');
    });

    it('should call GoatCounter if available on game end', () => {
        window.goatcounter = { count: vi.fn() };
        quizController.startGame('practice', 'g');
        quizController.handleAnswer('do');
        quizController.endGame();
        expect(window.goatcounter.count).toHaveBeenCalled();
        delete window.goatcounter;
    });
});
