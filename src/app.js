import { renderChatView, initChatView, setCurrentCharacter } from './chat.js';
import { characters } from './characters.js';

const appElement = document.getElementById('app');

function renderNav(activePath) {
  const links = [
    { path: '/home', label: 'Home' },
    { path: '/gallery', label: 'Personajes' },
    { path: '/chat', label: 'Chat' },
    { path: '/about', label: 'About' },
  ];

  const linksHtml = links
    .map(({ path, label }) => {
      const activeClass = path === activePath ? 'nav-link--active' : '';
      return `<a href="${path}" class="nav-link ${activeClass}" data-link>${label}</a>`;
    })
    .join('');

  return `
    <nav class="app-nav">
      ${linksHtml}
      <button id="themeToggle" class="theme-toggle" title="Cambiar tema">🌙</button>
    </nav>
  `;
}

function renderHomeView() {
  return `
    <section class="view view--home">
      <h1>Chateá con tu personaje favorito</h1>
      <p>Elegí entre 8 personajes distintos y empezá una conversación potenciada por inteligencia artificial.</p>
      <a href="/gallery" class="cta-button" data-link>Elegir personaje</a>
    </section>
  `;
}

function renderGalleryView() {
  const cardsHtml = Object.values(characters)
    .map(
      (character) => `
        <button class="character-card" data-character-id="${character.id}">
          <h3 class="character-card__name">${character.name}</h3>
        </button>
      `
    )
    .join('');

  return `
    <section class="view view--gallery">
      <h2>Elegí tu personaje</h2>
      <div class="character-grid">${cardsHtml}</div>
    </section>
  `;
}

function initGalleryView() {
  const cards = document.querySelectorAll('.character-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const characterId = card.getAttribute('data-character-id');
      setCurrentCharacter(characterId);
      navigateTo('/chat');
    });
  });
}

function renderAboutView() {
  return `
    <section class="view view--about">
      <h2>Sobre este proyecto</h2>
      <p>Proyecto Integrador 3 de Henry: una SPA que integra la API de Google Gemini para simular conversaciones con personajes ficticios.</p>
    </section>
  `;
}

function applyStoredTheme() {
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
}

function setupThemeToggle() {
  const button = document.getElementById('themeToggle');
  if (!button) return;

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  button.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  button.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    button.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

const routes = {
  '/home': { render: renderHomeView },
  '/gallery': { render: renderGalleryView, init: initGalleryView },
  '/chat': { render: renderChatView, init: initChatView },
  '/about': { render: renderAboutView },
};

function router() {
  const path = window.location.pathname === '/' ? '/home' : window.location.pathname;
  const route = routes[path] || routes['/home'];

  appElement.innerHTML = renderNav(path) + route.render();
 
  setupThemeToggle();
  if (route.init) route.init();
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  router();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link]');
  if (!link) return;

  event.preventDefault();
  navigateTo(link.getAttribute('href'));
});

window.addEventListener('popstate', router);

applyStoredTheme();
router();