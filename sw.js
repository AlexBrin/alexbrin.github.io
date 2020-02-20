importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA1cTRtYRpVmACeaqbdnHnruvoWEj_LLdM",
    authDomain: "titan-checker-dev.firebaseapp.com",
    databaseURL: "https://titan-checker-dev.firebaseio.com",
    projectId: "titan-checker-dev",
    storageBucket: "titan-checker-dev.appspot.com",
    messagingSenderId: "468240947431",
    appId: "1:468240947431:web:d77511f15ae3b6f433ea42",
    measurementId: "G-WR3G7792E4"
})



messaging.getToken().then(currentToken => {
    if(currentToken) {
        console.log("Token:", currentToken)
    } else {
        console.log('No Instance ID token available. Request permission to generate one.');
    }
})
    .catch(err => {
        console.error(err);
    });

if(Notification.permission === 'granted') {
    subscribe();
}

