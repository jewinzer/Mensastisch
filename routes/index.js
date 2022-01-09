'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({extended: true}));


//root route
router.get('', async function(req, res) {
    if(req.query.canteenId){
        const id = req.query.canteenId;
        return res.render('index',{
            heroContentPrimary: '<h2>Menu</h2>',
            heroContentSecondary: '<i id="opImg" class="large material-icons"></i><h6 id ="opMsg"></h6>',
            mainContent: '',
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