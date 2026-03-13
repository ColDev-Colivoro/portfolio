import { describe, expect, it } from 'vitest';
import { mapLocalized, resolveCopy } from '@/lib/i18n';

describe('i18n helpers', () => {
  it('resuelve copy localizado con fallback a español', () => {
    expect(resolveCopy({ es: 'Hola', en: 'Hello' }, 'en')).toBe('Hello');
    expect(resolveCopy({ es: 'Hola' }, 'fr')).toBe('Hola');
  });

  it('mapea colecciones localizadas sin perder campos escalares', () => {
    const result = mapLocalized([{ title: { es: 'Uno', en: 'One' }, id: '1' }], 'en');
    expect(result).toEqual([{ title: 'One', id: '1' }]);
  });
});
