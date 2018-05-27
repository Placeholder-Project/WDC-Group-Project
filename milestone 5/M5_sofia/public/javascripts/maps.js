var focus = {lat:-27, lng: 133.7751};
var markers = [];
var markerArray = [];
function initMap(){
  map = new google.maps.Map(document.getElementById('map_aus'), {
      zoom: 4,
      center: focus
  });
  infowindow = new google.maps.InfoWindow();


}
var hotels_array;
function pass_hotel_array(search_word){
  clearMarkers();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var arr = JSON.parse(xhttp.responseText);
      //console.log("HOTELS ARRAY "+arr[0].hotel_name);
      add_markers(arr);
    }
  };
  var object = {'search_word': search_word};
  //console.log("SEARCH WORD"+object.search_word);
  //console.log("SEARCH WORD"+object);
  xhttp.open("POST","/mapSearch", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  //console.log("SEARCH WORD"+object);
  xhttp.send(JSON.stringify(object));


}

function marker(hotel) {

  var content = "<h4>"+ hotel.hotel_name +"</h4><p><strong>Location: </strong>"+hotel.location +
  "<br><strong>Price: </strong>"+hotel.cost_per_night+
  "<br> \
  <form action='/HotelDetails' method='get'> \
    <input type='hidden' name='hotel_id' value='"+hotel.hotel_id+"' /> \
    <button type='submit' class='btn btn-default button_details_booknow'>Details</button> \
  </form>\
  <form action='/BookingDetails' method='get'>\
    <button type='submit' onclick = 'store_name_price(&quot;"+hotel.hotel_name+"&quot;, &quot;"+hotel.cost_per_night+"&quot;, &quot;"+hotel.location+"&quot;, &quot;"+hotel.hotel_id+"&quot;)' class='btn btn-default button_details_booknow'>Book Now</button>\
  </form>";
  var loc = {"lat":hotel.lat,"lng":hotel.lng};
  map.setZoom(11);
  var marker = new google.maps.Marker({
    position : loc,
    map      : map
  });

  map.panTo(marker.position);
  markers.push(marker);


  google.maps.event.addListener(marker, 'click', function(){
      infowindow.close(); // Closes last window
      infowindow.setContent(content);
      infowindow.open(map, marker); // open this new infowindow
  });
}

function add_markers(hotels_array){
  var i;
  for(i=0; i<hotels_array.length; i++) {
    marker(hotels_array[i]);
  }

}

function setMapOnAll(val) {

}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}
