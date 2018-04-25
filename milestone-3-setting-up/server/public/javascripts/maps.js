var focus = {lat:-27, lng: 133.7751};
function initMap() {
  map = new google.maps.Map(document.getElementById('map_aus'), {
     zoom: 3.5,
     center: focus
   });
}
