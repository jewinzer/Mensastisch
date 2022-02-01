'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//create additives list
router.get('', function(req, res) {
    const additivesList = ['Schweinefleisch bzw. mit Gelatine vom Schwein', 'Alkohol', 'Geschmacksverstärker', 'gewachst', 'konserviert', 'Antioxidationsmittel', 'Farbstoff', 'Phosphat', 'geschwärzt', 'enthält eine Phenylalaninquelle', 'Süßungsmittel', 'mit zum Teil fein zerkleinertem Fleischanteil', 'koffeinhaltig', 'chininhaltig', 'geschwefelt', 'kann abführend wirken'];


    //render allergies.ejs
    res.render('additives', {
        heroContentPrimary: 'Zusätze',
        list: additivesList.sort(),
    })
});

module.exports = router;