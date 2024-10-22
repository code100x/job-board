const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};
activateEvent();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) =>
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'cgdjg',
    })
  );
}
