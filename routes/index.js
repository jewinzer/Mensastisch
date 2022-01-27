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
            heroContentPrimary: '<h2>Menü</h2>' +
                '<div class="btn-group">' +
                '<button class="btn-flat" onclick="refreshDateBtn(this.nextElementSibling.innerHTML, false)">' +
                '<i class="material-icons">chevron_left</i></button>' +
                '<button class ="btn-flat disabled" id="dateBtn"></button>' +
                '<button class="btn-flat" onclick="refreshDateBtn(this.previousElementSibling.innerHTML, true)">' +
                '<i class="material-icons">chevron_right</i></button></div>',
            mainContent: '<ul id="searchResults"></ul>',
            onload: `showCanteenData(${id})`
        });
    }
    return res.render('index', {
        heroContentPrimary: '<h1>Startseite/h1>',
        mainContent: 'Startseiten-Content',
        onload: 'null'
    })
});

module.exports = router;