// Node 26 ships an experimental global `localStorage` that returns undefined
// without --localstorage-file, shadowing the one jsdom provides. Force jsdom's
// Storage onto globalThis so tests relying on localStorage behave like a browser.
import { beforeEach } from 'vitest';

function createStorage() {
  let store = new Map();
  return {
    getItem: (k) => (store.has(String(k)) ? store.get(String(k)) : null),
    setItem: (k, v) => store.set(String(k), String(v)),
    removeItem: (k) => store.delete(String(k)),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
}

const storage = createStorage();

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: storage,
});
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: storage,
  });
}

beforeEach(() => {
  storage.clear();
});
