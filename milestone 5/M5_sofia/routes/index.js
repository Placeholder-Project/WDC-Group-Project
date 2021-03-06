var express = require('express');
var router = express.Router();
var CLIENT_ID = '584993438587-ooj1akeui4rsb2g96aphfcs7497tnvoq.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);
var prev_pages = [];
var current_page = '/';
var logged_in = false;
var number_adults;
var number_children;
var date_arrival;
var date_departure;
var search_index;
var bookings = [];
var temp_hotel_id;
var create_new = false;
/// OPEN ID
var next_user = 1;
var uniqueID = 0;
var empty_user = {"uID" : 0, "fname":"", "lname":"", "dob":"", "email":"", "pwd":"", "tel":"","hotel":"","location":"","n_nights":"", "n_adults":"", "n_children":"","arr_date":"","dep_date":"","price_total":"","hotel_id":""};
var users =[{'fname':"sofia", "email":"sofia@g", 'pwd': "cool", 'google': "102998056835987459663","hotel":"Magical Hotel","location":"Magical Land","n_nights":"5", "n_adults":"1", "n_children":"0","arr_date":"05/05/2000","dep_date":"05/06/2000","price_total":"$1","hotel_id":"00000000"}];
var B_id = 1;
function newUser(results)
{
	if (results.length == 0)
	{
		create_new = true;
	}
}

router.post('/login', function(req, res) {
	var req_object = req.body;
	if (req_object.idtoken !== undefined){
		console.log("Google token received");
		async function verify() {
			const ticket = await client.verifyIdToken({
    		idToken: req_object.idtoken,
    		audience: CLIENT_ID
			});
  		const payload = ticket.getPayload();
  		const userid = payload['sub'];
			var object = {
				email: ''+req_object.email+'',
				fname: ''+req_object.fname+'',
				lname: ''+req_object.lname+'',
				google: ''+userid+''
			}
			req.session.current_user = object;
			console.log(req.session.current_user);
			req.pool.getConnection(function(err,connection) {
					if (err) { throw err;}
					var query = "SELECT * FROM Users WHERE email = '"+req_object.email+"'";
					connection.query(query, function(err, results){
						/*Some actions to handle the query results*/
						newUser(results);
						console.log("Logged in!");
						connection.release(); // release connection
						});
						if (create_new) {
							console.log("New user signed up!")
							req.pool.getConnection(function(err,connection) {
									if (err) { throw err;}
									var query = "INSERT INTO Users (email,fname,lname,GID) VALUES ('"+req_object.email+"', '"+req_object.fname+"', '"+req_object.lname+"', '"+userid+"')";
									connection.query(query, function(err, results){
										/*Some actions to handle the query results*/
										console.log("Signed up!")
										connection.release(); // release connection
										});
							});
						}
			});

			// if we dont have a matching user, create a new user and log them in

			logged_in = true;
			res.redirect("LoginSignupRedirect");
		}
		verify().catch(console.error);
	}
	//res.redirect("Login.html");

});


router.post('/Confirmation', function(req, res) {
	// TODO: send data to server
	prev_pages.push(current_page);
	current_page = "Confirmation.html";
	res.redirect('Home.html');
});


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


// LOGINSIGNUPREDIRECT IS OBSELETE AND REPLACED WITH LOGINREDIRECT AND SIGNUPREDIRECT
// DO WE GO TO LOGIN SIGNUP PAGE
router.get('/LoginSignupQuery', function(req, res){
	prev_pages.push(current_page);
  // if we are logged in
  if (logged_in){
    res.redirect("Confirmation.html");
  }
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
  current_page = "HotelDetails.html?hotel_id="+req.query.hotel_id;
  res.redirect(current_page);
});

router.get('/Confirmation', function(req, res){
  prev_pages.push(current_page);
  current_page = "Login.html";
  res.redirect("Confirmation.html");
});

