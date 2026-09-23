// Aposento Alto — Service Worker (PWA Offline Shell)
const CACHE_NAME = 'aposento-alto-v1.1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './favicon.svg',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/hero_sunrise_mountains.jpg',
  './images/nature_path_light.jpg',
  './images/devotional_bible_morning.jpg',
  './images/person_gratitude_nature.jpg'
];

// Instalação do Service Worker & Cache de Ativos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Ativação e Limpeza de Caches Antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de Busca: Stale-While-Revalidate com Fallback
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não são GET ou que vão para o Supabase/Google Fonts dinâmico
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Requisições locais (mesma origem)
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
