//set up environment variables
require('dotenv').config();

//create express app
const express = require('express');
const app = express();
const path = require('path');


const webpush = require('web-push');
const publicVapidKey = 'BL-j2gM7e-iJ29itorXFCVEyzGdm_mYDwQiYKQZG3HYSParqcjwPaffAQiVd5GSvyOlZLGfjWXiMp1ERAwpyiXg';
const privateVapidKey = 'wke7s76nrxl3mKX019aRQLLbtTUj56dl2dp-8KaGqzg';
webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);



//import and use compression
var compression = require('compression');
app.use(compression());

//import and use routes
const canteen = require('./routes/canteen.js');
const allergies = require('./routes/allergies.js');
const additives = require('./routes/additives.js');
const index = require('./routes/index.js');
const diet = require('./routes/diet.js');
const preferences = require('./routes/preferences.js');
const calendar = require('./routes/calendar.js');
app.use('/canteen', canteen);
app.use('/allergies', allergies);
app.use('/additives', additives);
app.use('/diet', diet);
app.use('/preferences', preferences);
app.use('/calendar', calendar);
app.use('/', index);

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
