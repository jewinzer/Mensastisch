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

router.get('/allergies', function(req, res) {
    const allergyList = ['Glutenhaltiges Getreide', 'Weizen', 'Roggen', 'Gerste', 'Hafer', 'Dinkel', 'Kamut', 'Krebstiere', 'Eier', 'Fisch', 'Erdnüsse', 'Schalenfrüchte', 'Mandeln', 'Haselnuss', 'Walnuss', 'Kaschunuss', 'Pacannuss', 'Paranuss', 'Pistazie', 'Macadamia', 'Sellerie', 'Soja', 'Senf', 'Milchprodukte', 'Sesam', 'Schwefeldioxid', 'Sulfide', 'Lupine', 'Weichtiere', 'Nitritpökelsalz', 'Hefe'];
    res.render('diet-details',{
        header: 'Allergene',
        list: allergyList.sort(),
        onchange: 'updateAllergy(this.value)',
        onload: 'updateAllergiesCheckboxes()'
    })
});

router.get('/additives', function(req, res) {
    const additivesList = ['Schweinefleisch bzw. mit Gelatine vom Schwein', 'Alkohol', 'Geschmacksverstärker', 'gewachst', 'konserviert', 'Antioxidationsmittel', 'Farbstoff', 'Phosphat', 'geschwärzt', 'enthält eine Phenylalaninquelle', 'Süßungsmittel', 'mit zum Teil fein zerkleinertem Fleischanteil', 'koffeinhaltig', 'chininhaltig', 'geschwefelt', 'kann abführend wirken'];
    res.render('diet-details',{
        header: 'Zusätze',
        list: additivesList.sort(),
        onchange: 'updateAdditive(this.value)',
        onload: 'updateAdditivesCheckboxes()'
    })
});
module.exports = router;