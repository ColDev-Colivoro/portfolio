import { describe, expect, it } from 'vitest';
import {
  buildPortfolioContext,
  buildSystemInstruction,
  normalizeMessageInput,
  normalizeStructuredResponse,
} from '../chat.js';
import { projectsCatalog } from '../../../src/data/projectsData.js';

describe('chat function text normalization', () => {
  it('compacta entradas e historial a una sola línea', () => {
    expect(normalizeMessageInput('  Hola\r\n\t mundo   ')).toBe('Hola mundo');
  });

  it('conserva párrafos y listas, normaliza CRLF y limita líneas vacías redundantes', () => {
    const response = '  Inicio\r\n\r\n\r\n- Uno\r\n* Dos\r\n\r\n1. Primero\r\n2. Segundo  ';

    expect(normalizeStructuredResponse(response)).toBe(
      'Inicio\n\n- Uno\n* Dos\n\n1. Primero\n2. Segundo',
    );
  });

  it('preserva HTML y URLs peligrosas únicamente como texto inerte para que React los escape', () => {
    const untrusted = '<script>alert(1)</script>\n<img src=x onerror="alert(2)">\njavascript:alert(3)';

    expect(normalizeStructuredResponse(untrusted)).toBe(untrusted);
  });

  it('no recorta silenciosamente respuestas largas ni elimina su cierre', () => {
    const response = `Inicio\n\n${'detalle '.repeat(180)}\n\nCierre verificable.`;

    expect(response.length).toBeGreaterThan(900);
    expect(normalizeStructuredResponse(response)).toContain('Cierre verificable.');
  });
});

describe('chat portfolio context', () => {
  it('mantiene secciones esenciales y deriva los proyectos completos desde el catálogo canónico', () => {
    const context = buildPortfolioContext('es');

    expect(context).toContain('Perfil profesional');
    expect(context).toContain('Capacidades');
    expect(context).toContain('Proyectos');
    expect(context).toContain('Arquitectura del portfolio');
    expect(context).toContain('NutriscoConnect');
    expect(context).toContain('gestor operacional CRUD');
    expect(context).toContain('colaboradores responsables de registrar indicadores');
    expect(context).toMatch(/KPIs? contra metas/i);
    expect(context).toContain('reunión digitalizada de desempeño');
    expect(context).toContain('compromisos');
    expect(context).toContain('ColDevPOS');
    expect(context).toContain('Mar2Control');

    for (const project of projectsCatalog.filter(({ visible }) => visible)) {
      expect(context).toContain(project.title.es);
      expect(context).toContain(project.summary.es);
      expect(context).toContain(project.problem.es);
      expect(context).toContain(project.impact.es);
      expect(context).toContain(project.stack.join(', '));
    }
  });

  it('instruye respuestas claras, estructuradas y continuables sin recortar el contexto', () => {
    const instruction = buildSystemInstruction('es');

    expect(instruction).toContain('párrafos');
    expect(instruction).toContain('listas');
    expect(instruction).toMatch(/contin/i);
    expect(instruction).toContain(buildPortfolioContext('es'));
  });
});
