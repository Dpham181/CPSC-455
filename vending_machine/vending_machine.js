const readline = require('readline-sync');
class item
{constructor(item, price, stock){
		this.item = item;
		this.price = price; 
		this.stock = stock;
		}
}
class VendingMachine // fixed adding stock avalibale for each items 
{
	// Save the items and prices
	constructor(listofitems){
	this.listofitems = listofitems;

	}
	intialItems() {
	this.items = [];
	for (let i of this.listofitems){
		this.items.push(i);
	}
	}
	// Displays the menu
	showMenu()
	{

		console.log("Welcome to our flawless and secure vending experience!");

		// Print Woot twice
		//for(var i = 0; i < 2; ++i)
		//{
		//	console.log("Woot!");
		//}
		let i = 0 ; 
		// Prints all the items   // fixed for loop in term of displaying all the items that given by using let variable 
		for(let i of this.items)
		{
			console.log( this.items.indexOf(i)+ "." + i.item + " [$" + i.price + "]" +  " [InStock:" + i.stock + "]"); // fixed menu for showing avalible stock 
		}

	}
	
	
	
	// ------------------------------------
	// Accepts coins
	// @param item - the requested item
	// @param price - the price of the item
	// --------------------------------------
	inputCoins (item, price, numItems, stocks)
	{
		// The coin sum
		let coinSum = 0.0, ReturnSum =0.0, newStock = 0 ;

		let FlagtoReturn= false; // fixed initial the flag if user wanna get return then nothing will show up after refund 
        let insertedBills = 0 , insertedCents , done; // fixed global intial varibale 
		do
		{
			insertedBills = parseInt(readline.question("\nPlease insert the bills (whole numbers) for " +  item.toLowerCase() +":"));
			insertedCents = readline.question("\nPlease insert the coins(25,10,5,1) as cents to purchase your) to purchase your " +  item.toLowerCase() +":");
			let floatCents =0.0; // fixed initial floatcent with let 
			// No return requested
			
				// Get the floating point value
				floatCents = parseFloat((insertedCents/100))+ parseFloat(insertedBills);	
				// Add the coin sum
				coinSum += floatCents;
			if(isNaN(coinSum)){
				console.log("Only accpected number !!!" ); 
				coinSum = 0.0; 
			}else{
			console.log("Just accepted ", coinSum, " total of ",(insertedCents/100),"Coins","and" ,insertedBills,"dolas\n" ); }
			//done =readline.question("Do you want to add more money? (y)/(n)\n");
		
			
		}while(coinSum <= parseFloat(price*numItems) || isNaN(coinSum) ); // fixed adding two more condition with if user want to add more money to fun if the amount of fund still smaller than the price of purchase
		
		let option ; 
		do{
			option = readline.question(" Enter [r] to return your money. \n Enter [v] to start vending with the current amount. \n Please enter your choice:  ");
			if(option === "r") // fixed ===
			{
				this.returnMoney(coinSum);
				FlagtoReturn = true; 
				break;
			}
			// Vend with the current funds!
			 if(option === "v") // fixed === 
			{
				break;
			}
			else{
				break;
			}
			
			// Looks like money was deposited
			
		}while( option != "r" || option != "v" )

		// Enough money! 
		if (FlagtoReturn) {
					console.log("Please , takes back your funds!");
		}else
		{
		if(Math.floor(coinSum / price) >= numItems )
		{
			ReturnSum = (coinSum - (numItems  * price)).toFixed(2); 
			newStock = stocks - numItems; // fixed adding remaining stock after completed purchase
			console.log("Please claim you ", numItems, " ", item ) ; // fixed the return method 
			this.returnMoney((ReturnSum));
			
			console.log("Stock Remaining: ", newStock); // fixed interface stock after return chance
			for(let i of this.items ){

				if(i.item === item){

					this.items[this.items.indexOf(i)].stock = newStock;
				}
			}
			this.itemRequest();
		}
		// Not enough money
		else
		{
			console.log("Sorry, insufficient funds!");
			this.itemRequest();

		}
	
	}	
	}
	
