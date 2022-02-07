'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//create additives list
router.get('', function(req, res) {

    //render allergies.ejs
    res.render('offline')
});

module.exports = router;