'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('', function(req, res) {
    res.render('diet')
});

module.exports = router;