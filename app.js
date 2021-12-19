// create an express app
const express = require('express');
const path = require('path');
const app = express();

//set ejs view engine, folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set static path
app.use(express.static(path.join(__dirname, 'public')));

// use the express-static middleware
app.use(express.static('public'));

// use urlencoded middleware
app.use(express.urlencoded({
    extended: true
  }));

// define the first route via EJS template engine
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from EJS template engine'
    });
});

//find mensa form
app.get('/mensa', function(req, res){
    res.render('find-mensa');
});


// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is listening on port 3000"));