'use strict';
const express = require('express');
let router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({extended: true}));



module.exports = router;