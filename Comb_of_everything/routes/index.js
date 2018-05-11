var express = require('express');
var router = express.Router();
var CLIENT_ID = '584993438587-ooj1akeui4rsb2g96aphfcs7497tnvoq.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);
var prev_pages = [];
var current_page = '/';
var logged_in = false;



/* GET home page. */
router.get('/', function(req, res, next) {
	prev_pages.push(current_page);
	current_page = "Home.html";
	res.redirect("Home.html");
});
/// OPEN ID
var next_user = 0;
var uniqueID = 0;
var empty_user = {"uID" : 0, "fname":"", "lname":"", "dob":"", "email":"", "pwd":"", "tel":""};
var users =[empty_user, {'username': "sofia", 'password': "cool", 'google': "102998056835987459663"}];
var sessions = {};

//LOGIN SIGNUP

router.get('/logged_in_query', function(req, res) {
	var to_send;
	if (logged_in && req.session.current_user) {
		to_send = {valid:"true", name:req.session.current_user.fname}
	} else {
		to_send = {"valid":"false", "name":0}
	}
	res.send(JSON.stringify(to_send));
});

router.get('/Logout', function(req, res) {
	req.session.current_user = 0;
	logged_in = false;
	res.redirect("/")
});




// IDEK
router.post('/login', function(req, res) {
	console.log(req.body);
	if (req.body.idtoken !== undefined){
		logged_in = true;
		console.log("Google token received");
		async function verify() {
			const ticket = await client.verifyIdToken({
    		idToken: req.body.idtoken,
    		audience: CLIENT_ID
			});
  		const payload = ticket.getPayload();
  		const userid = payload['sub'];
			for (var i = 0; i < users.length; i++){
				if (users[i].google === userid){
					req.session.current_user = users[i].username;
					user = users[i].username;
					res.redirect("LoginSignupRedirect");
				}
			}
			var new_user = {'google': userid, 'fname': req.body.fname};
			users.push(new_user);
			req.session.current_user = new_user;
			console.log(users);
			res.redirect("LoginSignupRedirect")
		}
		verify().catch(console.error);
	}

	else {
		// password does not match username
		res.redirect("Login.html" /* passwd does not match email... how to display message? */);
	}
	/*else {
		// no matching username
		res.redirect("login.html");
	}*/
});


var next_user = 0;
var uniqueID = 0;
var empty_user = {"uID" : 0, "fname":"", "lname":"", "dob":"", "email":"", "pwd":"", "tel":""};
var users =[empty_user];

// HOME PAGE
router.get('/', function(req, res, next) {
  prev_pages.push(current_page);
  current_page = "Home.html";
	res.redirect("Home.html");
});
// MAP PAGE
router.get('/Map', function(req,res) {
  prev_pages.push(current_page);
	current_page = "Map.html";
	res.redirect("Map.html");
});



// DO WE GO TO LOGIN SIGNUP PAGE
router.get('/LoginSignupQuery', function(req, res){
  // if we are logged in
  if (logged_in == true){
    prev_pages.push(current_page);
    current_page = "Confirmation.html";
    res.redirect("Confirmation.html");
  }
  prev_pages.push(current_page);
  current_page = "LoginSignup.html";
  res.redirect("/LoginSignup");


});
// LOGINSIGNUP PAGE
router.get('/LoginSignup', function(req, res){
  prev_pages.push(current_page);
  //console.log("LoginSignup Page: "+prev_pages);
  current_page = "LoginSignup.html";
  res.redirect("LoginSignup.html");
});
// LOGIN PAGE
router.get('/Login', function(req, res){
  prev_pages.push(current_page);
  //current_page = "Login.html";
  res.redirect("Login.html");
});
//SIGNUP PAGE
router.get('/Signup', function(req, res){
  prev_pages.push(current_page);
  //current_page = "Signup.html";
  res.redirect("Signup.html");
});
router.get('/HotelDetails', function(req, res){
  prev_pages.push(current_page);
  current_page = "HotelDetails.html";
  res.redirect("HotelDetails.html");
});


// DONT NEED EITHER OF THESE
router.get('/BookingDetails', function(req, res) {
	prev_pages.push(current_page);
	current_page = "BookingDetails.html";
	res.redirect("BookingDetails.html");
});
// DONT NEED EITHER OF THESE
// router.get('/SearchHotels', function(req, res) {
//   prev_pages.push(current_page);
// 	current_page = "SearchHotels.html";
// 	res.redirect("SearchHotels.html");
// });



// BACK BUTTON
router.get('/back', function(req,res) {
	console.log("back: " + prev_pages);
	current_page = prev_pages[prev_pages.length-1];
	prev_pages.splice(-1,prev_pages.length-1);
  // checks if previous pages are identical
  if (current_page == prev_pages[prev_pages.length-1]){
    prev_pages.splice(-1,prev_pages.length-1);
  }
  if (current_page == undefined){
    res.redirect('/');
  }
	res.redirect(current_page);
  // ADD FUNCTION IF UNDEFINED GO TO HOME

});




router.post('/LoginSignupRedirect', function(req,res) {
  logged_in = true;
  if (current_page=="LoginSignup.html"){
    res.redirect("Confirmation.html");
  }
	res.redirect(prev_pages[prev_pages.length - 1]);
  //res.redirect(current_page);

});

