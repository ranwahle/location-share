const sockjs_url = '/echo';
const sockjs = new SockJS(sockjs_url);


sockjs.onopen    = function()  {
   // print('[*] open', sockjs.protocol);
 // sendLocation();
};

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


sockjs.onmessage = (e) => { console.log('message', e);
    const location = JSON.parse(e.data);
    mapComponent.setMarker(location);
}
    ;
sockjs.onclose   = () => {console.log('[*] close');};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button#btnSendLocation').addEventListener('click', () => {
        sendLocation();
    })

    document.querySelector('#btnClearMarkers').addEventListener('click', () => {
        mapComponent.clearMarkers();
    })
})