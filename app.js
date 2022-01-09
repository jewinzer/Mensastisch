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
app.use('/canteen', canteen);
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





/*
//set up database connection
const {Pool} = require('pg');
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: {
 rejectUnauthorized: false
 }
});

// query db, console.log entries
pool.query(`SELECT * FROM Users;`, (err, res) => {
    if (err) {
        console.log("Error - Failed to select all from Users");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});
*/





