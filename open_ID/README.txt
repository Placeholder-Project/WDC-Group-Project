in app.js:

var session = require('express-session');

app.use(session({secret: 'secret biome', resave: false, saveUninitialized: true }));

packages:

npm install

npm install express-session

npm install google-auth-library
