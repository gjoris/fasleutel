import NoteService from './NoteService.js';
import StaffView from './StaffView.js';
import UIView from './UIView.js';
import QuizController from './QuizController.js';

document.addEventListener('DOMContentLoaded', () => {
    //================================================================
    // App Initialization
    //================================================================

    const noteService = new NoteService();
    const staffView = new StaffView(document.getElementById('staff'));
    const uiView = new UIView();
    const app = new QuizController(noteService, staffView, uiView);

    app.init();
});
