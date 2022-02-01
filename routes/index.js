'use strict';

//imports
const express = require('express');
let router = express.Router();


//middleware
router.use(express.json());
router.use(express.urlencoded({extended:true}));


//root route
router.get('', function(req, res) {
    if (req.query.canteenId) {
        const id = req.query.canteenId;
        return res.render('index', {
            heroContentPrimary: '<h2>Menü</h2>',
            heroContentTertiary: '<div class="btn-group">' +
                '<button class="btn-flat" onclick="refreshDateBtn(false)">' +
                '<i class="material-icons">chevron_left</i></button>' +
                '<button class ="btn-flat disabled" id="dateBtn"></button>' +
                '<button class="btn-flat" onclick="refreshDateBtn(true)">' +
                '<i class="material-icons">chevron_right</i></button></div>',
            mainContent: '<ul id="searchResults"></ul>',
            onload: `showCanteenData(${id})`
        });
    }
    return res.render('index', {
<<<<<<< HEAD
        heroContentPrimary: '<h1>Hello from EJS template engine</h1>',
        mainContent: '<img class="responsive" src="/img/mensastisch.svg" alt="SVG mit img Tag laden">',
=======
        heroContentPrimary: '<h1>Startseite</h1>',
        heroContentTertiary: '',
        mainContent: 'Startseiten-Content',
>>>>>>> f5b3376789f6c992965320a2146297226c5af317
        onload: 'null'
    })
});

module.exports = router;