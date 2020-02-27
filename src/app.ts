/// <reference path="d/firebase-messaging-sw.d.ts" /
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

const localStorageFirebaseMessagingKey = 'firebase-messaging-token';
const subscribeButton = document.getElementById('subscribe');
let messaging: firebase.messaging.Messaging;

if (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'localStorage' in window &&
    'fetch' in window &&
    'postMessage' in window
) {
    messaging = firebase.messaging();

    if(Notification.permission === 'granted') {
        getToken();
    }

    subscribeButton.onclick = function() {
        getToken();
    };

    messaging.onMessage((payload: any) => {
        console.log("Message received: ", payload);

        navigator.serviceWorker.register('dist/firebase-messaging-sw.js', {scope: '/'});
        Notification.requestPermission()
            .then(function (permission: string) {
                if (permission === 'granted') {
                    navigator.serviceWorker.ready
                        .then(function (registration: ServiceWorkerRegistration) {
                            payload.data.data = JSON.parse(JSON.stringify(payload.data));
                            registration.showNotification(payload.data.title, payload.data);
                        })
                        .catch((error: Error) => {
                            console.error("ServiceWorker registration failed ", error);
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Unable to get permission to notify");
            });
    });

    messaging.onTokenRefresh(() => {
        messaging.getToken()
            .then((refreshedToken: string) => {
                console.log("Token refreshed");
                sendTokenToServer(refreshedToken);
                showToken(refreshedToken);
            })
            .catch((error: any) => {
                console.error(error);
            });
    });
}

function getToken(): void {
    Notification.requestPermission()
        .then(() => {
            messaging.getToken()
                .then((currentToken: string) => {
                    if(currentToken) {
                        sendTokenToServer(currentToken);
                        showToken(currentToken);
                    } else {

                    }
                })
        })
        .catch((error) => {
            console.error(error);
            alert("Unable to get permission to notify");
        });
}

/**
 *
 * @param {string} currentToken
 * @return {boolean}
 */
function isTokenSentToServer(currentToken: string): boolean {
    return window.localStorage.getItem(localStorageFirebaseMessagingKey) === currentToken;
}

/**
 *
 * @param {string} currentToken
 */
function sendTokenToServer(currentToken: string): void {
    if(!isTokenSentToServer(currentToken)) {
        console.log("Sending token to server...");
        setTokenSentToServer(currentToken);
    } else {
        console.log("Token already send to server");
    }
}

/**
 * @param {string} currentToken
 */
function setTokenSentToServer(currentToken: string): void {
    if(currentToken) {
        window.localStorage.setItem(localStorageFirebaseMessagingKey, currentToken);
    } else {
        window.localStorage.removeItem(localStorageFirebaseMessagingKey);
    }
}




function showToken(currentToken: string): void {
    document.getElementById('token').textContent = currentToken;
}