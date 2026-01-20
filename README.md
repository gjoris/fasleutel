# 🎶 Muzieknoten Quiz: Leer de Sol- en Fa-sleutel

[English Version](README.en.md)

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/gjoris/fasleutel)

Welkom bij de Muzieknoten Quiz! Deze interactieve webapplicatie is ontworpen om je te helpen de noten in de sol- en fa-sleutel te leren en te oefenen. Of je nu een beginner bent of je kennis wilt opfrissen, deze quiz biedt verschillende modi om je vaardigheden te verbeteren.

De live versie van deze applicatie is beschikbaar als GitHub Page: [https://gjoris.github.io/fasleutel/](https://gjoris.github.io/fasleutel/)

## ✨ Kenmerken

*   **Oefenmodus:** Leer in je eigen tempo zonder tijdsdruk.
*   **Tijdrace:** Test je snelheid en nauwkeurigheid in 60 seconden.
*   **Sprint (10 Noten):** Beantwoord 10 noten zo snel en accuraat mogelijk.
*   **Toetsenbordondersteuning:** Gebruik de toetsen `1` t/m `7` voor snelle antwoorden.
*   **Slimme Randomisatie:** Nooit meer twee keer dezelfde noot achter elkaar.
*   **Responsief Ontwerp:** Speel op desktop, tablet of mobiel.

## 🚀 Technologieën & Architectuur

Deze applicatie is modern opgezet met een focus op codekwaliteit en onderhoudbaarheid:

*   **Vanilla JavaScript (ES Modules):** Georganiseerd in een modulaire mappenstructuur.
*   **Encapsulation:** Gebruik van `#privateFields` om interne staat te beschermen.
*   **SVG:** Dynamisch getekende notenbalken en noten.
*   **CSS Variabelen:** Voor consistent en makkelijk aanpasbaar ontwerp.
*   **Bulma CSS:** Voor een solide basis in styling.

### Mappenstructuur
```text
/src
├── core/       # Kernlogica (NoteService, QuizController)
├── ui/         # Weergave (StaffView, UIView)
├── data/       # Ruwe data (noten, vertalingen)
├── utils/      # Helpers (i18n)
└── main.js     # Applicatie toegangspunt
```

## 🧪 Testen

De codebase is volledig gedekt door een uitgebreide test-suite:

*   **Unit & Integratie:** Draaien op Vitest (100% line coverage).
    *   Unit tests: `tests/unit/`
    *   Integratie tests: `tests/integration/`
    ```bash
    npm test
    ```
*   **End-to-End (E2E):** Volledige browser-tests met Playwright.
    *   E2E tests: `tests/e2e/`
    ```bash
    npm run test:e2e
    ```
*   **Coverage:** Genereer een overzicht van de testdekking.
    ```bash
    npm run coverage
    ```

## 🛠️ Installatie (voor ontwikkelaars)

1.  Clone de repository: `git clone https://github.com/gjoris/fasleutel.git`
2.  Installeer dependencies: `npm install`
3.  Start een lokale server: `npx serve` (of open `index.html` direct)

## 🎮 Hoe te Spelen

1.  **Kies een Modus:** Selecteer een van de modi en de gewenste sleutel.
2.  **Raad de Noot:** Klik op de knoppen of gebruik je toetsenbord (`1-7`).
3.  **Feedback:** Zie direct of je goed zit en leer van je fouten in het eindrapport.

## 📄 Licentie

Gelicentieerd onder de MIT-licentie. Zie het [LICENSE](LICENSE) bestand.