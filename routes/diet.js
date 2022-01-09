'use strict';
const express = require('express');
let router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//find canteen by city
router.get('/', function(req,res){
    const list= ['a','b','c'];
    res.render('diet', {// render diet.ejs
        title:'',
        list: list 
    })
});

module.exports = router;