var hotel_name;
var hotel_location;
var number_adults;
var number_children;
var date_arrival;
var date_departure;
var total_price;
var price;
var number_nights;
var Placename;
var Locations;
var Hotelprice;
// storing last page before signup/login page
var page_before_login_signup;
// storing "map", "search", or "details" for back buttons
var previous_map_or_search_or_details;
// details page going back to search results or maps
var details_to_map_or_search;
// if login/signup button was pressed
var l_s;
//if submitted login/signup Details
var submit_l_s;

//  PLACES IN THIS AREA
function book_details_search(hotel, location, night_price){
  previous_map_or_search_or_details = "search";
  book_details(hotel, location, night_price);
  $("#booking_your_hotel_div").show();
}
function book_details(hotel, location, night_price){
  hotel_name = hotel;
  hotel_location = location;
  price = night_price;
  $("#places_and_area_div").hide();
  $("#booking_your_hotel_div").show();
}

////////////////// NUMBER OF PEOPLE AND DATE PAGE //////////////////
function submit_details(){
  alert(1);
  /*number_adults = $("#adult_number option:selected").text();
  number_children = $("#child_number option:selected").text();
  date_arrival = $("#from_date").val();
  date_departure = $("#to_date").val();*/
  number_adults = document.getElementById("adult_number").value;
}
function signup(){
  $("#lets_book_this_div").hide();
  $("#signup_div").show();
}
function login(){
  $("#lets_book_this_div").hide();
  $("#login_div").show();
}
function submit_signup(){
  if (l_s==1){
    $("#signup_div").hide();
    $("#"+page_before_login_signup).show();
  }
  else{
    $("#signup_div").hide();
    $("#confirmation_div").show();
    write_confirmation();
  }
  submit_l_s = 1;

}
function submit_login(){
  if (l_s==1){
    $("#login_div").hide();
    $("#"+page_before_login_signup).show();
  }
  else{
    $("#login_div").hide();
    $("#confirmation_div").show();
    write_confirmation();
  }
  submit_l_s = 1;

}

function write_confirmation() {
	// write in to the spans of given id with corr. variables
  alert(1);
  /*
	$("#hotel_name").html(hotel_name);
	$("#loc").html(hotel_location);
  assign_number_nights();
  total_price=price*number_nights;
	$("#n_nights").html(number_nights);
	$("#n_adults").html(number_adults);
	$("#n_children").html(number_children);
	$("#arr_date").html(date_arrival);
	$("#dep_date").html(date_departure);
	$("#price_total").html("$"+total_price);
  */
  document.getElementById("n_adults").innerHTML = number_adults;
}


////////////////// NUMBER OF NIGHTS CALCULATOR //////////////////

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



////////////////// BACK BUTTONS //////////////////


function back_button_hotels(){
  $("#places_and_area_div").hide();
  $("#search_div").show();
}
function back_button_booking_details(){
  $("#booking_your_hotel_div").hide();
  if (previous_map_or_search_or_details == "map"){
    $("#maps_div").show();
  }
  else if (previous_map_or_search_or_details == "search"){
    $("#places_and_area_div").show();
  }
  else{
    $("#hotel_details_div").show();
  }

}
function back_button_login_signup(){
  $("#lets_book_this_div").hide();
  $("#booking_your_hotel_div").show();
}
function back_button_signup(){
  if (l_s==1){
    $("#"+page_before_login_signup).show();
  }
  else{
    $("#lets_book_this_div").show();
  }
  $("#signup_div").hide();
}
function back_button_login(){
  if (l_s==1){
    $("#"+page_before_login_signup).show();
  }
  else{
    $("#lets_book_this_div").show();
  }
  $("#login_div").hide();
}
function back_button_confirmation(){
  $("#confirmation_div").hide();
  if (submit_l_s==1){
    $("#booking_your_hotel_div").show();
  }
  else{
    $("#lets_book_this_div").show();
  }
}

function back_button_hotel_details(){
  $("#hotel_details_div").hide();
  if (details_to_map_or_search == "map"){
    $("#maps_div").show();
  }
  else{
    $("#places_and_area_div").show();
  }
}



