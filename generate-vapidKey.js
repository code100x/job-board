import webpush from 'web-push';
const vapidKeys = webpush.generateVAPIDKeys();

console.log('NEXT_PUBLIC_VAPID_PUBLIC_KEY=', vapidKeys.publicKey);
console.log('VAPID_PRIVATE_KEY=', vapidKeys.privateKey);
