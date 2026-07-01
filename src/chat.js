import { createMessage, buildMessageHtml } from './utils.js';

let messages = [createMessage('character', '¡Ay caramba! ¿Qué contás?')];

export function renderChatView() {
  return `
    <div class="chat-container">
      <header class="chat-header">
        <h1 class="character-name">Homero Simpson</h1>
      </header>

      <main class="chat-messages" id="chatMessages"></main>

      <form class="chat-input-form" id="chatForm">
        <input
          type="text"
          id="messageInput"
          class="chat-input"
          placeholder="Escribí tu mensaje..."
          autocomplete="off"
        />
        <button type="submit" class="send-button">Enviar</button>
      </form>
    </div>
  `;
}

export function initChatView() {
  const messagesContainer = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('messageInput');

  function renderMessages() {
    messagesContainer.innerHTML = messages.map(buildMessageHtml).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    messages.push(createMessage('user', text));
    input.value = '';
    renderMessages();

    // Respuesta simulada temporal: la Etapa 6 la reemplaza por Gemini real
    setTimeout(() => {
      messages.push(createMessage('character', 'Mmm... donas.'));
      renderMessages();
    }, 500);
  });

  renderMessages();
}