const CACHE_NAME = 'planificador-v1';
const urlsToCache = ['/Planificador/', '/Planificador/index.html'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '¡Buen día!';
  const options = {
    body: data.body || '¿Cómo va a ser tu día hoy?',
    icon: '/Planificador/icon-192.png',
    badge: '/Planificador/icon-192.png',
    data: { url: '/Planificador/' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/Planificador/'));
});