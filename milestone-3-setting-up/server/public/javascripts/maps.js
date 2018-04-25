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

function pass_hotel_array(){
  var hotels_array = hotels_from_search();
  add_markers(hotels_array);
}

function add_markers(hotels_array){
  function marker(location, name, city, price, features, stars, img_src, description) {

    var content = "<h4>"+ name +"</h4><p><strong>Location: </strong>"+city+
    "<br><strong>Price: </strong>"+price+
    "<br><br><strong>Other info: </strong></p>";

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

  for(var i=0; i<hotels_array.length; i++) {
    marker(hotels_array[i].location, hotels_array[i].name, hotels_array[i].city,hotels_array[i].price,hotels_array[i].features,hotels_array[i].stars,hotels_array[i].img_src,hotels_array[i].description);
  }

}
