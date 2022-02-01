'use strict';

//imports
const express = require('express');
let router = express.Router();



//create additives list
router.get('', function(req, res) {
    const roles = [
        {de: "Studierende", en: "students"},
        {de: "SchülerInnen", en: "pupils"},
        {de: "Angestellte", en: "employees"},
        {de: "Gäste", en: "others"}
    ];

    //render allergies.ejs
    res.render('preferences', {
        title1: 'Preisanzeige für',
        list1: roles
    })
});

module.exports = router;