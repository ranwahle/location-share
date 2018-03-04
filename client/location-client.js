// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAuMsKw1WTDbwXPIjSErzn4Yu1qiF2Xqwk&callback=initMap';

function getMapComponent() {

}

let mapComponent;

class LocationSharingMap {
    constructor() {
        const mapElement = document.querySelector('#map')
        const worldCenter = {lat: 0, lng: 0};

        this.map = new google.maps.Map(mapElement, {
            zoom: 4,
            center: worldCenter
        });

        this.setMarker(worldCenter);

        navigator.geolocation.getCurrentPosition((position) => {
            console.log('position', position);
            console.log('map', map);

            const location = {lat: position.coords.latitude, lng: position.coords.longitude};
           this.setMarker(location);
        })
    }

    setMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
    }
}

function initMap() {

mapComponent = new LocationSharingMap();
//});
}

