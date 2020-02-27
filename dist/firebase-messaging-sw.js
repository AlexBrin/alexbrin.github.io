importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');
var app = firebase.initializeApp({
    messagingSenderId: '468240947431',
});
app.setBackgroundMessageHandler(function (payload) {
    console.log("Handling background message ", payload);
    payload.data.data = JSON.parse(JSON.stringify(payload.data));
    return self.registration.showNotification(payload.data.title, payload.data);
});
self.addEventListener('notificationclick', function (event) {
    var target = event.notification.data.click_action || '/';
    event.notification.close();
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === target && 'focus' in client) {
                return client.focus();
            }
        }
        return clients.openWindow(target);
    }));
});
