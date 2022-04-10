//const { OutputFileType } = require("typescript");

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
    travelMode: google.maps.DirectionsTravelMode.WALKING
};


directionsService.route( request, function( response, status ) {

    if ( status === 'OK' ) {
        const output = document.querySelector('#output');
        var point = response.routes[ 0 ].legs[ 0 ];
        console.log(point);
        console.log(parseInt(point.duration.text.split(' ')[0]));
        if(parseInt(point.duration.text.split(' ')[0]) > 15){
            document.innerHTML("<div>Here is some text</div>");
        }
        
    }
}
 );