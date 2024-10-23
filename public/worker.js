//Installing the sw.js

const installEvent = () => {
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll(['/', '/offline', '/manifest.json']);
      })
    );
  });
};
installEvent();

//Activating the sw.js

const activateEvent = () => {
  self.addEventListener('activate', () => {
    return true;
  });
};
activateEvent();

//handling the push manager

self.addEventListener('push', async (e) => {
  const { message, body, icon, route } = JSON.parse(e.data.text());

  e.waitUntil(
    self.registration.showNotification(message, {
      body,
      icon: icon || '/main.png',
      badge: '/main.png',
      vibrate: [100, 50, 100],
      data: { route },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const route = event.notification.data.route;

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client)
            return client.focu(route ? route : '/jobs');
        }
        if (clients.openWindow)
          return clients.openWindow(route ? route : '/jobs');
      })
  );
});
