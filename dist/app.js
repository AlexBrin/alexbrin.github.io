firebase.initializeApp({
    apiKey: "AIzaSyA1cTRtYRpVmACeaqbdnHnruvoWEj_LLdM",
    authDomain: "titan-checker-dev.firebaseapp.com",
    databaseURL: "https://titan-checker-dev.firebaseio.com",
    projectId: "titan-checker-dev",
    storageBucket: "titan-checker-dev.appspot.com",
    messagingSenderId: "468240947431",
    appId: "1:468240947431:web:d77511f15ae3b6f433ea42",
    measurementId: "G-WR3G7792E4"
});
var localStorageFirebaseMessagingKey = 'firebase-messaging-token';
var subscribeButton = document.getElementById('subscribe');
var messaging;
if ('Notification' in window &&
    'serviceWorker' in navigator &&
    'localStorage' in window &&
    'fetch' in window &&
    'postMessage' in window) {
    messaging = firebase.messaging();
    if (Notification.permission === 'granted') {
        getToken();
    }
    subscribeButton.onclick = function () {
        getToken();
    };
    messaging.onMessage(function (payload) {
        console.log("Message received: ", payload);
        navigator.serviceWorker.register('firebase-messaging-sw.js', { scope: '/' });
        Notification.requestPermission()
            .then(function (permission) {
            if (permission === 'granted') {
                navigator.serviceWorker.ready
                    .then(function (registration) {
                    payload.data.data = JSON.parse(JSON.stringify(payload.data));
                    registration.showNotification(payload.data.title, payload.data);
                })
                    .catch(function (error) {
                    console.error("ServiceWorker registration failed ", error);
                });
            }
        })
            .catch(function (error) {
            console.error(error);
            alert("Unable to get permission to notify");
        });
    });
    messaging.onTokenRefresh(function () {
        messaging.getToken()
            .then(function (refreshedToken) {
            console.log("Token refreshed");
            sendTokenToServer(refreshedToken);
            showToken(refreshedToken);
        })
            .catch(function (error) {
            console.error(error);
        });
    });
}
function getToken() {
    Notification.requestPermission()
        .then(function () {
        messaging.getToken()
            .then(function (currentToken) {
            if (currentToken) {
                sendTokenToServer(currentToken);
                showToken(currentToken);
            }
            else {
            }
        });
    })
        .catch(function (error) {
        console.error(error);
        alert("Unable to get permission to notify");
    });
}
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem(localStorageFirebaseMessagingKey) === currentToken;
}
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log("Sending token to server...");
        setTokenSentToServer(currentToken);
    }
    else {
        console.log("Token already send to server");
    }
}
function setTokenSentToServer(currentToken) {
    if (currentToken) {
        window.localStorage.setItem(localStorageFirebaseMessagingKey, currentToken);
    }
    else {
        window.localStorage.removeItem(localStorageFirebaseMessagingKey);
    }
}
function showToken(currentToken) {
    document.getElementById('token').textContent = currentToken;
}