router.get('/LoginSignupRedirect', function(req, res) {
	logged_in = true;
     if (current_page=="LoginSignup.html"){
       res.redirect("Confirmation.html");
       return;
     }
     res.redirect(prev_pages[prev_pages.length - 1]);
});

var isRegLoggedIn = false;

function regLogin(count)
{
	if (count != 0)
	{
		isRegLoggedIn = true;
		return;
	}
	console.log("wrong");
	isRegLoggedIn = false;
	return;
}

router.post('/LoginRedirect', function(req, res) {
	console.log(req.body.email + " with " + req.body.pwd);
	var object = {
		email: ''+req.body.email+'',
	}
	req.session.current_user = object;
	req.pool.getConnection(function(err,connection) {
			if (err) { throw err;}
			var query = "SELECT * FROM Users WHERE email = '"+req.body.email+"' AND pwd = '"+req.body.pwd+"'";
			connection.query(query, function(err, results){
				/*Some actions to handle the query results*/
				if (results.length != 0)
				{
					console.log("Logged in!");
				}
				regLogin(results.length);
				res.redirect('loginCheck');
				connection.release(); // release connection
				});
		});
});

router.get('/loginCheck', function(req,res) {
	if (isRegLoggedIn == false)
	{
		console.log("wrong username/password");
		res.redirect("Login.html");
	}
	else
	{
		logged_in = true;
	}
	if (prev_pages[prev_pages.length - 1] != "LoginSignup.html" && isRegLoggedIn == true){
		res.redirect(prev_pages[prev_pages.length - 1]);
	}
	else if (isRegLoggedIn == true){
		res.redirect("Confirmation.html");
	}
	return;
});

router.post('/SignupRedirect', function(req, res) {
	var new_user = {"fname":req.body.fname, "email":req.body.email};
	req.session.current_user = new_user;
	users.push(new_user);
	logged_in = true;
	req.pool.getConnection(function(err,connection) {
			if (err) { throw err;}
			var query = "INSERT INTO Users (email, Fname, Lname, dob, phone, pwd) VALUES ('"+req.body.email+"', '"+req.body.fname+"', '"+req.body.lname+"', '"+req.body.dob+"', '"+req.body.number+"', '"+req.body.pwd+"')";
			connection.query(query, function(err, results){
				/*Some actions to handle the query results*/
				connection.release(); // release connection
				});
		});
	isRegLoggedIn = true;
	res.redirect('loginCheck');
});
// EDIT USERS BOOKING DETAILS
router.post('/confirmation_sent',function(req, res){
	console.log(req.body);
	var details_object = req.body;
	var hotel = details_object.hotel;
	var location = details_object.location;
	var n_nights = details_object.n_nights;
	var n_adults = details_object.n_adults;
	var n_children = details_object.n_children;
	var arr_date = details_object.arr_date;
	var dep_date = details_object.dep_date;
	var price_total = details_object.price_total;
	req.session.current_user.hotel = hotel;
	req.session.current_user.location = location;
	req.session.current_user.n_nights = n_nights;
	req.session.current_user.n_adults = n_adults;
	req.session.current_user.n_children = n_children;
	req.session.current_user.arr_date = arr_date;
	req.session.current_user.dep_date = dep_date;
	req.session.current_user.price_total = price_total;
});

router.get('/gohome', function(req, res) {
	prev_pages.push(current_page);
	current_page = "/";
	res.redirect("/");
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
	console.log("back: " + prev_pages.join(" > "));
	if (current_page == prev_pages[prev_pages.length-1]){
		prev_pages.splice(-1,prev_pages.length-1);
	}

	current_page = prev_pages[prev_pages.length-1];
	prev_pages.splice(-1,prev_pages.length-1);
  // checks if previous pages are identical
	console.log("current_page: "+current_page);
	console.log("next page: "+prev_pages[prev_pages.length-1]);
  while (current_page == prev_pages[prev_pages.length-1]){
		console.log("pages: "+ current_page);
    prev_pages.splice(-1,prev_pages.length-1);
  }
	if (prev_pages[prev_pages.length-1] == prev_pages[prev_pages.length-2]){
    prev_pages.splice(-1,prev_pages.length-1);
	}
  if (current_page == undefined){
    res.redirect('/');
		return
  }
  res.redirect(current_page);

});




