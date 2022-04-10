var string1 = "http://www.google.com/maps/place/40.8004449,-77.8605032";
var string2 = "http://www.google.com/maps/place/40.7913296,-77.8698712";
var lat1 = string1.split('/')[5].split(',')[0]
var lng1 = string1.split('/')[5].split(',')[1]
var lat2 = string2.split('/')[5].split(',')[0]
var lng2 = string2.split('/')[5].split(',')[1]

var origin = new google.maps.LatLng(lat1, lng1); // using google.maps.LatLng class
var destination = lat2 + ', ' + lng2; // using string

var directionsService = new google.maps.DirectionsService();
var request = {
    origin: origin, // LatLng|string
    destination: destination, // LatLng|string
    travelMode: google.maps.DirectionsTravelMode.TRANSIT
};


directionsService.route( request, function( response, status ) {

    if ( status === 'OK' ) {
        var point = response.routes[ 0 ].legs[ 0 ];
        console.log(point);
    }
}
 );