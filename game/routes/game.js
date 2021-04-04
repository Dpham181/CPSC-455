"use strict" 

// this is game page 

const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')



router.get("/",  gameController.getGamePage);


module.exports = router; 