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