////////////////// OTHER BUTTONS //////////////////

function search_page_search_button(){
  $("#search_div").hide();
  $("#places_and_area_div").show();
}

function go_home(){
  var current_page = $("div.feature_page").not(":hidden").prop("id");
  $("#"+current_page).hide();
  $("#signup_div, #login_div").hide();
  $("#search_div").show();
}
function signup_button(){
  //stores the id of the previous page
  page_before_login_signup = $("div.feature_page").not(":hidden").prop("id");
  $("div.feature_page").hide();
  $("#signup_div").show();
  l_s = 1;

}
function login_button(){
  //stores the id of the previous page
  page_before_login_signup = $("div.feature_page").not(":hidden").prop("id");
  $("div.feature_page").hide();
  $("#login_div").show();
  l_s = 1;
}

function go_to_maps(){
  //stores the id of the previous page
  $("#search_div").hide();
  $("#maps_div").show();

}



// for details page
var misc_attr = ["wifi", "pool", "spa", "undercover parking", "restaurant", "balcony", "etc"];
function write_misc_info() {
  document.querySelector("#misc_info").innerHTML =
  [misc_attr[0], misc_attr[2], misc_attr[4]].join(" : ");
}

// fill in areas of each hotel independantly

function details(placename,location,price,img){
  details_to_map_or_search = "search";
  Placename=placename;
  Locations=location;
  Hotelprice=price;
  $("#places_and_area_div").hide();
  $("#hotel_details_div").show();
  $("#image_details").attr("src",img);
  $("#name_details").html(placename);
  $("#price_details").html("$"+price);
  $("#location_details").html(location);

// book now button does the same as book_details button

}
function book_now_button_details(){
  book_details(Placename,Locations,Hotelprice);
  previous_map_or_search_or_details = "details";
  $("#hotel_details_div").hide();
}

function button_confirmation(){
  $("#confirmation_div").hide();
  $("#search_div").show();
}
//autocomplete

$( function() {
  var cities = [
    "Adelaide",
    "Sydney",
    "Brisbane",
    "Melbourne",
    "Canberra",
    "Perth",
    "Hobart",
    "Darwin"
  ];
  $( "#searchBar" ).autocomplete({
    source: cities
  });
  $( "#searchLocation" ).autocomplete({
    source: cities
  });
} );



/////// AJAX REQUEST FOR SEARCH HOTEL PAGES /////////
function SearchHotelsResponse(){
  var searchTerm = window.location.search.substring(12);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var page = this.responseText;
      document.getElementById("SearchHotelsID").innerHTML = page;
    }
  };

  xhttp.open("GET","/SearchHotels?searchTerm="+searchTerm, true);
  xhttp.send();

}

/////////////////////HOTEL MANAGEMENT DETAILS ///////////////////
var FirstHotel = {
	username:"FirstHotel",
	password:"FirstHotel",
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

function HotelManagementDisplay(){
  alert(HotelManagementDetails[0].numRooms);
  $("#hotel_rooms").html(HotelManagementDetails[0].numRooms);
  $("#hotel_name_change").html(HotelManagementDetails[0].hotelName);
  $("#hotel_address").html(HotelManagementDetails[0].address);
  $("#hotel_price").html(HotelManagementDetails[0].price);
  $("#hotel_stars").html(HotelManagementDetails[0].stars);
}

function confirmFill()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var object = JSON.parse(xhttp.responseText);
      document.getElementById("n_adults").innerHTML = object.adult_number;
      document.getElementById("n_children").innerHTML = object.child_number;
      document.getElementById("arr_date").innerHTML = object.from_date;
      document.getElementById("dep_date").innerHTML = object.to_date;
      var fd = object.from_date;
      var td = object.to_date;
      assign_number_nights(fd,td);
      document.getElementById("n_nights").innerHTML = number_nights;
    }
  };

  xhttp.open("GET","/fillHotelDetails", true);
  xhttp.send();
}
