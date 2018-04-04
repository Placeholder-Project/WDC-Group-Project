function write_confirmation() {
	// write in to the spans of given id with corr. variables

	$("#hotel_name").html(hotel_name);
	$("#loc").html(hotel_location);
	assign_number_nights();
	$("#n_nights").html(number_nights);
	$("#n_adults").html(number_adults);
	$("#n_children").html(number_children);
	$("#arr_date").html(date_arrival);
	$("#dep_date").html(date_departure);
	$("#price_total").html(total_price);

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
