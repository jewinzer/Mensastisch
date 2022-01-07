'use strict';
const express = require('express');
let router = express.Router();
const fetch = require('node-fetch');

//middleware
router.use(express.json());
router.use(express.urlencoded({extended: true}));


//root route
router.get('', async function(req, res) {
    if(req.query.canteenId){
        const id = req.query.canteenId;
        const menu = await getMenuById(id);
        return res.render('index',{
            heroContentPrimary: '<h2>Menu</h2>',
            heroContentSecondary: 'Hello',
            mainContent: menu,
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

//return JSON of canteen Menu
async function getMenuById(id){
    const date = '2022-01-10';
    const url = 'https://openmensa.org/api/v2/canteens';
    //const url = `https://openmensa.org/api/v2/canteens/:${id}/days/:${date}/meals`;
    const response = await fetch(url);
    const menu = await response.json();
    return menu;
  };

module.exports = router;