// router.post('/login', function(req, res) {
// 	sess = req.session;
// 	if (check_names(req.body.email)) {
// 		if (check_password(req.body)) {
// 			// password matches username
// 			// add user to session
// 			sess.user = get_user_from_email(req.body.email);
// 			res.redirect(prev_pages[prev_pages.length - 1]);
// 		} else {
// 			// password does not match username
// 			res.redirect("login.html" /* passwd does not match email... how to display message? */);
// 		}
// 	} else {
// 		// no matching username
// 		res.redirect("login.html");
// 	}
// });

function check_email(given_email) {
	// iterate through users
	for (var i = 0; i < users.length; i++) {
		// if any match return true
		if (users[i].email == given_name) {
			return true;
		}
	}
	// if none pass, return false
	return false;
}

function get_user_from_email(email) {
	// iterate through users
	for (var i = 0; i < users.length; i++) {
		// if any match return the user
		if (users[i].email == given_name) {
			return users[i];
		}
	}
}

function check_password(given_user) {
	for (var i = 0; i < users.length; i++) {
		// if any match return true

		if (users[i].email == given_user.email) {
			if (users[i].pwd == given_user.pwd) {
				return true;
			} else {
				return false;
			}
		}
	}
	return false;
}

var InterContinental = {
  name:"InterContinental",
  location: {lat: -34.9212 , lng: 138.6059},
  city: "Adelaide",
  price: 550,
  features: [0,1,2,3,4,5,6],
  stars: 4,
  img_src: 'images/hotel1.jpg',
  description: "Exclusively positioned on the banks of the River Torrens, InterContinental Adelaide provides luxury city centre accommodation, dining and meeting facilities. Situated adjacent to the Adelaide Festival Centre, Convention Centre, Casino and directly opposite the spectacular Adelaide Oval, our location provides effortless exploring and entertainment at your fingertips."
};

var Hilton = {
  name: "Hilton",
  location: {lat: -34.929143, lng: 138.598906},
  city: "Adelaide",
  price: 330,
  features: [0,1,3,4],
  stars: 4,
  img_src: 'images/hotel2.jpg',
  description: "Overlooking Victoria Square, Hilton Adelaide is set in the heart of the city’s entertainment, shopping and dining precincts. The Central Market, Chinatown and Gouger Street - Adelaide’s most vibrant dining destinations – are also minutes away."
};

router.get('/SearchQuery', function(req, res) {
	prev_pages.push(current_page);
	// var key = document.getElementById;
	current_page = "SearchHotels.html?searchTerm=" + req.query.searchTerm;
	res.redirect(current_page);
});

var all_hotels = [InterContinental, Hilton];
var searchedHotels = [];
router.get('/SearchHotels', function(req, res) {
	console.log(req.query.searchTerm)
	searchedHotels = hotels_from_search(req.query.searchTerm);

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

  res.send(div_content);
});

function write_stars(n) {
	var stars = "";
	var i = 0;
	while (i<n) {
		stars += "<i class='fa fa-star'></i>";
		i++;
	}
	return stars;
}

var features = ["wifi", "pool", "spa", "undercover parking", "restaurant", "balcony", "etc"];

function write_features(feature_list) {
	var new_list = [];
	for (var i = 0; i < feature_list.length; i ++) {
		new_list.push(features[feature_list[i]]);
	}

	return new_list;
}
function hotels_from_search(search_word) {
	var new_list=[];
	for (var i = 0 ; i < all_hotels.length; i ++) {

		if (all_hotels[i].city == search_word) {
			new_list.push(all_hotels[i]);
		}
	}
	//return new_list;
  return new_list;
}




/////////////////////////////////  MANAGEMENT ///////////////////////////////

var FirstHotel = {
	username:"a",
	password:"a",
	numRooms:59,
	hotelName:"InterContinental",
	address:"Adelaide",
	price:550,
	stars:4

};
var SecondHotel = {
	username:"SecondHotel",
	password:"SecondHotel",
	numRooms:20,
	hotelName:"Hilton",
	address:"Adelaide",
	price:330,
	stars:4
};

var HotelManagementDetails=[FirstHotel, SecondHotel];

router.post("/ManagemntLoginCheck", function(req, res){
	prev_pages.push(current_page);
	current_page = "HotelManagementLogin.html";
	var username = req.body.username;
	var password = req.body.password;
	console.log(username + " " + password);
	for (var i = 0; i < HotelManagementDetails.length; i ++){
		if (HotelManagementDetails[i].username == username && HotelManagementDetails[i].username == password){
			res.redirect("HotelCurrentStatus.html");
		}
	}
	res.redirect("HotelManagementLogin.html");


});









// HOTEL MANAGEMENT LOGIN PAGE
router.get('/HotelManagementLogin', function(req, res){
  prev_pages.push(current_page);
  current_page = "HotelManagementLogin.html";
  res.redirect("HotelManagementLogin.html");
});

// HOTEL MANAGEMENT CURRENT STATUS
router.get('/HotelCurrentStatus', function(req, res){
  // if back button is pressed here we only want to go back to
  // the home page (becase they must have logged in or signed up)
  prev_pages.push("/");
  current_page = "HotelCurrentStatus.html";
  res.redirect("HotelCurrentStatus.html");
});
// HOTEL MANAGEMENT
router.get('/HotelManagement', function(req, res){
  prev_pages.push(current_page);
  current_page = "HotelManagement.html";
  res.redirect("HotelManagement.html");
});


///////// MANAGE MY ACCOUNT //////////





module.exports = router;
