The test app has two pages, a landing page and a login confirmation page.

The landing page has a login form with two entries: one for username and one for password. There is a button for submitting the data.
For registration, a link below the button with the text "Create an account" replaces the login form with a registration form with an additional text box for email entries.
Similarly, there is a button for submitting the data. 

The app redirects to an error page if:
A. Upon logging in:
	1. A textbox is left empty
	2. The username is not found
	3. The password does not match that of the username in the database
B. Upon registration:
	1. A textbox is left empty
	2. The username is already in the database
	3. The email is already in the database

Upon successfully logging in, the app will redirect to another page.