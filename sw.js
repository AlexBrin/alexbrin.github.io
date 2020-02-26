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
    .then(function(a, b, c) {
        console.log("a ", a);
        console.log("b ", b);
        console.log("c ", c);
    })

var messaging = firebase.messaging();
console.log("messaging:", messaging);

messaging.onMessage(function(payload) {
    console.log("Payload: ", payload);
    return payload;
})

messaging.requestPermission()
    .then(function(p) {
        console.log("perm:", p)
        messaging.getToken()
            .then(function(currentToken) {
                console.log("Token:", currentToken);
            })
            .catch(function(err) {
                console.warn(err);
            })
    })
    .catch(function(err) {
        console.warn(err);
    })