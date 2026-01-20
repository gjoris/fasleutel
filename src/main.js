import { NoteService } from './core/NoteService.js';
import { StaffView } from './ui/StaffView.js';
import { UIView } from './ui/UIView.js';
import { QuizController } from './core/QuizController.js';

document.addEventListener('DOMContentLoaded', () => {
    const noteService = new NoteService();
    const staffView = new StaffView(document.getElementById('staff'));
    const uiView = new UIView();
    const app = new QuizController(noteService, staffView, uiView);

    window.app = app;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug') && urlParams.get('debug') === 'true') {
        document.getElementById('debug-section').classList.remove('hidden');
    }

    app.init();

    // Stats fetching (GoatCounter)
    function updateCounters() {
        const fetchCount = (url, elementId) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const el = document.getElementById(elementId);
                    if (el) el.textContent = data.count || '0';
                })
                .catch(err => {
                    console.error(`Error fetching ${elementId}:`, err);
                    const el = document.getElementById(elementId);
                    if (el) el.textContent = '-';
                });
        };

        fetchCount('https://gjoris.goatcounter.com/counter/' + encodeURIComponent('/fasleutel') + '.json', 'visitor-count');
        fetchCount('https://gjoris.goatcounter.com/counter/quiz-completed.json', 'quiz-count');
    }
    
    updateCounters();
});
