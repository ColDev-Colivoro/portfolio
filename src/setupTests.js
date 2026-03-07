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
