fetch('/get-socket-url').then(response =>{
    console.log('sckjs url', response)
    response.text().then(sockjs_url => {
        sockjs = new SockJS(sockjs_url);
        sockjs.onmessage = (e) => {
            console.log('message', e);
            const location = JSON.parse(e.data);
            mapComponent.setMarker(location);
        }
        ;
        sockjs.onclose = () => {
            console.log('[*] close');
        };
    });
})

let sockjs ; //= new SockJS(sockjs_url);




function sendLocation () {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position);
        console.log('map', map);

        const location = {lat: position.coords.latitude, lng: position.coords.longitude, name: document.querySelector('#txtName').value};
        sendLocationToServer(location);
    })
}

function sendLocationToServer(location) {
    sockjs.send(JSON.stringify( location));

}



document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button#btnSendLocation').addEventListener('click', () => {
        sendLocation();
    })

    document.querySelector('#btnClearMarkers').addEventListener('click', () => {
        mapComponent.clearMarkers();
    })
})