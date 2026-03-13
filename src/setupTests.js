import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion and other components
class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}

window.IntersectionObserver = IntersectionObserver;

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {};
}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: query.includes('pointer: fine') || query.includes('hover: hover') ? true : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
