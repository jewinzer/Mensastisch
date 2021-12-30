'use strict';
const express = require('express');
let router = express.Router();

//text search mensa
router.get('/search', function(req, res){
    res.render('mensa-search');
});

//geolocate mensa
router.get('/locate', function(req, res){
    res.render('mensa-locate');
});

module.exports = router;