router.post('/LoginSignupRedirect', function(req, res) {
  logged_in = true;
  // TODO: create user from form data
  if (current_page=="LoginSignup.html"){
    res.redirect("Confirmation.html");
    return;
  }
  res.redirect(prev_pages[prev_pages.length - 1]);
  //res.redirect(current_page);

});



function check_email(given_email) {
	// iterate through users
	for (var i = 0; i < users.length; i++) {
		// if any match return true
		if (users[i].email == given_email) { //CHANGED
			return true;
		}
	}
	// if none pass, return false
	return false;
}

function get_user_from_email(given_email) {
	// iterate through users
	for (var i = 0; i < users.length; i++) {
		// if any match return the user
		if (users[i].email == given_email) {
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
  description: "Exclusively positioned on the banks of the River Torrens, InterContinental Adelaide provides luxury city centre accommodation, dining and meeting facilities. Situated adjacent to the Adelaide Festival Centre, Convention Centre, Casino and directly opposite the spectacular Adelaide Oval, our location provides effortless exploring and entertainment at your fingertips.",
	hotel_id : '1'
};

var Hilton = {
  name: "Hilton",
  location: {lat: -34.929143, lng: 138.598906},
  city: "Adelaide",
  price: 330,
  features: [0,1,3,4],
  stars: 4,
  img_src: 'images/hotel2.jpg',
  description: "Overlooking Victoria Square, Hilton Adelaide is set in the heart of the city’s entertainment, shopping and dining precincts. The Central Market, Chinatown and Gouger Street - Adelaide’s most vibrant dining destinations – are also minutes away.",
	hotel_id : '2'
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

	req.pool.getConnection(function(err,connection){
		if (err) {throw err;}
		// select everything from hotels where the location matches the search
		var sql = "SELECT * FROM Hotels WHERE location = '"+req.query.searchTerm+"';";
		connection.query(sql, function(err, results){
			var t = 0;
			while (results[t]!=undefined){
				searchedHotels.push(results[t]);
				t++;
			}
			var div_content='';
			for (var i = 0; i < searchedHotels.length; i++) {
				div_content += '<link rel="stylesheet" type = "text/css" href="stylesheets/placeholder.css"> \
							<script src="javascripts/placeholder.js"></script> \
							<p class="imageinfo"><img style = "width: 30%;float:left;display: inline-block;margin: 0px 10px 10px 0px;" src='+searchedHotels[i].photos+ " " +
							'alt="Hotel '+i+ " " +
							'class="hotels"><strong>Name: </strong> '+searchedHotels[i].hotel_name+
							'<br> <strong>Stars: '+write_stars(searchedHotels[i].stars)+
							'</strong><br> <strong>Price: </strong>$'+searchedHotels[i].cost_per_night+
							'per night<br> <strong>Location: </strong>'+searchedHotels[i].location+
							'</p><p>'+ write_features(searchedHotels[i].features).join(" | ") +'</p> \
							<form action="/HotelDetails" method="get">\
								<input type="hidden" name="hotel_id" value="'+searchedHotels[i].hotel_id+'" /> \
								<button type="submit" class="btn btn-default button_details_booknow">Details</button>\
							</form>\
							<form action="/BookingDetails" method="get">\
								<button type="submit" onclick = "store_name_price(\''+searchedHotels[i].hotel_name+'\', \''+searchedHotels[i].cost_per_night+'\', \''+searchedHotels[i].location+'\', \''+searchedHotels[i].hotel_id+'\')" class="btn btn-default button_details_booknow">Book Now</button>\
							</form>\
							<div style="clear:both;"></div>';
			}

			res.send(div_content);
			searchedHotels = [];
			connection.release();
		});
	});
});

// Send hotel info and it is written in to HotelDetails.html
router.get('/HotelDetailsWrite', function(req, res) {
	req.pool.getConnection(function(err,connection){
		if (err) {throw err;}
		// select everything from hotels where the location matches the search
		var sql = "SELECT * FROM Hotels WHERE hotel_id = "+req.query.hotel_id+";";
		connection.query(sql, function(err, results){
			var page = '<br>\
			<h1>'+results[0].hotel_name+'</h1>\
			<p class="imageinfo"><img src="'+results[0].photos+'" alt="Hotel '+results[0].hotel_id+'" class="hotels">\
			  <strong>Stars:'+write_stars(results[0].stars)+'</strong> \
			  <br><strong>Price: </strong> $ '+results[0].cost_per_night+' per night \
			  <br><strong>Location: </strong> '+results[0].location+' \
			  <br><strong>Other info: </strong> '+results[0].description+' \
			  <br>'+write_features(results[0].features).join(" | ")+' \
			</p>\
			<form action="/BookingDetails" method="get">\
				<button type="submit" onclick = "store_name_price(\''+results[0].hotel_name+'\', \''+results[0].cost_per_night+'\', \''+results[0].location+'\', \''+results[0].hotel_id+'\')" class="btn btn-default button_details_booknow">Book Now</button>\
			</form>';
			res.send(page);
			connection.release();
		});
	});
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
	console.log("****"+search_word);
	var new_list=[];
	for (var i = 0 ; i < all_hotels.length; i ++) {

		if (all_hotels[i].city == search_word) {
			new_list.push(all_hotels[i]);
		}
	}
	//return new_list;
  return new_list;
}

router.post('/mapSearch', function (req,res) {
	var object = req.body;
	req.pool.getConnection(function(err,connection){
		if (err) {throw err;}
		var sql = "SELECT * FROM Hotels WHERE location = '"+object.search_word+"';";
		connection.query(sql, function(err, results){
			res.send((results));
			console.log("PPPP"+results[0].hotel_name);
			connection.release();
		});
	});
});

//
// router.post('/StoreNamePrice', function(req, res) {
// 	var object = (req.body);
// 	console.log(req.body);
// 	temp_hotel_name = object.hotel_name;
// 	temp_hotel_price = object.hotel_price;
// 	temp_hotel_city = object.location;
// 	temp_hotel_id = object.hotel_id;
// 	prev_pages.push(current_page);
// 	current_page = "BookingDetails.html";
// 	res.redirect("BookingDetails.html");
// });


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


///// writing to log in / signup div /////

router.get('/logged_in_query', function(req, res) {
	var to_send;
	if (logged_in) {
		console.log("User: " +req.session.current_user.email);
		to_send = {valid:"true", name:req.session.current_user.email};
	} else {
		to_send = {"valid":"false", "name":"false"};
	}
	console.log(to_send);
	res.send(JSON.stringify(to_send));
});

router.get('/Logout', function(req, res) {
	if (req.session.current_user.google != undefined)
	{
		req.session.current_user = 0;
		logged_in = false;
		res.redirect("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/");
	}
	req.session.current_user = 0;
	logged_in = false;
	res.redirect("/")
});


////////////////////////////// HOTEL MANAGEMENT //////////////////////////////

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


/////////////////////////////// MANAGE MY ACCOUNT ////////////////////////////////
router.get('/ManageAccount', function(req, res){
	prev_pages.push(current_page);
	current_page = "ManageAccount.html";
	prev_pages.push(current_page);
	res.redirect("ManageAccount.html");
});

router.post('/ChangeMyDetails', function(req,res){
	const currentUserEmail = req.session.current_user.email;
	console.log("currentusermeail:"+currentUserEmail)
	req.pool.getConnection(function(err,connection) {
			if (err) { throw err;}
			var query = "UPDATE Users SET Fname='"+req.body.fname+"',Lname='"+req.body.lname+"',dob='"+req.body.dob+"',phone='"+req.body.number+"',pwd='"+req.body.pwd+"' WHERE email = '"+currentUserEmail+"'";
			connection.query(query, function(err, results){
				/*Some actions to handle the query results*/
				connection.release(); // release connection
				});
		});
	isRegLoggedIn = true;
	var new_user = {"fname":req.body.fname, "email":req.session.current_user.email};
	req.session.current_user = new_user;
	logged_in = true;
	res.redirect("Home.html");
});

router.get('/ChangeMyDetailsPage', function(req,res){
	prev_pages.push(current_page);
	res.redirect("ChangeMyDetails.html");
});
router.get('/ViewMyBookings', function(req,res){
	res.redirect("ViewMyBookings.html");
});


///////////////BOOKING/////////////////

router.post('/StoreHotelDetails', function(req, res) {
	// if we are logged in
	number_adults = req.body.adult_number;
	number_children = req.body.child_number;
	date_arrival = req.body.from_date;
	date_departure = req.body.to_date;
	if (logged_in == true) {
		prev_pages.push(current_page);
		current_page = "Confirmation.html";
		res.redirect("Confirmation.html");
	}
	else {
		prev_pages.push(current_page);
		current_page = "LoginSignup.html";
		res.redirect("/LoginSignup");
	}
});

var temp_hotel_name;
var temp_hotel_price;

router.post('/StoreNamePrice', function(req, res) {
	var object = (req.body);
	temp_hotel_name = object.hotel_name;
	temp_hotel_price = object.hotel_price;
	temp_hotel_city = object.location;
	temp_hotel_id = object.hotel_id;
	prev_pages.push(current_page);
	current_page = "BookingDetails.html";
	res.redirect("BookingDetails.html");
});













///////////********************************* THINGS SOFIA HAS ALTERED **************************************/////////




function days_between(t1, t2) {
	var cd = 24 * 60 * 60 * 1000,
	    d1 = Math.floor(t1 / cd),
	    d2 = Math.floor(t2 / cd);
	return (d2-d1);
}
////// CUSTOMER BOOKING PAGE ////////
function assign_number_nightsMy(from,to) {

	var t1 = toDateMy(from);
	var t2 = toDateMy(to);
	return days_between(t1,t2);
}
function toDateMy(s) {
	// splits up date string
	var b = s.split("-");
	// uses these values to become dates
	return new Date(b[0], --b[1], b[2]);
}

router.get('/fillMyBookings',function(req,res){
	var usersBookings = [];
	req.pool.getConnection(function(err,connection){
		if (err) {throw err;}
		var user_email = req.session.current_user.email;
		console.log(user_email);
		//var sql = "SELECT * FROM Bookings WHERE email = '"+user_email+"';";
		var sql = "SELECT * FROM Bookings LEFT JOIN Hotels ON Bookings.hotel_id = Hotels.hotel_id WHERE email = '"+user_email+"';";
		//var sql = "SELECT * FROM Bookings WHERE email = 'sofia@g';";
		connection.query(sql, function(err, results){
			var t = 0;
			while (results[t]!=undefined){
				usersBookings.push(results[t]);
				t++;
			}
			var div_content='';
			for (var i = 0; i < usersBookings.length; i++) {
				var nights = assign_number_nightsMy(usersBookings[i].arrival,usersBookings[i].departure);
				div_content +=
				          '<ul class="list-group">\
				            <li class="list-group-item">Hotel:		<span id="hotel_name">'+usersBookings[i].hotel_name+'</span></li>\
				            <li class="list-group-item">Location:			<span id="loc">'+usersBookings[i].location+'</span></li>\
				            <li class="list-group-item">Number of Nights:			<span id="n_nights">'+nights+'</span></li>\
				            <li class="list-group-item">Number adults:			<span id="n_adults">'+usersBookings[i].no_adults+'</span></li>\
				            <li class="list-group-item">Number children: 		<span id="n_children">'+usersBookings[i].no_children+'</span></li>\
				            <li class="list-group-item">Date of arrival:		<span id="arr_date">'+usersBookings[i].arrival+'</span></li>\
				            <li class="list-group-item">Date of departure:	<span id="dep_date">'+usersBookings[i].departure+'</span></li>\
				            <li class="list-group-item"><strong>TOTAL PRICE:	</strong><span id="price_total">'+'$'+usersBookings[i].cost_per_night*nights+'</span></li>\
				          </ul>\
										<button type="submit" class="btn btn-default" onclick="deleteBookingID('+usersBookings[i].booking_id+')">Delete Booking</button>\
									<br>\
									<br>'
			}
			res.send(div_content);
			connection.release();
		});
	});
});



router.post("/DeleteBooking", function(req, res){
	var object = (req.body);
	var id = object.book_id;
	console.log("********** "+ id);
	req.pool.getConnection(function(err,connection){
		if (err) {throw err;}
		var sql = "DELETE FROM Bookings WHERE booking_id = "+id+";";
		connection.query(sql, function(err, results){
			connection.release();
		});
	});
});






///////////********************************* THINGS SOFIA HAS ALTERED FINISH **************************************/////////



























router.get('/fillHotelDetails', function(req, res) {
	console.log(number_adults);
	var details_object = {
		'hotel_name': temp_hotel_name,
		'price': temp_hotel_price,
		'location': temp_hotel_city,
		'adult_number': number_adults,
		'child_number': number_children,
		'from_date': date_arrival,
		'to_date': date_departure
	}
	res.send(details_object);
});

function assign_number_nights(from,to) {
	var t1 = toDate(from),
	    t2 = toDate(to);
	number_nights = days_between(t1,t2);
}

function toDate(s) {
	// splits up date string
	var b = s.split(/\D/);
	// uses these values to become dates
	return new Date(b[0], --b[1], b[2]);
}

function days_between(t1, t2) {
	var cd = 24 * 60 * 60 * 1000,
	    d1 = Math.floor(t1 / cd),
	    d2 = Math.floor(t2 / cd);
	return (d2-d1);
}


router.get('/confirm_booking', function(req, res) {
	assign_number_nights(date_arrival, date_departure);
	var id;
	if (req.session.current_user.google !== undefined)
	{
		id = req.session.current_user.google;
	}
	else
	{
		id = req.session.current_user.username;
	}

	// add new booking to database
	// add new booking to database
	req.pool.getConnection(function(err,connection){
		if (err) {throw err;}
		var user_email = req.session.current_user.email;
		var h_id = '0';
		console.log("&&&&&&&&&&&&&&&&&&"+ B_id);
		var sql = "INSERT INTO Bookings (email,arrival,departure,no_adults,no_children,hotel_id,location,booking_id) VALUES('"+user_email+"','"+date_arrival+"','"+date_departure+"','"+number_adults+"','"+number_children+"','"+temp_hotel_id+"','"+temp_hotel_city+"','"+B_id+"');";
		B_id++;
		connection.query(sql, function(err, results){
			console.log(err);
			connection.release();
		});
	});
	var booking_object = {
		'id': id,
		'hotel_name': temp_hotel_name,
		'price': temp_hotel_price,
		'location': temp_hotel_city,
		'adult_number': number_adults,
		'child_number': number_children,
		'from_date': date_arrival,
		'to_date': date_departure,
		'n_nights': number_nights,
		'price_total': temp_hotel_price * number_nights
	}
	bookings.push(booking_object);
	console.log(bookings);
	res.redirect('/'); //make a "thank you for booking with us page"?
});


var user_bookings;
router.post('/get_booking_details', function(req, res) {
	user_bookings = req.body;
	console.log(req.body);
	res.send(bookings);
});

router.get('/send_booking_details', function(req, res) {
	res.send(user_bookings);
});


module.exports = router;
