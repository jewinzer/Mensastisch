'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({extended:true}));


//root route
router.get('', function(req, res) {
    if (req.query.canteenId) {
        const id = req.query.canteenId;
        return res.render('index', {
            heroContentPrimary: '<h1>Menü</h1>',
            heroContentTertiary: '<div class="btn-group">'+
                '<button class="btn" onclick="refreshDateBtn(false)">'+
                '<i class="material-icons">chevron_left</i></button>'+
                '<button class ="btn disabled" id="dateBtn"></button>'+
                '<button class="btn" onclick="refreshDateBtn(true)">' +
                '<i class="material-icons">chevron_right</i></button></div>',
            mainContent:'<ul id="searchResults"></ul>',
            onload: `showCanteenData(${id})`
        });
    }
    return res.render('index', {
        heroContentPrimary: '<h1>Willkommen</h1><p>Herzlich Willkommen bei Mensastisch.</p>',
        heroContentTertiary: '<a class="btn" href="/canteen/search"><i class="material-icons left">location_on</i>Mensa finden</a>',
        mainContent: '',
        onload: 'showLastVisitedCanteen()'
    })
});

module.exports = router;