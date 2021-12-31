'use strict';

const express = require('express');
let router = express.Router();

// middleware
router.use(express.json());
router.use(express.urlencoded({
    extended: true
  }));

//text search mensa
router.get('/search', function(req, res){
    res.render('mensa-search');
});

//geolocate mensa
router.get('/locate', function(req, res){
    res.render('mensa-locate');
});
router.post('/locate', function(req,res){
    const nearest = req.body;
});

module.exports = router;