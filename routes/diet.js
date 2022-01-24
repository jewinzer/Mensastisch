'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//create allergy list
router.get('', function(req, res) {
    const allergyList = ['Glutenhaltiges Getreide', 'Weizen', 'Roggen', 'Gerste', 'Hafer', 'Dinkel', 'Kamut', 'Krebstiere', 'Eier', 'Fisch', 'Erdnüsse', 'Schalenfrüchte', 'Mandeln', 'Haselnuss', 'Walnuss', 'Kaschunuss', 'Pacannuss', 'Paranuss', 'Pistazie', 'Macadamia', 'Sellerie', 'Soja', 'Senf', 'Milchprodukte', 'Sesam', 'Schwefeldioxid', 'Sulfide', 'Lupine', 'Weichtiere', 'Nitritpökelsalz', 'Hefe'];


    //render diet.ejs
    res.render('diet', {
        heroContentPrimary: '<h2>Allergy</h2>',
        // mainContent: '<ul id="allergyList"></ul>',
        list: allergyList,
        // heroContentSecondary: '<h4>Here you can select your allergies, which filter your dishes.</h4>',
    })
});

module.exports = router;