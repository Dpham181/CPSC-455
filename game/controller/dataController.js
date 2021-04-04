"use strict" 
const  fs = require('fs');


module.exports ={

    initialDatabase:()=>{
        if (!fs.existsSync("model/PersistentData/data.txt")) {
            fs.createWriteStream("model/PersistentData/data.txt");
                console.log("Database Created !!!");
        }
     

    },
    
    
    getData:()=>{
         
        
       let  data = fs.readFileSync("model/PersistentData/data.txt", "utf8");
            let records = data.split(/\n/); 

            let listofRecord = []; 
            for ( let i = 0 ; i < (records.length-1) ; i++){
              
            listofRecord.push(JSON.parse(records[i]));
            }
      
            return listofRecord; 
            

    },

    updatedRecord:(oldrecord, newrecord)=>{
        fs.readFile("model/PersistentData/data.txt", "utf8", (error,data)=>{
            let updatedRecord = data.replace(JSON.stringify(oldrecord) +"\n", JSON.stringify(newrecord)+"\n");

   
           
            fs.writeFile("model/PersistentData/data.txt", updatedRecord , (error)=>{
                console.log("New Record Updated !!!");
            } );
            
        });
    },
    // write new records 


    setData:(player)=>{
    
        const  newRecord = JSON.stringify(player) + "\n" ; 
        fs.writeFile("model/PersistentData/data.txt", newRecord , {flag:'a+'}, (error)=>{
            console.log("New Record Stored !!!");
        } );
    }



}