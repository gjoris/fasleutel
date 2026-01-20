export class SoundService {
    #audioCtx;
    #enabled = true;

    constructor() {
        // AudioContext is lazy-loaded to comply with browser autoplay policies
    }

    #initAudio() {
        if (!this.#audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            this.#audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playCorrect() {
        this.#playTone(440, 'triangle', 0.1, 0.2); // A4
        setTimeout(() => this.#playTone(880, 'triangle', 0.1, 0.2), 100); // A5
    }

    playIncorrect() {
        this.#playTone(150, 'sawtooth', 0.2, 0.3);
    }

    #playTone(freq, type, volume, duration) {
        if (!this.#enabled) return;
        this.#initAudio();
        if (!this.#audioCtx) return;

        const oscillator = this.#audioCtx.createOscillator();
        const gainNode = this.#audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, this.#audioCtx.currentTime);

        gainNode.gain.setValueAtTime(volume, this.#audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.#audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.#audioCtx.destination);

        oscillator.start();
        oscillator.stop(this.#audioCtx.currentTime + duration);
    }
}
