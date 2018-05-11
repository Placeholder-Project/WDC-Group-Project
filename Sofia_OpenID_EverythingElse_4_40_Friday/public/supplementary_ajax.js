
function SearchHotelsResponce(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 &&this.status == 200){
      document.getElementById("SearchHotelsID").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST","/SearchHotels", true);
  xhttp.send();

}




router.post('/SearchHotels', function(req, res) {
  prev_pages.push(current_page);
  current_page = "/SearchHotels.html";
  var searchedHotels = hotels_from_search(req.body.searchBar);
  var div_content='';
  for (var i = 0; i < searchedHotels.length; i++) {
	  div_content += '<link rel="stylesheet" type = "text/css" href="stylesheets/placeholder.css"> \
          <p class="imageinfo"><img style = "width: 30%;float:left;display: inline-block;margin: 0px 10px 10px 0px;" src='+searchedHotels[i].img_src+ " " +
	  			'alt="Hotel '+i+ " " +
					'class="hotels"><strong>Name: </strong> '+searchedHotels[i].name+
					'<br> <strong>Stars: '+write_stars(searchedHotels[i].stars)+
					'</strong><br> <strong>Price: </strong>$'+searchedHotels[i].price+
					'per night<br> <strong>Location: </strong>'+searchedHotels[i].city+
					'</p><p>'+ write_features(searchedHotels[i].features).join(" | ") +'</p> \
					<form action="/HotelDetails" method="get">\
						<button type="submit" class="btn btn-default button_details_booknow">Details</button>\
					</form>\
					<form action="/BookingDetails" method="get">\
						<button type="submit" class="btn btn-default button_details_booknow">Book Now</button>\
					</form>\
					<div style="clear:both;"></div>';
  }
  var to_send = '<!DOCTYPE html> \
  <html lang="en" dir="ltr"> \
    <head> \
      <meta charset="utf-8"> \
      <title>Home</title> \
      <title>PLACEHOLDER</title> \
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> \
      <meta charset="utf-8"> \
      <meta name="viewport" content="width=device-width, initial-scale=1"> \
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> \
      <link rel="stylesheet" type = "text/css" href="stylesheets/placeholder.css"> \
      <link rel="stylesheet" type = "text/css" href="stylesheets/maps.css"> \
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> \
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Karla%7COxygen%7CRubik"> \
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> \
      <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"> \
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> \
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> \
      <script src="javascripts/placeholder.js"></script> \
      <script src="javascripts/hotels.js"></script> \
      <script src="javascripts/maps.js"></script> \
    </head> \
    <body> \
		<header>\
      <!-- acts as home button -->\
      <form action="/" method="get">\
        <button type = "submit" id="placeholdertext"><span onclick="go_home()"><span class="firstTitleColour">place</span><span class="secondTitleColour">holder</span></span></button>\
      </form>\
      <!-- login signup buttons -->\
      <form action="Signup.html">\
        <button onclick="signup_button()" class = "login_sign-up btn btn-default" id ="su"> Sign-up </button>\
      </form>\
      <form action="Login.html">\
        <button onclick="login_button()" class = "login_sign-up btn btn-default" > Login </button>\
      </form>\
    </header>\
      <!-- DISPLAY OF HOTELS --> \
	 <div class="container-fluid text-center feature_page" id="places_and_area_div"> \
        <div class="row content"> \
          <div class="col-sm-12 text-left"> \
            <div class="col-md-12"> \
              <h1>Hotels</h1> \
		    ' + div_content + '\
              <!--all onclick detail functions pass the name of the hotel--> \
              <div style="clear:both;"></div> \
              <br> \
            </div> \
          </div> \
        </div> \
          <form action="/back" method="get"> \
            <button type="submit" name="button" class="btn btn-default back_button">Back</button> \
          </form> \
        </div> \
      <!-- FOOTER --> \
      <footer class="container-fluid text-center"> \
        <p>Footer Text</p> \
      </footer> \
    </body> \
  </html>';

  res.send(to_send);
});
