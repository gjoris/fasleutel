/**
 * Beheert alle teken-operaties op de SVG notenbalk.
 */
export default class StaffView {
    constructor(svgElement) {
        this.svg = svgElement;
        this.SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        this.STAFF_LINE_GAP = 12;
        this.STAFF_LINES = 5;
        this.STAFF_BASE_Y = 100;
    }

    render(note) {
        this.svg.innerHTML = '';
        this._drawStaffLines();
        this._drawClef(note);
        this._drawNote(note);
        this._drawLedgerLines(note);
    }

    _drawStaffLines() {
        for (let i = 0; i < this.STAFF_LINES; i++) {
            const y = this.STAFF_BASE_Y + i * this.STAFF_LINE_GAP;
            const line = this._createElementNS('line', {
                x1: '10', y1: y, x2: '390', y2: y,
                stroke: 'black', 'stroke-width': '1'
            });
            this.svg.appendChild(line);
        }
    }

    _drawClef(note) {
        const clefChar = note.clef === 'g' ? '𝄞' : '𝄢';
        const clefY = note.clef === 'g'
            ? this.STAFF_BASE_Y + 3.8 * this.STAFF_LINE_GAP
            : this.STAFF_BASE_Y + 2.9 * this.STAFF_LINE_GAP;
        const clefSize = note.clef === 'g' ? '70px' : '48px';

        const clefText = this._createElementNS('text', {
            x: '20', y: clefY, fill: 'black', 'font-size': clefSize
        });
        clefText.textContent = clefChar;
        this.svg.appendChild(clefText);
    }

    _drawNote(note) {
        const noteY = this.STAFF_BASE_Y + (this.STAFF_LINE_GAP * 2) + (note.y * this.STAFF_LINE_GAP);
        const noteHead = this._createElementNS('ellipse', {
            cx: '200', cy: noteY, rx: '8', ry: '6', fill: 'black'
        });
        this.svg.appendChild(noteHead);
    }

    _drawLedgerLines(note) {
        const drawLine = (y_pos) => {
            const ledgerLineY = this.STAFF_BASE_Y + (this.STAFF_LINE_GAP * 2) + (y_pos * this.STAFF_LINE_GAP);
            const ledgerLine = this._createElementNS('line', {
                x1: '190', y1: ledgerLineY, x2: '210', y2: ledgerLineY,
                stroke: 'black', 'stroke-width': '1.5'
            });
            this.svg.appendChild(ledgerLine);
        };

        if (note.y >= 3) { // Noten onder de notenbalk
            for (let y_pos = 3; y_pos <= note.y; y_pos += 1) {
                drawLine(y_pos);
            }
        } else if (note.y <= -3) { // Noten boven de notenbalk
            for (let y_pos = -3; y_pos >= note.y; y_pos -= 1) {
                drawLine(y_pos);
            }
        }
    }

    _createElementNS(type, attributes) {
        const el = document.createElementNS(this.SVG_NAMESPACE, type);
        for (const key in attributes) {
            el.setAttribute(key, attributes[key]);
        }
        return el;
    }
}
