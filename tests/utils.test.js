import { describe, it, expect } from 'vitest';
import { escapeHtml, createMessage, formatTimestamp, buildMessageHtml } from '../src/utils.js';

describe('escapeHtml', () => {
  it('escapa las etiquetas HTML para prevenir XSS', () => {
    const input = '<script>alert("hola")</script>';
    const result = escapeHtml(input);
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('deja intacto el texto sin caracteres especiales', () => {
    expect(escapeHtml('hola como estas')).toBe('hola como estas');
  });

  it('escapa comillas simples y dobles', () => {
    expect(escapeHtml(`"hola" 'chau'`)).toBe('&quot;hola&quot; &#39;chau&#39;');
  });
});

describe('createMessage', () => {
  it('crea un mensaje con el role y content correctos', () => {
    const message = createMessage('user', 'hola homero');
    expect(message.role).toBe('user');
    expect(message.content).toBe('hola homero');
  });

  it('genera un id distinto en cada llamada', () => {
    const message1 = createMessage('user', 'hola');
    const message2 = createMessage('user', 'hola');
    expect(message1.id).not.toBe(message2.id);
  });

  it('incluye un timestamp numérico', () => {
    const message = createMessage('character', 'ay caramba');
    expect(typeof message.timestamp).toBe('number');
  });
});

describe('formatTimestamp', () => {
  it('formatea la hora en formato HH:MM', () => {
    const date = new Date('2026-07-06T09:05:00');
    const result = formatTimestamp(date.getTime());
    expect(result).toBe('09:05');
  });

  it('agrega cero a la izquierda cuando la hora o minuto son de un solo dígito', () => {
    const date = new Date('2026-07-06T03:07:00');
    const result = formatTimestamp(date.getTime());
    expect(result).toBe('03:07');
  });
});

describe('buildMessageHtml', () => {
  it('usa la clase message--user para mensajes del usuario', () => {
    const message = createMessage('user', 'hola');
    const html = buildMessageHtml(message);
    expect(html).toContain('message--user');
  });

  it('usa la clase message--character para mensajes del personaje', () => {
    const message = createMessage('character', 'ay caramba');
    const html = buildMessageHtml(message);
    expect(html).toContain('message--character');
  });

  it('escapa el contenido del mensaje dentro del HTML generado', () => {
    const message = createMessage('user', '<b>hola</b>');
    const html = buildMessageHtml(message);
    expect(html).not.toContain('<b>hola</b>');
    expect(html).toContain('&lt;b&gt;');
  });
});