export function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function createMessage(role, content) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export function buildMessageHtml(message) {
  const roleClass = message.role === 'user' ? 'message--user' : 'message--character';
  return `<div class="message ${roleClass}">${escapeHtml(message.content)}</div>`;
}