importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

var messaging = firebase.messaging();

document.addEventListener("DOMContentLoaded", function() {
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js', {scope: "/"}).then(function(registration){
                console.log('service worker registration succeeded:',registration);
            },
            function(error){
                console.log('service worker registration failed:',error);
            });
    }
    else{
        console.log('service workers are not supported.');
    }

    document.getElementById("sub").onclick = function() {
        subscribe();
    }
})



function subscribe() {
    messaging.requestPermission()
        .then(function() {
            messaging.getToken()
                .then(function(currentToken) {
                    console.log("Token:", currentToken);

                    if(currentToken) {
                        console.info("Nice");
                    } else {
                        console.warn("Не удалось получить токен");
                    }
                })
                .catch(function(err) {
                    console.warn(err);
                })
        })
}