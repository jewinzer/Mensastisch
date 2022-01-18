'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({extended: true}));


//root route
router.get('', function(req, res) {
    if(req.query.canteenId){
        const id = req.query.canteenId;
        return res.render('index',{
            heroContentPrimary: '<h2>Menu</h2>'+
                                '<div class="btn-group">'+
                                '<button class="btn-flat" onclick="refreshDateBtn(this.nextElementSibling.innerHTML, false)">'+
                                '<i class="material-icons">chevron_left</i></button>'+
                                '<button class ="btn-flat disabled" id="dateBtn"></button>'+
                                '<button class="btn-flat" onclick="refreshDateBtn(this.previousElementSibling.innerHTML, true)">'+
                                '<i class="material-icons">chevron_right</i></button></div>',
            heroContentSecondary: '<i class="material-icons icon-clickable"'+
                                `onclick="changeIconState(this); updateFavouriteCanteens(${id})">notifications_none</i>`,
            mainContent: '<ul id="searchResults"></ul>',
            onload: `showCanteenData(${id})`
        });
    }
    return res.render('index', {
        heroContentPrimary: '<h1>Hello from EJS template engine</h1>',
        heroContentSecondary: '',
        mainContent: 'Index first view',
        onload: 'null'
    })
});

module.exports = router;