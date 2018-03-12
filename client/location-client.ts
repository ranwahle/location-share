// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAuMsKw1WTDbwXPIjSErzn4Yu1qiF2Xqwk&callback=initMap';


import {sendLocationToServer} from './messaging-client';
import {GoogleLocation} from './models/google-location.model';

declare let google;

function getMapComponent() {

}

export let mapComponent;

class LocationSharingMap {

    markers;
    map;
    constructor() {
        const mapElement = document.querySelector('#map')
        const worldCenter = {lat: 0, lng: 0};
        this.markers = [];
        this.map = new google.maps.Map(mapElement, {
            zoom: 4,
            center: worldCenter
        });

        this.map.addListener('click', (clickEvent) => {
           console.log('map click', clickEvent);
           sendLocationToServer({lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng() })
         // this.setMarker({)
        });

        this.setMarker(worldCenter);

        navigator.geolocation.getCurrentPosition((position) => {
            console.log('position', position);
//            console.log('map', map);

            const location = {lat: position.coords.latitude, lng: position.coords.longitude};
           // this.setMarker(location);
        })
    }

    removeMarker(marker) {
        this.markers = this.markers.filter(m => m !== marker);
        marker.setMap(null);
    }

    clearMarkers() {
        this.markers.forEach(m => {
            m.setMap(null);
        })
        this.markers = [];
    }

    setMarker(location: GoogleLocation) {
        const marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
        this.markers.push(marker);
    }
}

export function initMap() {

mapComponent = new LocationSharingMap();
//});
}

window['initMap'] = initMap;
