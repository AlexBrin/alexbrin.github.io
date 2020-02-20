document.addEventListener("DOMContentLoaded", function() {
    Notification.requestPermission()
        .then(permission => {
            registerSW();
            console.log(permission);
        })
        .catch(err => {
            console.log(err);
        });

    document.getElementById("sub").onclick = registerSW;
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