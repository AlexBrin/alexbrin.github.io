document.addEventListener("DOMContentLoaded", function() {
    // document.getElementById("sub").onclick = subscribe;

    registerSW();
})

function subscribe() {
    Notification.requestPermission()
        .then(permission => {
            console.log(permission);
            registerSW();
        })
        .catch(err => {
            console.log(err);
        });
}

function registerSW() {
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
}