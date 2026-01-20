import { TRANSLATIONS_DATA } from '../data/translations.js';

let currentLanguage = localStorage.getItem('fasleutel_lang') || 'nl';

export function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('fasleutel_lang', lang);
}

export function getCurrentLanguage() {
    return currentLanguage;
}

export function translate(key, replacements = {}) {
    let text = TRANSLATIONS_DATA[currentLanguage][key] || key;
    for (const placeholder in replacements) {
        text = text.replace(`{{${placeholder}}}`, replacements[placeholder]);
    }
    return text;
}

export function applyTranslations(uiView) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translate(key);
    });
    document.querySelectorAll('button[data-i18n-text]').forEach(button => {
        const key = button.dataset.i18nText;
        const span = button.querySelector('span:last-child');
        if (span) span.textContent = translate(key);
    });
    if (uiView) {
        uiView.updateCurrentLanguageDisplay(currentLanguage);
    }
}