	// Used to select the item
	itemRequest() 
	{
		
		// Show the menu
		this.showMenu();
		
		// The item number
		let itemNum = readline.question("Please enter the item number: "); // fixed change to let variable 
				
		console.log("You selected item: ", itemNum);
		
		// If this is a bulk purchase, then show the menu
		let numItemsStr = readline.question("How many " + this.items[itemNum].item + "(s) would you like to purchase? "); // fixed change to let variable 

		// Get the number of items
		let numItems = parseInt(numItemsStr); // fixed 
		
		console.log("You requested: ", numItems, " ", this.items[itemNum].item.toLowerCase(), "(s) which costs " + this.items[itemNum].price * numItems);
				

		// Go to the purchasing process
		this.inputCoins(this.items[itemNum].item, this.items[itemNum].price, numItems, this.items[itemNum].stock);

	}
	
	// Will return 0 if NaN ,
	// @param check  - money return check

	ImproperCheck(value, amount){
	
	
	return isNaN(value) ? amount  : value ;
	}
	// -----------------------------------------------
	// Will return the money in dollar bills, quarters,
	// dimes, nickles and pennys
	// Returns the coins
	// Returns the money to the user
	// @param amount - the sum of money to return
	// ------------------------------------------------
	returnMoney(amount)
	{
		// The amount in cents
		let pennyAmount = amount;

		// The amount of bills, quarters, dimes, nickles, and cents to return
		let  bills= 0 , dollars = 0, quarters = 0, dimes = 0, nickles = 0, cents = 0, penniesLeftOver=0.0;
		
		// Do we have more than a dollar bill?
		// If so, then lets convert to cents
		if(amount >=1)
		{
			bills = amount * 100;

		}
	
		// The amount of dollars
		dollars = Math.floor(bills / 100);
		
		// How much money is left over

		penniesLeftOver= this.ImproperCheck(pennyAmount %( (dollars * 100)/100), pennyAmount);
	 	

		// Let's figure the number of quarters
		quarters = Math.floor(penniesLeftOver *100  / 25);
	

		// Recompute the remaining amount
		penniesLeftOver	= this.ImproperCheck( pennyAmount % ((dollars * 100 + quarters * 25)/100) , pennyAmount);	
		
		// Computer the number of dimes
		dimes = Math.floor(penniesLeftOver *100  / 10);
		

		// Compute the pennies left over
		penniesLeftOver = this.ImproperCheck(pennyAmount % ((dollars * 100 + quarters * 25 + dimes * 10)/100), pennyAmount);	

	
		// Compute the nickles
		nickles = (Math.floor(penniesLeftOver*100  / 5));
	
		// Compute the pennies left over
		penniesLeftOver = this.ImproperCheck(pennyAmount % ((dollars * 100 + quarters * 25 + dimes * 10 + nickles * 5)/100), pennyAmount);	
		


		// The number of cents
		cents = Math.floor(penniesLeftOver*100);

		console.log("Returning a sum of ",  this.ImproperCheck(Math.floor(dollars * 100 + quarters * 25 + dimes * 10 + nickles * 5 + cents), pennyAmount), " cents");
		console.log(dollars, " dollars");
		console.log(quarters, " quarters");
		console.log(dimes, " dimes");
		console.log(nickles, " nickles");
		console.log(cents, " cents");
		
		
	}
	
	// Turns on the vending machine
	turnOn ()
	{   
		this.intialItems();
		//this.itemRequest();	
        this.itemRequest();
	}
}

let water = new item("Water",0.50,5);
let Soda = new item("Soda",0.99,10);
let Pizza = new item("Pizza",1.99,15);
let Taco = new item("Taco",3.99,20);
let Tesla = new item("Tesla",850000.00,25);

//let vm = new VendingMachine(["Water", "Soda", "Pizza", "Taco", "Tesla"], [.50, .99, 1.99, 3.99, 850000.00],  [5, 10, 15, 20, 25]);// fixed added mock records for stock items
let listofitems = [water,Soda,Pizza,Taco,Tesla];
let vm = new VendingMachine(listofitems);

// fixed change var to let variable 

vm.turnOn();

