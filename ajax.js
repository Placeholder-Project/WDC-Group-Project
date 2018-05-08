function home_search()
{
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var hotels = JSON.parse(xhttp.responseText);
      for (var i = 0; i < hotels.length; i++) {
        if (i == 0) {
          document.getElementById("searched_hotels").innerHTML = <p class="imageinfo"><img src=+hotels[i].img_src+ alt="Hotel 1" class="hotels"><strong>Name: </strong> +hotels[i].name+ <br> <strong>Stars: <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i></strong><br> <strong> +hotels[i].price+":" </strong><strong>"$" +hotels[i].price+"per night"<br> <strong>Location: </strong>+hotels[i].city+ "(CBD)"</p>;
        }
        else {
          document.getElementById("searched_hotels").innerHTML += <p class="imageinfo"><img src=+hotels[i].img_src+ alt="Hotel 1" class="hotels"><strong>Name: </strong> +hotels[i].name+ <br> <strong>Stars: <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i></strong><br> <strong> +hotels[i].price+":" </strong><strong>"$" +hotels[i].price+"per night"<br> <strong>Location: </strong>+hotels[i].city+ "(CBD)"</p>
        }
      }
    }
  };
  xhttp.open("GET", "/SearchHotels", true);
  xhttp.send();
}
