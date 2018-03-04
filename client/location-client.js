// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAuMsKw1WTDbwXPIjSErzn4Yu1qiF2Xqwk&callback=initMap';

function initMap() {
    const mapElement = document.querySelector('#map')
    const worldCenter = {lat: 0, lng: 0};

    const map = new google.maps.Map(mapElement, {
        zoom: 4,
        center: worldCenter
    });

    const marker = new google.maps.Marker({
        position: worldCenter,
        map: map
    });

    navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position);
        console.log('map', map);

        const location = {lat: position.coords.latitude, lng: position.coords.longitude};
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
    })

//});
}