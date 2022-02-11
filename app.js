//set up environment variables
require('dotenv').config();


//create express app
const express = require('express');
const app = express();
const path = require('path');


//import and use compression
var compression = require('compression');
app.use(compression());


//import and use routes
const canteen = require('./routes/canteen.js');
const index = require('./routes/index.js');
const diet = require('./routes/diet.js');
const preferences = require('./routes/preferences.js');
const calendar = require('./routes/calendar.js');
const offline = require('./routes/offline.js');
app.use('/canteen', canteen);
app.use('/diet', diet);
app.use('/preferences', preferences);
app.use('/calendar', calendar);
app.use('/', index);
app.use('/offline', offline);


//set ejs template engine, folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//set static path, use express-static middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


//start server listening for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
