/// <reference path="d/firebase-messaging-sw.d.ts" />
/// <reference path="d/service-worker.d.ts" />
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

// @ts-ignore
let messaging: any = firebase.initializeApp({
    messagingSenderId: '468240947431',
});

messaging.setBackgroundMessageHandler((payload: any) => {
    console.log("Handling background message ", payload);

    payload.data.data = JSON.parse(JSON.stringify(payload.data));
    return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function (event: Event) {
    // @ts-ignore
    const target = event.notification.data.click_action || '/';
    // @ts-ignore
    event.notification.close();

    // @ts-ignore
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
        // @ts-ignore
    }).then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
            let client = clientList[i];
            if (client.url === target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});