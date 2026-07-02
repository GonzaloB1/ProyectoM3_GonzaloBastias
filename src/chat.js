import { createMessage, buildMessageHtml } from './utils.js';
import { getCharacterById } from './characters.js';

let messages = [];
let currentCharacterId = 'homero';

function getCharacter() {
  return getCharacterById(currentCharacterId);
}

export function setCurrentCharacter(characterId) {
  currentCharacterId = characterId;
  messages = [createMessage('character', getCharacter().greeting)];
}

export function renderChatView() {
  if (messages.length === 0) {
    messages = [createMessage('character', getCharacter().greeting)];
  }

  return `
    <div class="chat-container">
      <header class="chat-header">
        <h1 class="character-name">${getCharacter().name}</h1>
      </header>

      <main class="chat-messages" id="chatMessages"></main>

      <div class="typing-indicator" id="typingIndicator" hidden>
        <span></span><span></span><span></span>
      </div>

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

async function fetchCharacterReply() {
  const response = await fetch('/api/functions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
      systemPrompt: getCharacter().systemPrompt,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al conectar con el personaje');
  }

  const data = await response.json();
  return data.reply;
}

export function initChatView() {
  const messagesContainer = document.getElementById('chatMessages');
  const typingIndicator = document.getElementById('typingIndicator');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('messageInput');

  function renderMessages() {
    messagesContainer.innerHTML = messages.map(buildMessageHtml).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    messages.push(createMessage('user', text));
    input.value = '';
    renderMessages();

    typingIndicator.hidden = false;
    input.disabled = true;

    try {
      const reply = await fetchCharacterReply();
      messages.push(createMessage('character', reply));
    } catch (error) {
      console.error(error);
      messages.push(createMessage('character', 'Ups, algo salió mal. Probá de nuevo en un momento.'));
    } finally {
      typingIndicator.hidden = true;
      input.disabled = false;
      renderMessages();
      input.focus();
    }
  });

  renderMessages();
}