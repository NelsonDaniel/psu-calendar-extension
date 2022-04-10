var string1 = "http://www.google.com/maps/place/40.8004449,-77.8605032";
var string2 = "http://www.google.com/maps/place/40.7913296,-77.8698712";
function get_maps_object_walking(string1, string2, cb){
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
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService.route( request, function( response, status ) {

        if ( status === 'OK' ) {
            var point = response.routes[ 0 ].legs[ 0 ];
            directionsDisplay.setDirections(response);
            cb(null, response.routes[0].legs[0])
        }
        else {
            cb('pass error information');
          }
    }
    
    );
        
};

function get_maps_object_bus(string1, string2, cb){
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
    };
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService.route( request, function( response, status ) {

        if ( status === 'OK' ) {
            var point = response.routes[ 0 ].legs[ 0 ];
            directionsDisplay.setDirections(response);
            cb(null, response.routes[0].legs[0])
        }
        else {
            cb('pass error information');
          }
    }
    
    );
        
};

var map_object1;
get_maps_object_walking(string1, string2, function (err, map_object) {
    if (!err) {  
        window.map_object_walk = map_object;
    }
});

get_maps_object_bus(string1, string2, function (err, map_object) {
    if (!err) {  
        window.map_object_bus = map_object;      
    }
});


