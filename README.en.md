# 🎶 Music Note Quiz: Learn the Treble and Bass Clefs

[Nederlandse Versie](README.md)

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/gjoris/fasleutel)

Welcome to the Music Note Quiz! This interactive web application is designed to help you learn and practice notes in the treble and bass clefs. Whether you're a beginner or want to refresh your knowledge, this quiz offers various modes to improve your skills.

The live version of this application is available as a GitHub Page: [https://gjoris.github.io/fasleutel/](https://gjoris.github.io/fasleutel/)

## ✨ Features

*   **Practice Mode:** Learn at your own pace without time pressure.
*   **Time Attack:** Test your speed and accuracy in 60 seconds.
*   **Sprint (10 Notes):** Answer 10 notes as quickly and accurately as possible.
*   **Keyboard Support:** Use keys `1` to `7` for fast responses.
*   **Smart Randomization:** No more immediate note repeats.
*   **Responsive Design:** Play on desktop, tablet, or mobile.

## 🚀 Technologies & Architecture

This application is built with a focus on code quality and maintainability:

*   **Vanilla JavaScript (ES Modules):** Organized in a modular folder structure.
*   **Encapsulation:** Uses `#privateFields` to protect internal state.
*   **SVG:** Dynamically drawn staff and notes.
*   **CSS Variables:** For consistent and easily adjustable design.
*   **Bulma CSS:** For a solid styling base.

### Folder Structure
```text
/src
├── core/       # Core logic (NoteService, QuizController)
├── ui/         # Presentation (StaffView, UIView)
├── data/       # Raw data (notes, translations)
├── utils/      # Helpers (i18n)
└── main.js     # Application entry point
```

## 🧪 Testing

The codebase is fully covered by an extensive test suite:

*   **Unit & Integration:** Running on Vitest (100% line coverage).
    *   Unit tests: `tests/unit/`
    *   Integration tests: `tests/integration/`
    ```bash
    npm test
    ```
*   **End-to-End (E2E):** Full browser tests with Playwright.
    *   E2E tests: `tests/e2e/`
    ```bash
    npm run test:e2e
    ```
*   **Coverage:** Generate a test coverage overview.
    ```bash
    npm run coverage
    ```

## 🛠️ Installation (for developers)

1.  Clone the repository: `git clone https://github.com/gjoris/fasleutel.git`
2.  Install dependencies: `npm install`
3.  Start a local server: `npx serve` (or open `index.html` directly)

## 🎮 How to Play

1.  **Choose a Mode:** Select a mode and your preferred clef.
2.  **Guess the Note:** Click the buttons or use your keyboard (`1-7`).
3.  **Feedback:** Get immediate results and learn from your mistakes in the final report.

## 📄 License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
