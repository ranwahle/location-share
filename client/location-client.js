// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAuMsKw1WTDbwXPIjSErzn4Yu1qiF2Xqwk&callback=initMap';

function getMapComponent() {

}

let mapComponent;

class LocationSharingMap {
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
            console.log('map', map);

            const location = {lat: position.coords.latitude, lng: position.coords.longitude};
           // this.setMarker(location);
        })
    }

    removeMarker(marker) {
        this.markers = this.marksers.filter(m => m !== marker);
        marker.setMap(null);
    }

    clearMarkers() {
        this.markers.forEach(m => {
            m.setMap(null);
        })
        this.markers = [];
    }

    setMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
        this.markers.push(marker);
    }
}

function initMap() {

mapComponent = new LocationSharingMap();
//});
}

