"use strict" 

// this is game page 

const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')



router.post("/",  gameController.GamePlay);

module.exports = router; 