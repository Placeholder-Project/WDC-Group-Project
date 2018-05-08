var express = require('express');
var router = express.Router();
var prev_page;
var current_page;

var InterContinental = {
  name:"InterContinental",
  location: {lat: -34.9212 , lng: 138.6059},
  city: "Adelaide",
  price: 550,
  features: [0,1,2,3,4,5,6],
  stars: 4,
  img_src: ["images/hotel1.jpg"],
  description: "Exclusively positioned on the banks of the River Torrens, InterContinental Adelaide provides luxury city centre accommodation, dining and meeting facilities. Situated adjacent to the Adelaide Festival Centre, Convention Centre, Casino and directly opposite the spectacular Adelaide Oval, our location provides effortless exploring and entertainment at your fingertips."
};

var Hilton = {
  name: "Hilton",
  location: {lat: -34.929143, lng: 138.598906},
  city: "Adelaide",
  price: 330,
  features: [0,1,3,4],
  stars: 4,
  img_src: ["images/hotel2.jpg"],
  description: "Overlooking Victoria Square, Hilton Adelaide is set in the heart of the city’s entertainment, shopping and dining precincts. The Central Market, Chinatown and Gouger Street - Adelaide’s most vibrant dining destinations – are also minutes away."
};

var all_hotels = [InterContinental, Hilton];

function hotels_from_search(search_word) {
	var new_list=[];
	for (var i = 0 ; i < all_hotels.length; i ++) {

		if (all_hotels[i].city == search_word) {
			new_list.push(all_hotels[i]);

		}
	}
  return new_list;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/SearchHotels', function(req, res) {
  prev_page = current_page;
  current_page = "SearchHotels.html";

  var searchedHotels = hotels_from_search(req.body);

  res.send('<!DOCTYPE html> \
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
      <!-- HEADER --> \
      <header> \
        <!-- acts as home button --> \
        <form action="/Homepage" method="get"> \
          <button type = "submit" id="placeholdertext"><span onclick="go_home()"><span class="firstTitleColour">place</span><span class="secondTitleColour">holder</span></span></button> \
        </form> \
        <!-- login signup buttons --> \
        <form action="Signup.html"> \
          <button onclick="signup_button()" class = "login_sign-up btn btn-default" id ="su"> Sign-up </button> \
        </form> \
        <form action="Login.html"> \
          <button onclick="login_button()" class = "login_sign-up btn btn-default" > Login </button> \
        </form> \
      </header> \

      <!-- DISPLAY OF HOTELS --> \

      <div class="container-fluid text-center feature_page" id="places_and_area_div"> \
        <div class="row content"> \
          <div class="col-sm-12 text-left"> \
            <div class="col-md-12"> \
              <h1>Hotels</h1> \
              <p class="imageinfo"><img src="images/hotel1.jpg" alt="Hotel 1" class="hotels"><strong>Name: </strong> InterContinental <br> <strong>Stars: <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i></strong><br> <strong>Price: </strong>$550 per night<br> <strong>Location: </strong>Adelaide (CBD)</p> \
              <!--all onclick detail functions pass the name of the of the hotel--> \
              <button type="button" class="btn btn-default button_details_booknow" onclick="details('InterContinental','Adelaide(CBD)',550,'images/hotel1.jpg')">Details</button> \
              <button type="button" class="btn btn-default button_details_booknow" onclick="book_details_search('InterContinental','Adelaide(CBD)',550)">Book Now</button> \
              <div style="clear:both;"></div> \

              <p class="imageinfo"><img src="images/hotel2.jpg" alt="Hotel 2" class="hotels"><strong>Name: </strong> Hilton <br> <strong>Stars:<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></strong><br> <strong>Price: </strong>$380 per night<br> <strong>Location: </strong>Adelaide (CBD)</p> \
              <button type="button" class="btn btn-default button_details_booknow" onclick="details('Hilton','Adelaide(CBD)',380,'images/hotel2.jpg')">Details</button> \
              <button type="button" class="btn btn-default button_details_booknow" onclick="book_details_search('Hilton','Adelaide(CBD)',380)">Book Now</button> \
              <br> \
            </div> \
          </div> \
        </div> \
        <button type="button" name="button" class="btn btn-default back_button" onclick="back_button_hotels()">Back</button> \
      </div> \

      <!-- FOOTER --> \
      <footer class="container-fluid text-center"> \
        <p>Footer Text</p> \
      </footer> \

    </body> \
  </html> \
  '
);

});
module.exports = router;
