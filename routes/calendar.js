'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//create
router.get('', function(req, res) {

    //render calendar.ejs
    res.render('calendar', {
 
    })
});

module.exports = router;