// Import express

"use strict" 
const express = require('express');
	// Create an instance of the app
const  app = express();
const bodyParser = require("body-parser");
	// Set ejs as the template engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); 

// Listen for requests

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
 
  game(){
	// render the home page  
	
	// definded an player record 
	let player =  require("./model/game");
    let decisionIndex = require("./model/choice");
	
	app.get("/", function(req, resp){
		player.TotalGame=0;
		player.wins = 0;
		player.losses = 0; 
		player.Severchoice = null;
		player.Playerchoice= null; 
		player.Draw = 0; 
		resp.render("home");
		
	});	
	app.get("/game", function(req, resp){
       
		resp.render("game",{player:player});
		
	});	
    app.post("/game", function(req, resp){
		player.TotalGame=req.body.game;
		resp.redirect("/game");
		
	});	
		
	//console.log(Object.getOwnPropertyDescriptors(player, "wins", "looses","choices" ));
	app.post("/play", function(req, res) {
		// Print the values of the form variables
		
        // serve choice 
		let serve_randomMove = Math.floor(Math.random() * Math.floor(3));
		player.Severchoice = decisionIndex[(serve_randomMove).toString()];
		// player choice
		player.Playerchoice = decisionIndex[req.body.move];
	

		//rule 
		
		if (player['Playerchoice'] === "ROCK"){
			if (player['Severchoice'] === "PAPER"){
				player.losses+=1;
			}
			else if(player['Severchoice'] === "Scissors" ){
				player.wins +=1;

			}
			else{
				player.Draw +=1; 
			}
		}
		else if  (player['Playerchoice'] === "PAPER"){
			if (player['Severchoice'] === "ROCK"){
				player.wins +=1;
			}
			else if(player['Severchoice'] === "Scissors" ){
				player.losses +=1;

			}
			else{
				player.Draw +=1; 
			}
		}
		else {

			if (player['Severchoice'] === "ROCK"){
				player.losses +=1;
			}
			else if(player['Severchoice'] === "PAPER" ){
				player.wins +=1;

			}
			else{
				player.Draw +=1; 
			}

		}

		//console.log(Object.getOwnPropertyDescriptors(player, "wins", "looses","choices" ));
		res.redirect("/game");
	  });
  }

}

let myGame = new RPS(3000)
myGame.setPort()
myGame.game()