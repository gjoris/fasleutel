import { describe, it, expect, beforeEach } from 'vitest';
import { NoteService } from '../src/core/NoteService.js';

describe('NoteService', () => {
    let noteService;

    beforeEach(() => {
        noteService = new NoteService();
    });

    it('should return a random note with correct structure', () => {
        const note = noteService.getRandomNote('g');
        expect(note).toHaveProperty('name');
        expect(note).toHaveProperty('octave');
        expect(note).toHaveProperty('y');
        expect(note).toHaveProperty('clef', 'g');
    });

    it('should not return the same note twice in a row', () => {
        const notes = [];
        for (let i = 0; i < 50; i++) {
            const note = noteService.getRandomNote('g');
            const noteId = `${note.name}_${note.octave}_${note.clef}`;
            if (notes.length > 0) {
                expect(noteId).not.toBe(notes[notes.length - 1]);
            }
            notes.push(noteId);
        }
    });

    it('should return notes from both clefs when requested', () => {
        const clefs = new Set();
        for (let i = 0; i < 100; i++) {
            const note = noteService.getRandomNote('both');
            clefs.add(note.clef);
        }
        expect(clefs.has('g')).toBe(true);
        expect(clefs.has('f')).toBe(true);
    });
});
