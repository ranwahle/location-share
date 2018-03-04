const sockjs_url = '/echo';
const sockjs = new SockJS(sockjs_url);


sockjs.onopen    = function()  {
   // print('[*] open', sockjs.protocol);
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position);
        console.log('map', map);

        const location = {lat: position.coords.latitude, lng: position.coords.longitude};
        sockjs.send(location);
    })
};
sockjs.onmessage = (e) => { console.log('message', e)} ;
sockjs.onclose   = () => {console.log('[*] close');};


