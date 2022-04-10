var string1 = "http://www.google.com/maps/place/40.8004449,-77.8605032";
var string2 = "http://www.google.com/maps/place/40.7913296,-77.8698712";

function get_maps_object_walking(string1, string2){
    /*
    Inputs: 
        string1, string2 -> Maps Location Links
    Output:
        maps object with duration, time and walking instructions    
    */
    
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
        travelMode: google.maps.DirectionsTravelMode.WALKING,
    };


    directionsService.route( request, function( response, status ) {

        if ( status === 'OK' ) {
            var point = response.routes[ 0 ].legs[ 0 ];
            var json_string = JSON.stringify(point);
        }
    }

    );
    return json_string;
}
function get_maps_object_bus(string1, string2){
    /*
    Inputs: 
        string1, string2 -> Maps Location Links
    Output:
        maps object with duration, time and walking instructions    
    */
    
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
        travelMode: google.maps.DirectionsTravelMode.TRANSIT,
        transitMode: google.maps.DirectionsTransitMode.BUS
    };


    directionsService.route( request, function( response, status ) {

        if ( status === 'OK' ) {
            var point = response.routes[ 0 ].legs[ 0 ];
            var json_string = JSON.stringify(point);
        }
    }

    );
    return json_string;
}
console.log(get_maps_object_walking(string1, string2));
console.log(get_maps_object_bus(string1, string2));
