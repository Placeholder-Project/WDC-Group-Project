function write_confirmation() {
	// write innerHTML of the variables in to the fields.

	document.getElementById("hotel_name").innerHTML = hotel_name;
	document.getElementById("loc").innerHTML = hotel_location;
	assign_number_nights();
	document.getElementById("n_nights").innerHTML = number_nights;
	document.getElementById("n_adults").innerHTML = number_adults;
	document.getElementById("n_children").innerHTML = number_children;
	document.getElementById("arr_date").innerHTML = date_arrival;
	document.getElementById("dep_date").innerHTML = date_departure;
	document.getElementById("price_total").innerHTML = total_price;

}

function assign_number_nights() {
	var t1 = toDate(date_arrival),
	    t2 = toDate(date_departure);
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
