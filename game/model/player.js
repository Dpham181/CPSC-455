"use strict" 

let player ={};
	Object.defineProperties(player,
		{
			PlayerName: {value:null, writable:true, enumerable:true, configurable:true},
			TotalGame: {value:0, writable:true, enumerable:true, configurable:true},
			wins: {value:0, writable:true, enumerable:true, configurable:true},
			losses: {value:0, writable:true, enumerable:true, configurable:true},
			Playerchoice: {value:null, writable:true, enumerable:true, configurable:true},
			Severchoice: {value:null, writable:true, enumerable:true, configurable:true},
			Draw: {value:0, writable:true, enumerable:true, configurable:true},

		} 
		);

    Object.seal(player);// no more property can be added or del  to this player 



module.exports = player;