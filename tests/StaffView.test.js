import { describe, it, expect, beforeEach } from 'vitest';
import { StaffView } from '../src/ui/StaffView.js';

describe('StaffView', () => {
    let svgElement;
    let staffView;

    beforeEach(() => {
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        staffView = new StaffView(svgElement);
    });

    it('should initialize with correct viewBox', () => {
        expect(svgElement.getAttribute('viewBox')).toBe('0 0 400 200');
    });

    it('should render a note in the staff', () => {
        const note = { name: 'do', octave: 4, y: 3, clef: 'g' };
        staffView.render(note);
        
        // Should have 5 staff lines
        const lines = svgElement.querySelectorAll('line');
        expect(lines.length).toBeGreaterThanOrEqual(5);

        // Should have a clef (text element)
        const clef = svgElement.querySelector('text');
        expect(clef).not.toBeNull();
        expect(clef.textContent).toBe('𝄞');

        // Should have a note head (ellipse)
        const noteHead = svgElement.querySelector('ellipse');
        expect(noteHead).not.toBeNull();
    });

    it('should render ledger lines for high/low notes', () => {
        const lowNote = { name: 'fa', octave: 3, y: 5, clef: 'g' }; // Low note needs ledger lines
        staffView.render(lowNote);
        
        // lines = 5 (staff) + ledger lines
        const lines = svgElement.querySelectorAll('line');
        expect(lines.length).toBeGreaterThan(5);
    });

    it('should render mini version', () => {
        const miniSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const note = { name: 'do', octave: 4, y: 3, clef: 'g' };
        staffView.renderMini(note, miniSvg);
        
        expect(miniSvg.getAttribute('viewBox')).toBe('0 0 150 100');
        expect(miniSvg.querySelector('ellipse')).not.toBeNull();
    });

    it('should use correct clef character for F clef', () => {
        const note = { name: 'la', octave: 1, y: 5, clef: 'f' };
        staffView.render(note);
        const clef = svgElement.querySelector('text');
        expect(clef.textContent).toBe('𝄢');
    });

    it('should render ledger lines for very high notes', () => {
        const highNote = { name: 'la', octave: 5, y: -3, clef: 'g' };
        staffView.render(highNote);
        const lines = svgElement.querySelectorAll('line');
        expect(lines.length).toBeGreaterThan(5);
    });

    it('should have SVG_NAMESPACE getter', () => {
        expect(staffView.SVG_NAMESPACE).toBe('http://www.w3.org/2000/svg');
    });

    it('should handle mobile view for F clef positioning', () => {
        // Mock mobile width
        const originalWidth = window.innerWidth;
        window.innerWidth = 500;
        
        const note = { name: 'la', octave: 1, y: 5, clef: 'f' };
        staffView.render(note);
        
        const clef = svgElement.querySelector('text');
        expect(clef).not.toBeNull();
        
        // Restore
        window.innerWidth = originalWidth;
    });
});
