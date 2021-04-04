"use strict" 

// this is the route of home page 

const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')



router.get("/",  gameController.getHomePage);



module.exports = router; 