import {GoogleLocation} from './models/google-location.model';
import {mapComponent} from './location-client';
import * as SockJS from 'sockjs-client';


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
       // console.log('map', map);

        const location: GoogleLocation =
            {lat: position.coords.latitude, lng: position.coords.longitude, name: (<HTMLInputElement>
                    document.querySelector('#txtName')).value};
        sendLocationToServer(location);
    })
}

export function sendLocationToServer(location) {
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