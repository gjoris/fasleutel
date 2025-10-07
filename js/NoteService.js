/**
 * Beheert de definitie en het ophalen van noten.
 */
export default class NoteService {
    constructor() {
        this.notes = {
            g: [
                { name: 'Fa', octave: 3, y: 5 },
                { name: 'Sol', octave: 3, y: 4.5 },
                { name: 'La', octave: 3, y: 4 },
                { name: 'Si', octave: 3, y: 3.5 },
                { name: 'Do', octave: 4, y: 3 },
                { name: 'Re', octave: 4, y: 2.5 },
                { name: 'Mi', octave: 4, y: 2 },
                { name: 'Fa', octave: 4, y: 1.5 },
                { name: 'Sol', octave: 4, y: 1 },
                { name: 'La', octave: 4, y: 0.5 },
                { name: 'Si', octave: 4, y: 0 },
                { name: 'Do', octave: 5, y: -0.5 },
                { name: 'Re', octave: 5, y: -1 },
                { name: 'Mi', octave: 5, y: -1.5 },
                { name: 'Fa', octave: 5, y: -2 },
                { name: 'Sol', octave: 5, y: -2.5 },
                { name: 'La', octave: 5, y: -3 },
            ],
            f: [
                { name: 'La', octave: 1, y: 5 },
                { name: 'Si', octave: 1, y: 4.5 },
                { name: 'Do', octave: 2, y: 4 },
                { name: 'Re', octave: 2, y: 3.5 },
                { name: 'Mi', octave: 2, y: 3 },
                { name: 'Fa', octave: 2, y: 2.5 },
                { name: 'Sol', octave: 2, y: 2 },
                { name: 'La', octave: 2, y: 1.5 },
                { name: 'Si', octave: 2, y: 1 },
                { name: 'Do', octave: 3, y: 0.5 },
                { name: 'Re', octave: 3, y: 0 },
                { name: 'Mi', octave: 3, y: -0.5 },
                { name: 'Fa', octave: 3, y: -1 },
                { name: 'Sol', octave: 3, y: -1.5 },
                { name: 'La', octave: 3, y: -2 },
                { name: 'Si', octave: 3, y: -2.5 },
                { name: 'Do', octave: 4, y: -3 },
            ]
        };
    }

    getRandomNote(clef) {
        let clefForNote = clef;
        if (clef === 'both') {
            clefForNote = Math.random() < 0.5 ? 'g' : 'f';
        }
        const availableNotes = this.notes[clefForNote];
        const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
        return { ...randomNote, clef: clefForNote };
    }
}
