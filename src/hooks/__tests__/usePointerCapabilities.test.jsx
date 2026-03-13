import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePointerCapabilities } from '@/hooks/usePointerCapabilities';

const createMatchMedia = ({ fine = true, hover = true, reduced = false } = {}) =>
  vi.fn((query) => ({
    matches: query.includes('pointer: fine')
      ? fine
      : query.includes('hover: hover')
        ? hover
        : reduced,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

describe('usePointerCapabilities', () => {
  it('habilita follower solo con puntero fino, hover y sin reduced motion', () => {
    window.matchMedia = createMatchMedia({ fine: true, hover: true, reduced: false });
    const { result } = renderHook(() => usePointerCapabilities());

    expect(result.current.enableFollower).toBe(true);
  });

  it('deshabilita follower en contexto touch o reduced motion', () => {
    window.matchMedia = createMatchMedia({ fine: false, hover: false, reduced: true });
    const { result } = renderHook(() => usePointerCapabilities());

    expect(result.current.enableFollower).toBe(false);
    expect(result.current.reducedMotion).toBe(true);
  });
});
