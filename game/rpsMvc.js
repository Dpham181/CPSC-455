// Import express

"use strict" 
const express = require('express');
	// Create an instance of the app
const  app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

	
class RPS 
{
  constructor(port)
  {
	  this.port = port; 
  }
  setPort(){
	let portNum = parseInt(this.port);
	let defaultport = 3000; 
	if (typeof(portNum) === 'number'){

		app.listen(portNum);
	}
	else {
		console.log("redirect to port 3000 for default");
		app.listen(defaultport);
	}
  };
 
  routes_Config(){

	const bodyParser = require("body-parser");
	let Homepage = require('./routes/home');
    let Gamepage  = require('./routes/game');
    let round  = require('./routes/round');
    let Gameplay  = require('./routes/play');
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use("/", Homepage);
	app.use("/game", Gamepage);
	app.use("/round", round);
	app.use("/play", Gameplay);

  }

}

let myGame = new RPS(3000)
myGame.setPort()
myGame.routes_Config()