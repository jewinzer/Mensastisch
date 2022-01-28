'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//create additives list
router.get('', function(req, res) {
    const diets = ['Vegetarisch', 'Vegan'];
    const adds = ['Allergene', 'Zusatzstoffe'];


    //render allergies.ejs
    res.render('diet', {
        title1: 'Ich ernähre mich',
        list1: diets,
        title2: 'Ich verzichte auf',
        list2: adds
    })
});

module.exports = router;