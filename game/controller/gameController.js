"use strict" 
let player =  require("../model/player");
let decisionIndex = require("../model/choice");
const dataController = require("./dataController");
dataController.initialDatabase(); 

module.exports = {

// All views 
  // display home page to user 
  getHomePage:(req,res)=>{
  
    const Players = dataController.getData(); 
    player.PlayerName=null;
    player.TotalGame=0;
    player.wins = 0;
    player.losses = 0; 
    player.Severchoice = null;
    player.Playerchoice= null; 
    player.Draw = 0; 
    res.render("home",{Players:Players});

  },

  // display game page to user

  getGamePage:(req,res)=>{

    res.render("game",{player:player});

  },
// All Send
  // get the round from user input 
  getRound:(req,res)=>{
    let round = parseInt(req.body.game);
    let username = req.body.username;
    if (round !== null && username !== null){
      player.PlayerName = username;
      player.TotalGame= round;
      res.redirect("/game");

    }

  } ,
  // state of game update 

  GamePlay:(req,res)=>{
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
    if(Number(player.TotalGame) === Number(player.wins + player.losses + player.Draw))
        {
         
          let Players = dataController.getData(); 

          for ( let i = 0 ; i < Players.length ; i++){
            if (Players[i].PlayerName === player.PlayerName){

              dataController.updatedRecord(Players[i],player);
              
            }
          }

          dataController.setData(player);
        }      
    //console.log(Object.getOwnPropertyDescriptors(player, "wins", "looses","choices" ));
    res.redirect("/game");
  }

}