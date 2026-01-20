import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setLanguage, getCurrentLanguage, translate, applyTranslations } from '../src/utils/i18n.js';

describe('translations', () => {
    beforeEach(() => {
        localStorage.clear();
        setLanguage('nl');
    });

    it('should set and get language', () => {
        setLanguage('en');
        expect(getCurrentLanguage()).toBe('en');
        expect(localStorage.getItem('fasleutel_lang')).toBe('en');
    });

    it('should translate keys correctly', () => {
        setLanguage('nl');
        expect(translate('choose_mode')).toBe('Kies een modus');
        
        setLanguage('en');
        expect(translate('choose_mode')).toBe('Choose a mode');
    });

    it('should handle replacements', () => {
        setLanguage('nl');
        const text = translate('note_count_incorrect', { name: 'do', count: 5 });
        expect(text).toContain('do');
        expect(text).toContain('5');
    });

    it('should fallback to key if translation missing', () => {
        expect(translate('non_existent_key')).toBe('non_existent_key');
    });

    it('should apply translations to DOM', () => {
        document.body.innerHTML = `
            <div data-i18n="choose_mode"></div>
            <button data-i18n-text="stop"><span></span><span></span></button>
        `;
        
        const mockUiView = { updateCurrentLanguageDisplay: vi.fn() };
        applyTranslations(mockUiView);
        
        expect(document.querySelector('[data-i18n]').textContent).toBe('Kies een modus');
        expect(mockUiView.updateCurrentLanguageDisplay).toHaveBeenCalledWith('nl');
    });
});
