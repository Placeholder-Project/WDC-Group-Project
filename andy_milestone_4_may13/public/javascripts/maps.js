
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

function pass_hotel_array(search_word){
  var hotels_array = hotels_from_search(search_word);
  add_markers(hotels_array);
}

function marker(location, name, city, price, features, stars, img_src, description) {
  /*name = "blh";
  city = "adf";
  price = 200;
  img_src = "images/hotel2.jpg";*/
  var content = "<h4>"+ name +"</h4><p><strong>Location: </strong>"+city+
  "<br><strong>Price: </strong>"+price+
  "<br>"+
  "<button type='button' class='btn btn-default button_details_booknow' onclick='details_maps(\""+name+"\",\""+city+"\",\""+price+"\",\""+img_src+"\")'>Details</button>"+
  "<button type='button' class='btn btn-default button_details_booknow' onclick='book_details_maps(\""+name+"\",\""+city+"\",\""+price+"\")'>Book Now</button>";

  var marker = new google.maps.Marker({
    position : location,
    map      : map
  });

  google.maps.event.addListener(marker, 'click', function(){
      infowindow.close(); // Closes last window
      infowindow.setContent(content);
      infowindow.open(map, marker); // open this new infowindow
  });
}

function add_markers(hotels_array){

  for(var i=0; i<hotels_array.length; i++) {
    marker(hotels_array[i].location, hotels_array[i].name, hotels_array[i].city,hotels_array[i].price,hotels_array[i].features,hotels_array[i].stars,hotels_array[i].img_src,hotels_array[i].description);
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
