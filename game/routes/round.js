
"use strict" 
// get how many round that user want to play

const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')

router.post("/", gameController.getRound);

module.exports = router; 