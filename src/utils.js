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
    timestamp: Date.now(),
  };
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function buildMessageHtml(message) {
  const roleClass = message.role === 'user' ? 'message--user' : 'message--character';
  return `
    <div class="message ${roleClass}">
      <p class="message__text">${escapeHtml(message.content)}</p>
      <span class="message__timestamp">${formatTimestamp(message.timestamp)}</span>
    </div>
  `;
}