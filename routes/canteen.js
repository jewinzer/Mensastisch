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
        heroMessage: 'GPS-Tracking erlauben',
        heroContent: '<div class="input-field">'+
                    '<input id="findCanteen" type="text" autocomplete="off" '+
                    'onkeyup="showCanteensByCity(this.value)"/>'+
                    '<label class="active" for="findCanteen">Stadt eingeben</label></div>',
        mainContent: '<ul id="searchResults"></ul>',
        onload: 'null'
    })
});

//geolocate user
router.get('/locate', function(req,res){
    res.render('canteen', {
        checked: 'checked',
        heroMessage: 'Lokalisiere. Einen Moment…',
        heroContent: '<div class="progress"><div class="indeterminate"></div></div>',
        mainContent: '',
        onload: 'getUserLocation()'
    })
});

//show x nearest canteens
router.get('', function(req,res){
    // case no params
    if(Object.keys(req.query).length === 0){ 
        return res.redirect('canteen/search');
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
        heroMessage: 'GPS-Tracking erlauben',
        heroContent: '',
        mainContent: '<ul id="searchResults"></ul>',
        onload: `showCanteensByLocation(${lat},${lng},${x})`
    });
});

module.exports = router;

