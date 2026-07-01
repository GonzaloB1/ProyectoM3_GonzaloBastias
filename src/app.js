import { renderChatView, initChatView } from './chat.js';

const appElement = document.getElementById('app');

function renderNav(activePath) {
  const links = [
    { path: '/home', label: 'Home' },
    { path: '/chat', label: 'Chat' },
    { path: '/about', label: 'About' },
  ];

  const linksHtml = links
    .map(({ path, label }) => {
      const activeClass = path === activePath ? 'nav-link--active' : '';
      return `<a href="${path}" class="nav-link ${activeClass}" data-link>${label}</a>`;
    })
    .join('');

  return `<nav class="app-nav">${linksHtml}</nav>`;
}

function renderHomeView() {
  return `
    <section class="view view--home">
      <h1>Chateá con Homero Simpson</h1>
      <p>Charlá con tu personaje favorito de Los Simpson, potenciado por inteligencia artificial.</p>
      <a href="/chat" class="cta-button" data-link>Empezar a chatear</a>
    </section>
  `;
}

function renderAboutView() {
  return `
    <section class="view view--about">
      <h2>Sobre este proyecto</h2>
      <p>Proyecto Integrador 3 de Henry: una SPA que integra la API de Google Gemini para simular conversaciones con personajes ficticios.</p>
    </section>
  `;
}

const routes = {
  '/home': { render: renderHomeView },
  '/chat': { render: renderChatView, init: initChatView },
  '/about': { render: renderAboutView },
};

function router() {
  const path = window.location.pathname === '/' ? '/home' : window.location.pathname;
  const route = routes[path] || routes['/home'];

  appElement.innerHTML = renderNav(path) + route.render();

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

router();