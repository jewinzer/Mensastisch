'use strict';

const express = require('express');
let router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//find canteen by city
router.get('/search', function(req,res){
    res.render('canteen', {
        checked: '',
        message: 'Allow location tracking via GPS',
        content: '<div class="input-field">'+
                '<input id="findCanteen" type="text" onkeyup="showCanteensByCity(this.value)"/>'+
                '<label for="findCanteen">Enter City</label>'+
                '</div><ul id="searchResults"></ul>',
        onload: 'null'
    })
});

//geolocate user
router.get('/locate', function(req,res){
    res.render('canteen', {
        checked: 'checked',
        message: 'Trying to locate you …',
        content: '<div class="progress">'+
                '<div class="indeterminate"></div>'+
                '</div>',
        onload: 'getUserLocation()'
    })
});

//show x nearest canteens
router.get('', function(req,res){
    // case no params
    if(Object.keys(req.query).length === 0){ 
        return res.redirect('canteen/search');
    }
    // case param id
    if(req.query.id){
        const id = req.query.id;
        return res.render('home',{
            header: id
        });
    }
    //case incorrect params
    if (!req.query.lat || !req.query.lng){
        return res.redirect('canteen/search');
    }
    // case params lat, lng
    const x = 10;
    const lat = req.query.lat;
    const lng = req.query.lng;
    return res.render('canteen', {
        checked: 'checked',
        message: 'Listing canteens closest to your Location',
        content: '<ul id="searchResults"></ul>',
        onload: `showCanteensByLocation(${lat},${lng},${x})`
    });
});


module.exports = router;
