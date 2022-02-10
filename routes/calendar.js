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
        heroContentPrimary: '<h1>Essensplan</h1>',
        heroContentTertiary: 'Hier siehst du deine ausgewählten Gerichte für die aktuelle Woche.',
        mainContent: '<p class="center-align">Bisher keine Einträge.<p>',
    })
});

module.exports = router;