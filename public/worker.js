//Registering the sw.js -- nextpwa not registering

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) =>
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'cgdjg',
    })
  );
}

//Installing the sw.js

const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

//Activating the sw.js

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};
activateEvent();

//handling the push manager

self.addEventListener('push', async (e) => {
  const { message, body, icon } = JSON.parse(e.data.text());

  e.waitUntil(
    self.registration.showNotification(message, {
      body,
      icon,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // This looks to see if the current window is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('/');
      })
  );
});
