
"use strict" 

const decisionIndex ={}
	Object.defineProperties(decisionIndex,
		{
			'0': {value:'ROCK', writable:true, enumerable:true, configurable:true},
			'1': {value:'PAPER', writable:true, enumerable:true, configurable:true},
			'2': {value:'Scissors', writable:true, enumerable:true, configurable:true},

		} 
		);
    Object.freeze(decisionIndex);
    
module.exports = decisionIndex;