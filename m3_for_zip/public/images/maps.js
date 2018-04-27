var focus = {lat:25.2744,lng:133.7751};
function initMap() {
  map = new google.maps.Map(document.getElementById('map_aus'), {
     zoom: 5,
     center: focus
   });
}
