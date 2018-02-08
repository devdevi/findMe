$(document).ready(function() {
  $('.button-collapse').sideNav();
});
function initMap() {
  var santiago = {lat: -33.4317485,
    lng: -70.663317};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: santiago
  });
  // Agregar un markador
  var logo = 'http://maps.google.com/mapfiles/kml/paddle/grn-stars.png';
  var marker = new google.maps.Marker({
    position: santiago,
    icon: logo,
    draggable: true,
    map: map
  });

  function searchMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(exit, error);// getCurrentPosition permite al usuario obtener su ubicación actual, uncionExito se ejecuta solo cuando el usuario comparte su ubicación, mientras que funcionError se ejecuta cuando se produce un error en la geolocalización
    }
  }

  document.querySelector('#searchMe').addEventListener('click', searchMe);
  var latitude, longitude;

 	function exit(posicion) { // var funcionExito, con el que obtendremos nuestra latitud o longitud y además crearemos un marcador de nuestra ubicación.
    latitude = posicion.coords.latitude;
    longitude = posicion.coords.longitude;

    var image = 'http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png';

    var miUbicacion = new google.maps.Marker({
      position: {lat: latitude,
        lng: longitude},
      animation: google.maps.Animation.DROP,
      map: map,
      icon: image,
      title: 'hola lab!'

    });

    map.setZoom(17);
    map.setCenter({lat: latitude,
      lng: longitude});
  }

  	function error(error) { // funcionError con un mensaje para el usuario, en caso de que nuestra geolocalización falle.
    alert('tenemos un problema con encontrar tu ubicación');
  }

  var input = document.getElementById('searchInit');
  var inputEnd = document.getElementById('searchEnd');

  new google.maps.places.Autocomplete(input);
  new google.maps.places.Autocomplete(inputEnd);

  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService;


  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  	directionsService.route({
   		origin: input.value,
	   	destination: inputEnd.value,
   		travelMode: 'WALKING',
   	}, function(response, status) {
   		if (status === 'OK') {
   		directionsDisplay.setDirections(response);
        var star = response.routes[0].legs[0].start_location;
        var end = response.routes[0].legs[0].end_location;
        // console.log(JSON.stringify(star, null, ''));         
        function addMarker(pos) {
          var image = 'http://maps.google.com/mapfiles/kml/shapes/cycling.png';
          new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            map: map,
            icon: image,
            title: 'hola lab!'
          });
        }
        addMarker(star);
        addMarker(end);
 		} else {
   			window.alert('No Encontramos una Ruta.');
   		}	
   	});
  };
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions({ suppressMarkers: true });
  var makeMyRoute = function() {
    	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('makeRout').addEventListener('click', makeMyRoute);
};
