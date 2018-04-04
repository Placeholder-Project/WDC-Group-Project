var hotel_name;
var hotel_location;
var number_adults;
var number_children;
var date_arrival;
var date_departure;
var total_price;
var price;
var number_nights;
var showpage;
var hidepage;

function backbuttonfunc(){
  $(hidepage).hide();
  $(showpage).show();
}

//  PLACES IN THIS AREA
function book_details(hotel, location, night_price){
  hotel_name = hotel;
  hotel_location = location;
  price = night_price;
  $("#places_and_area_div").hide();
  $("#booking_your_hotel_div").show();
  showpage = "#places_and_area_div";
  hidepage = "#booking_your_hotel_div";
}

//  NUMBER OF PEOPLE AND DATE PAGE
function submit_details(){
  var number_adults = $("#adult_number option:selected").text();
  var number_children = $("#child_number option:selected").text();
  var date_arrival = $("#to_date").val();
  var date_departure = $("#from_date").val();
  var day1 = Number(date_arrival.slice(8,10));
  var day2 = Number(date_departure.slice(8,10));
  var month1 = Number(date_arrival.slice(5,7));
  var month2 = Number(date_departure.slice(5,7));
  var year1 = Number(date_arrival.slice(0,4));
  var year2 = Number(date_departure.slice(0,4));
  night_calculator(year1,month1,day1,year2,month2,day2);
  total_price = number_nights*price;
  $("#booking_your_hotel_div").hide();
  $("#lets_book_this_div").show();
  showpage = "#booking_your_hotel_div";
  hidepage = "#lets_book_this_div";
}
function signup(){
  $("#lets_book_this_div").hide();
  $("#signup_div").show();
  showpage = "#lets_book_this_div";
  hidepage = "#signup_div";
}
function login(){
  $("#lets_book_this_div").hide();
  $("#login_div").show();
  showpage = "#lets_book_this_div";
  hidepage = "#login_div";
}

function night_calculator(year1,month1,day1,year2,month2,day2){
  var day_to_year = 0;
  var day_to_month = 0;
  var day_to_day = 0;

  // if they are staying for more than 1 year
  if ((year2-year1)>1){
    day_to_year = 365*(year2-year1);
    if(month2>=month1){
      day_to_month = 30*(month2-month1);
      if (day2>=day1){
        day_to_day = day2-day1;
      }
      else{
        day_to_day = 30-day1+day2;
      }
    }
    else{
      day_to_month = 30*(month2+12-month1);
      if (day2>=day1){
        day_to_day = day2-day1;
      }
      else{
        day_to_day = 30-day1+day2;
      }
    }
  }

  // if they are staying during the cross over between a year
  else if ((year2-year1)==1){
    if(month2>=month1){
      day_to_month = 30*(month2-month1);
      if (day2>=day1){
        day_to_day = day2-day1;
      }
      else{
        day_to_day = 30-day1+day2;
      }
    }
    else{
      day_to_month = 30*(month2+12-month1);
      if (day2>=day1){
        day_to_day = day2-day1;
      }
      else{
        day_to_day = 30-day1+day2;
      }
    }
  }
  // if they are staying sometime during 1 year
  else {
    day_to_month = 30*(month2-month1);
    if (day2>=day1){
      day_to_day = day2-day1;
    }
    else{
      day_to_day = 30-day1+day2;
    }
  }
  number_nights = day_to_year + day_to_month + day_to_day;
}
