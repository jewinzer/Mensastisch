'use strict';

const express = require('express');
let router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({
    extended: true
  }));

//find canteen by city
router.get('/search', function(req,res,next){
    res.render('mensa', {
        checked: '',
        title :'Allow location tracking via GPS',
        content: '<div class="input-field">'+
                '<input id="findMensa" type="text" onkeyup="showCanteensByCity(this.value)"/>'+
                '<label for="findMensa">Enter City</label>'+
                '</div><ul id="searchResults"></ul>',
        onload:'null'
    });
});

//geolocate user
router.get('/locate', function(req,res,next){
    res.render('mensa', {
        checked: 'checked',
        title: 'Trying to locate you …',
        content:'<div class="progress">'+
                '<div class="indeterminate"></div>'+
                '</div>',
        onload: 'getUserLocation()'
    });
});

//show x nearest canteens
router.get('*', function(req,res){
    const x = 10;
    const lat = req.query.lat;
    const lng = req.query.lng;
    res.render('mensa', {
        checked: 'checked',
        title: 'Listing canteens closest to your Location',
        content: '<ul id="searchResults"></ul>',
        onload: 'showCanteensByLocation('+lat+','+lng+','+x+')'
    });
});


module.exports = router;
