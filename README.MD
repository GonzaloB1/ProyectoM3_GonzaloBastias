# Chateá con tu Personaje Favorito 🎭

Proyecto 3. Single Page Application que permite chatear con 8 personajes ficticios distintos, potenciados por la API de Google Gemini.

## 🌐 Demo en vivo

> **https://proyecto-m3-gonzalo-bastias.vercel.app**

## 🎬 Personajes disponibles

| Personaje | Franquicia | Personalidad |
|---|---|---|
| Homero Simpson | Los Simpson | Torpe, glotón, obsesionado con donas y cerveza |
| Spiderman | Marvel | Sarcástico, bromista, con fuerte sentido de responsabilidad |
| Gojo Satoru | Jujutsu Kaisen | Arrogante, juguetón, carismático |
| Monkey D. Luffy | One Piece | Simple, optimista, obsesionado con la carne |
| Roronoa Zoro | One Piece | Serio, disciplinado, pésimo sentido de orientación |
| Tanjiro Kamado | Kimetsu no Yaiba | Amable, empático, protector |
| Inosuke Hashibira | Kimetsu no Yaiba | Salvaje, competitivo, criado por jabalíes |
| Zenitsu Agatsuma | Kimetsu no Yaiba | Miedoso, dramático, sorprendentemente valiente bajo presión |

## ✨ Funcionalidades

- Routing SPA con History API (`/home`, `/gallery`, `/chat`, `/about`) con soporte completo de back/forward del navegador
- Diseño responsive mobile-first (mobile / tablet / desktop)
- Integración segura con Gemini AI vía Vercel Serverless Function (la API key nunca se expone en el cliente)
- Historial de conversación persistente por personaje (localStorage)
- Botón para borrar historial de la conversación activa
- Timestamps en cada mensaje
- Indicador animado de "escribiendo..."
- Envío de mensajes con Enter o con el botón
- Modo oscuro/claro con preferencia persistente
- Imágenes ilustrativas para cada personaje en la galería
- Selector rápido de personajes dentro del chat (sin volver a la galería)
- Panel de información del personaje (franquicia y rasgos de personalidad)
- Color de acento distinto por personaje (burbujas, botones, anillos del carrusel)
- Home con hero animado y carrusel de personajes ("Portal de Personajes")



## 🛠️ Stack técnico

- JavaScript vanilla (ES Modules)
- History API para routing
- Vercel Serverless Functions
- Google Gemini API (`gemini-3.1-flash-lite`)
- Vitest para testing
- localStorage para persistencia

## 🚀 Cómo correr el proyecto en local

### Requisitos previos

- Node.js instalado
- Una API key de Gemini (gratuita en [Google AI Studio](https://aistudio.google.com))
- Vercel CLI: `npm install -g vercel`

### Pasos

1. Cloná el repositorio:
```bash
   git clone https://github.com/GonzaloB1/ProyectoM3_GonzaloBastias.git
   cd ProyectoM3_GonzaloBastias
```

2. Instalá las dependencias:
```bash
   npm install
```

3. Creá un archivo `.env` en la raíz del proyecto (basándote en `.env.example`) y agregá tu API key:
 
 4. Corré el proyecto en modo desarrollo:
```bash
   vercel dev
```

5. Abrí `http://localhost:3000` en el navegador.

## 🧪 Cómo correr los tests

```bash
npm test
```

Esto ejecuta 11 tests unitarios con Vitest sobre las funciones utilitarias (`src/utils.js`): escapado de HTML (prevención de XSS), creación de mensajes, formateo de timestamps, y generación de HTML de mensajes.

## 📦 Cómo desplegar a Vercel

1. Conectá el repositorio de GitHub a Vercel desde [vercel.com](https://vercel.com) (New Project → Import Git Repository).
2. En la configuración del proyecto, agregá la variable de entorno `GEMINI_API_KEY` con tu key real.
3. Desplegá — Vercel detecta automáticamente las Serverless Functions en `/api`.

## 📸 Capturas de pantalla

### Home
![Home](screenshots/home.png)

### Galería de personajes - Modo claro
![Galería modo claro](screenshots/galeria-claro.png)

### Galería de personajes - Modo oscuro
![Galería modo oscuro](screenshots/galeria-oscuro.png)

### Chat - Modo claro
![Chat modo claro](screenshots/chat-claro.png)

### Chat - Modo oscuro
![Chat modo oscuro](screenshots/chat-oscuro.png)

### Vista mobile
![Vista mobile](screenshots/celular.jpg)

## 🤖 Registro de uso de IA

Durante el desarrollo de este proyecto usé Claude (Anthropic) como asistente de aprendizaje guiado, etapa por etapa. Un resumen de cómo se usó:

- **Planificación**: definí junto con la IA un roadmap de 16 etapas antes de escribir código, cubriendo desde la estructura del repo hasta el deploy.
- **Explicación de conceptos**: en cada etapa pedí que me explicara el *por qué* de cada decisión técnica (ej: por qué `min-height: 0` es necesario para el scroll interno en layouts flex; por qué la API key no puede estar en el frontend; cómo funciona `popstate` con History API).
- **Debugging real**: varios bugs se resolvieron con ayuda de la IA a partir de logs y capturas que compartí, entre ellos:
  - Un `.env` que casi se sube al repo público (GitHub Push Protection lo bloqueó); se regeneró la API key comprometida y se corrigió el tracking de git.
  - Falta de `vercel.json` para rewrites de rutas SPA (error 404 en producción/local).
  - Bug de scroll: el header se desplazaba junto con los mensajes por falta de `min-height: 0` en un contenedor flex.
  - Bug de especificidad CSS: el indicador de "escribiendo" no se ocultaba porque una regla `display: flex` propia le ganaba al atributo `hidden`.
  - Pérdida del personaje activo al recargar la página (no se persistía `currentCharacterId`, solo los mensajes).
  - Contraste roto en modo oscuro: variables CSS reutilizadas con doble propósito (texto y fondo) se invertían juntas, dejando texto invisible sobre fondos del mismo tono.
- **Migraciones de modelo de Gemini**: durante el desarrollo, `gemini-2.0-flash` fue dado de baja por Google; luego se migró de `gemini-2.5-flash` a `gemini-3.1-flash-lite` por límites de cuota gratuita, verificando cada cambio con búsquedas de documentación oficial actualizada antes de aplicarlo.
- Conflicto entre `height` fijo y `min-height` en `#app`: al resolver el scroll roto de la galería, se rompió el layout de una sola pantalla que necesitaba `/chat`; se resolvió con una clase condicional (`app--fixed-height`) aplicada solo en esa ruta.
  - Función `router()` duplicada y constante `routes` faltante tras un copy-paste incompleto, causando `SyntaxError` en el navegador.
- **Decisiones propias**: la elección de los 8 personajes, sus personalidades específicas, y qué extras priorizar fueron decisiones mías; la IA ayudó a redactar los `system prompts` en base a los rasgos que definí para cada personaje.
- **Mejoras de diseño con inspiración externa**: Se sumaron mejoras propias no pedidas por la consigna: colores de acento por personaje, selector rápido dentro del chat, panel de información del personaje, y un rediseño del Home con tema "portal multiversal" (carrusel + fondo animado), diseñado como concepto del multiverso de Marvel


## 👤 Autor

Gonzalo Bastías 