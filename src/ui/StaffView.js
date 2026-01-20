export class StaffView {
    #svg;
    #SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    #STAFF_LINE_GAP = 12;
    #STAFF_LINES = 5;
    #STAFF_BASE_Y = 100;

    constructor(svgElement) {
        this.#svg = svgElement;
        this.#svg.setAttribute('viewBox', '0 0 400 200');
    }

    get SVG_NAMESPACE() { return this.#SVG_NAMESPACE; }

    render(note) {
        this.#drawStaff(this.#svg, note, {
            width: 400,
            height: 200,
            lineGap: 12,
            baseY: 100,
            noteX: 200,
            clefX: 20,
            isMini: false
        });
    }

    renderMini(note, targetSvgElement) {
        this.#drawStaff(targetSvgElement, note, {
            width: 150,
            height: 100,
            lineGap: 9,
            baseY: (100 / 2) - (9 * 2),
            noteX: (150 / 2) + 15,
            clefX: (150 / 2) - 15,
            isMini: true
        });
    }

    #drawStaff(svg, note, config) {
        svg.innerHTML = '';
        svg.setAttribute('viewBox', `0 0 ${config.width} ${config.height}`);

        // Draw Lines
        for (let i = 0; i < this.#STAFF_LINES; i++) {
            const y = config.baseY + i * config.lineGap;
            const line = this.#createElementNS('line', {
                x1: config.isMini ? config.clefX - 10 : 10,
                y1: y,
                x2: config.isMini ? config.noteX + 10 : 390,
                y2: y,
                stroke: '#000000', 'stroke-width': '1'
            });
            svg.appendChild(line);
        }

        // Draw Clef
        const clefChar = note.clef === 'g' ? '𝄞' : '𝄢';
        const clefSize = note.clef === 'g' 
            ? config.lineGap * (config.isMini ? 4.5 : 5.8) 
            : config.lineGap * (config.isMini ? 3.5 : 4);
        
        const isMobile = window.innerWidth < 768;
        const clefY = note.clef === 'g'
            ? config.baseY + (config.isMini ? 3.8 : 4) * config.lineGap
            : config.baseY + (config.isMini ? 2.9 : (isMobile ? 3.5 : 2.5)) * config.lineGap;

        const clefText = this.#createElementNS('text', {
            x: config.clefX, y: clefY, fill: '#000000', 'font-size': clefSize
        });
        clefText.textContent = clefChar;
        svg.appendChild(clefText);

        // Draw Note
        const noteY = config.baseY + (config.lineGap * 2) + (note.y * config.lineGap);
        const noteHead = this.#createElementNS('ellipse', {
            cx: config.noteX, cy: noteY, rx: config.isMini ? 6 : 8, ry: config.isMini ? 4.5 : 6, fill: '#000000'
        });
        svg.appendChild(noteHead);

        // Draw Ledger Lines
        const drawLedgerLine = (y_pos) => {
            const ledgerLineY = config.baseY + (config.lineGap * 2) + (y_pos * config.lineGap);
            const ledgerLine = this.#createElementNS('line', {
                x1: config.noteX - (config.isMini ? 8 : 10),
                y1: ledgerLineY,
                x2: config.noteX + (config.isMini ? 8 : 10),
                y2: ledgerLineY,
                stroke: '#000000', 'stroke-width': config.isMini ? 1.0 : 1.5
            });
            svg.appendChild(ledgerLine);
        };

        if (note.y >= 3) {
            for (let y_pos = 3; y_pos <= note.y; y_pos += 1) drawLedgerLine(y_pos);
        } else if (note.y <= -3) {
            for (let y_pos = -3; y_pos >= note.y; y_pos -= 1) drawLedgerLine(y_pos);
        }
    }

    #createElementNS(type, attributes) {
        const el = document.createElementNS(this.#SVG_NAMESPACE, type);
        for (const key in attributes) el.setAttribute(key, attributes[key]);
        return el;
    }
}
