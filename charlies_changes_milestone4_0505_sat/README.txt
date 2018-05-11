CHANGED:
- changed users attr. fname to username for congruency
- added 'logged_in = true' to google sign in and changed some redirection stuff
	(redirecting doesnt exit the function, so i had to add a condition
	so it never redirects twice, causing the "cannot set header
	after they are sent" error)
- cleaned up some generic redirection methods
- added router GET method for Confirmation
- added router POST method for 'LoginRedirect' to check email and pwd, then log in and redirect accordingly
- added router POST method for 'SignupRedirect' to add user and then log them in
- logged-in-dependant top-right buttons

NOTE:
- Could add 'are you sure you wish to log out?' message after clicking 'log out'
- onSignIn function needs to pass name, email, and probably password to server to add user
- much of the compatibility with maps is untested

BUG:
- GET MapSearch returns 404 (need to add routerMethod)
