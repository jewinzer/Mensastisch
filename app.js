//set up environment variables
require('dotenv').config();

// create an express app
const express = require('express');
const app = express();
const path = require('path');

//import routes and use them
const mensa = require('./routes/mensa.js');
app.use('/mensa', mensa);

//set ejs template engine, folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set static path, use the express-static middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// define the first route via EJS template engine
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from EJS template engine'
    });
});

// start the server listening for requests
app.listen(process.env.PORT,
    () => console.log("Server is listening…"));






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





