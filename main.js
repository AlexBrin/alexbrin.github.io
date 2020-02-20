document.addEventListener("DOMContentLoaded", function() {
    Notification.requestPermission()
        .then(permission => {
            console.log(permission);
        })
        .catch(err => {
            console.log(err);
        });

    document.getElementById("sub").onclick = function() {
        subscribe();
    }
})

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