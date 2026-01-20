import { NOTES_DATA } from '../data/notes.js';

export class NoteService {
    #lastNoteId = null;

    getRandomNote(clef) {
        let clefForNote = clef;
        if (clef === 'both') {
            clefForNote = Math.random() < 0.5 ? 'g' : 'f';
        }

        const availableNotes = NOTES_DATA[clefForNote];
        let randomNote;
        let noteId;

        // Prevent immediate repeat
        do {
            randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
            noteId = `${randomNote.name}_${randomNote.octave}_${clefForNote}`;
        } while (noteId === this.#lastNoteId);

        this.#lastNoteId = noteId;
        return { ...randomNote, clef: clefForNote };
    }
}
