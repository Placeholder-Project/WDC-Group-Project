
var focus = {lat:-27, lng: 133.7751};
function initMap(){
  map = new google.maps.Map(document.getElementById('map_aus'), {
      zoom: 4,
      center: focus
  });
  infowindow = new google.maps.InfoWindow();

  ////////// REMOVE WHEN ANDYS CODE IS IMPLEMENTED ////////
  //var hotels_array = [{lat:-27, lng: 133.7751},{lat:-20, lng: 133.7751},{lat:-27, lng: 128.7751}];
  //var hotels_name = ["name1","name2","name3"];
  //add_markers(hotels_array);

}
var hotels_array;
function pass_hotel_array(search_word){
  //ajax to return hotels array from mapSearch
  // object needs to contain name, city, price, source
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var arr = JSON.parse(xhttp.responseText);
      console.log("HOTELS ARRAY "+arr[0].hotel_name);
      add_markers(arr);
    }
  };
  var object = {'search_word': search_word};
  console.log("SEARCH WORD"+object.search_word);
  console.log("SEARCH WORD"+object);
  xhttp.open("POST","/mapSearch", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  console.log("SEARCH WORD"+object);
  xhttp.send(JSON.stringify(object));

  // ;
  //

  // var xhttp = new XMLHttpRequest();
  // var name_price_object = {'hotel_name': hotel_name, 'hotel_price': price, 'location': city, 'hotel_id': h_id};
  // xhttp.open("POST","/StoreNamePrice", true);
  // xhttp.setRequestHeader("Content-type", "application/json");
  // window.location.replace("BookingDetails.html");
  // xhttp.send((JSON.stringify(name_price_object)));

}

function marker(hotel) {
  /*name = "blh";
  city = "adf";
  price = 200;
  img_src = "images/hotel2.jpg";*/
  var content = "<h4>"+ hotel.hotel_name +"</h4><p><strong>Location: </strong>"+hotel.location +
  "<br><strong>Price: </strong>"+hotel.cost_per_night+
  "<br> \
  <form action='/HotelDetails' method='get'> \
    <button type='submit' class='btn btn-default button_details_booknow'>Details</button> \
  </form>\
  <form action='/BookingDetails' method='get'>\
    <button type='submit' onclick = 'store_name_price('"+hotel.hotel_name+"', '"+hotel.cost_per_night+"', '"+hotel.location+"', '"+hotel.hotel_id+"')' class='btn btn-default button_details_booknow'>Book Now</button>\
  </form>";
  console.log(hotel.hotel_name);
  var loc = {"lat":hotel.lat,"lng":hotel.lng};
  var marker = new google.maps.Marker({
    position : loc,
    map      : map
  });

  google.maps.event.addListener(marker, 'click', function(){
      infowindow.close(); // Closes last window
      infowindow.setContent(content);
      infowindow.open(map, marker); // open this new infowindow
  });
}

function add_markers(hotels_array){
  console.log(hotels_array);
  for(var i=0; i<hotels_array.length; i++) {
    //console.log("IDK ANYMORE"+hotels_array[i].hotel_name);
    marker(hotels_array[i]);
  }

}



////////////////////////////  MAPS FUNCTIONS ////////////////////////////

function back_button_map(){
  $("#maps_div").hide();
  $("#search_div").show();
}

function book_details_maps(hotel, location, night_price){
  previous_map_or_search_or_details = "map";
  hotel_name = hotel;
  hotel_location = location;
  price = night_price;
  $("#maps_div").hide();
  $("#booking_your_hotel_div").show();
}


function details_maps(placename,location,price,img){
  details_to_map_or_search = "map";
  Placename=placename;
  Locations=location;
  Hotelprice=price;
  $("#maps_div").hide();
  $("#hotel_details_div").show();
  $("#image_details").attr("src",img);
  $("#name_details").html(placename);
  $("#price_details").html("$"+price);
  $("#location_details").html(location);

}
