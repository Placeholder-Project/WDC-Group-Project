//to go to indexs.js:

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

//to go to placeholder.js:

window.onload = logged_in_query();
function logged_in_query() {
	console.log("logged_in_query called");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var response = JSON.parse(this.responseText);
			var logged_in = response.valid;

			if (logged_in == "true") {
				// write "hello, <username>!" and a sign out button
				$("#login_signup_buttons").html(
				'<p> welcome back, '+response.name+ '</p> \
				<form action="Logout" method="get"> \
	    	        		<button onclick="login_button()" class = "login_sign-up btn btn-default" > Logout </button> \
	    	      	</form> \
	    	      	<div id = "open_id" class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div> \
				');
			} else {
				// write login and sign up buttons
				$("#login_signup_buttons").html(' \
				<form action="Signup" method="get"> \
	    	        <button onclick="signup_button()" class = "login_sign-up btn btn-default" id ="su"> Sign-up </button> \
	    	      </form> \
	    	      <form action="Login" method="get"> \
	    	        <button onclick="login_button()" class = "login_sign-up btn btn-default" > Login </button> \
	    	      </form> \
	    	      <div id = "open_id" class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div> \
				');
			}
		}
	}
	xhr.open('GET', '/logged_in_query', true);
     xhr.send(0);
}
