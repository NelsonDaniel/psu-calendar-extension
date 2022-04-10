var string1 = "http://www.google.com/maps/place/40.7938,-77.8676";
var string2 = "http://www.google.com/maps/place/40.8122,-77.8561";

var eoc = "11:34am"; 
var hours = parseInt(eoc.split(":")[0]);
var mins = parseInt(eoc.split(":")[1].slice(0, 2));
window.eoctime = new Date(2022, 4, 11, hours, mins, 0, 0);

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
        transitOptions: {
            departureTime: window.eoctime
        }
    };
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService.route( request, function( response, status ) {

        if ( status === 'OK' ) {
            var point = response.routes[ 0 ].legs[ 0 ];
            directionsDisplay.setDirections(response);
            cb(null, response.routes[0].legs[0])
            window.walk_mins = parseInt(point.duration.text.split(' ')[0]);
            console.log()
            console.log(point);
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
        transitOptions: {
            modes:['BUS'],
            departureTime: window.eoctime
        }
    };
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService.route( request, function( response, status ) {

        if ( status === 'OK' ) {
            var point = response.routes[ 0 ].legs[ 0 ];
            directionsDisplay.setDirections(response);
            cb(null, response.routes[0].legs[0])
            window.bus_mins = parseInt(point.duration.text.split(' ')[0]);
            window.inst = point.steps[0].instructions; 
            window.dep = point.departure_time.text;
            console.log(point);
        }
        else {
            cb('pass error information');
          }
    }
    
    );
        
};

function reload(){
    if(window.bus_mins >= 15 && window.walk_mins >= 15){
        document.getElementById("alert").className = "alert alert-danger";
        var min = Math.min(window.bus_mins, window.walk_mins) - 15;
        console.log("1st");
        document.getElementById("alert").innerHTML = "You'll be late for class by atleast " + min.toString() + " minutes!";
    }else if(window.bus_mins < 15 && window.walk_mins < 15){
        document.getElementById("alert").className = "alert alert-success";
        console.log("2nd");
        document.getElementById("alert").innerHTML = "You can walk or take the bus!\nBus Instructions: " + window.inst + " at " + window.dep;  
    }else if(window.bus_mins < 15 && window.walk_mins > 15){
        document.getElementById("alert").className = "alert alert-warning";
        console.log("3rd");
        document.getElementById("alert").innerHTML = "You can take the bus!\nBus Instructions: " + window.inst + " at " + window.dep;  
    }
}

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


