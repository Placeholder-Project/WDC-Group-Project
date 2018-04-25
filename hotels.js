var hotels = {
	/*hotel : {
		name: hotel_name,
		location: {lat: 0, lng: 0},
		city: hotel_city,
		price: 0,
		features: [0,1,2],
		stars: 0,
		img_src: [source1],
		description: hotel_desc
	},*/
	InterContinental : {
		name: 'InterContinental',
		location: {lat: -34.9212 , lng: 138.6059},
		city: 'Adelaide',
		price: 550,
		misc_attr: [0,1,2,3,4,5,6],
		stars: 4,
		img_src: ['images/InterContinental1.png', 'images/InterContinental2.png'],
		description: 'Exclusively positioned on the banks of the River Torrens, InterContinental Adelaide provides luxury city centre accommodation, dining and meeting facilities. Situated adjacent to the Adelaide Festival Centre, Convention Centre, Casino and directly opposite the spectacular Adelaide Oval, our location provides effortless exploring and entertainment at your fingertips.'
	},
	Hilton : {
		name: 'Hilton',
		location: {lat: -34.929143, lng: 138.598906},
		city: 'Adelaide',
		price: 330,
		features: [0,1,3,4],
		stars: 4,
		description: "Overlooking Victoria Square, Hilton Adelaide is set in the heart of the city’s entertainment, shopping and dining precincts. The Central Market, Chinatown and Gouger Street - Adelaide’s most vibrant dining destinations – are also minutes away."
	},

};

// Users array
var all_hotels = [];

// Populate users array
for(var key in hotels) {
    all_hotels.push(hotels[key]);
}

function write_to_hotels_info(hotel_list) {
	var geocoder = new google.maps.Geocoder;
	var location_string;
	for (hotel in hotel_list) {
		geocoder.geocode({'address': hotels.location}, function(results, status) {
			if (status === 'OK') {
				if (results[0]) {
					location_string = results;
				}
			} else {
				location_string = "could not find address";
			}
		});

		$('#places_and_area_div2').prepend(
			'<h1 id = "name_details">',hotel.name,'</h1>/<p class="imageinfo"><img id ="image_details" src="',hotel.img_src[0],'" alt="Hotel 1" class="hotels"><strong>Stars:',write_stars(hotel.stars),'</strong><br><strong>Price: </strong>$ ',hotel.price,' per night<br><strong>Location: </strong> ' ,location_string, '<br><strong>description: </strong>',hotel.description,'<br>' ,write_features(hotel.features.join(" : ")),'</p><button type="button" class="btn btn-default button_details_booknow" onclick="details(',hotel.name,',',hotel.city,',',hotel.price,',',hotel.img_src[0],')">Details</button><button type="button" class="btn btn-default button_details_booknow" onclick="book_details(',hotel.name,',',hotel.city,',',hotel.price,')">Book Now</button><div style="clear:both;"></div><br>'
		)
	}
}

function write_stars(n) {
	var stars;
	var i = 0;
	while (i<n) {
		stars.push('<i class="fa fa-star">');
		i++;
	}
	return stars;
}

var features = ["wifi", "pool", "spa", "undercover parking", "restaurant", "balcony", "etc"];

function write_features(feature_list) {
	var new_list;
	for (var i in feature_list) {
		new_list.push(feature_list[i]);
	}

	return new_list;
}

// searches the city names from matching the given string
	// later: search name of hotel and every part of address from rev. geocoding
function hotels_from_search(search_word) {
	var new_list;
	for (hotel in all_hotels) {
		if (hotel.name == search_word) {
			new_list.push(hotel);
		}
	}
	return new_list;
}
