var guessNum = 0;
var numGuesses = 5; //max number of guesses
var guesses = []; //array to store all of the guesses

$(document).ready(function(){
	randInt = Math.floor(Math.random()*100)+1; //create random number between 1 and 100;
    $("#restartButton").hide(); //hide the button to restart the game when the page first loads

});

function goToButton(){ //if "enter" key is pressed, go to the function called when the "submit" button is pressed
	if (event.keyCode == 13){
		document.getElementById('submitGuess').click()
	}
}

var hintPopup = function(){ //alert the user with answer if "hint" button clicked
	alert(randInt);
};

var resetGame = function(){ //if they hit the reset button, reload the page (which resets the random number and the number of guesses)
	var yesNo = confirm("Are you sure you want to reset the game?"); //confirm that they want to reset the game
	if(yesNo){
		location.reload();
	}
}
var restartGame = function(){ //if they hit the reset button, reload the page (which resets the random number and the number of guesses)
	var yesNo = confirm("Are you sure you want to restart the game?"); //confirm that they want to reset the game
	if(yesNo){
		location.reload(); //reload the page (resets the number of guesses and the random number)
	}
}


var response = function(){
	var guess = $("#submitNumber").val();
	guessNum++;
	var currentDifference = Math.abs(guess-randInt);
	var previousDifference = Math.abs(guesses[guesses.length-1]-randInt);
	if((guessNum>=numGuesses) && (guess != randInt)){ //checks what number guess vs how many guesses allowed. if it's the last guess and the guess is the random number, don't trigger this body
		$("body").css("background-color","#FF0000"); //change background color
		$("#submitGuess").prop("disabled",true); //disable the submit after number of guesses specified
		$("#answer > h1").text("You ran out of guesses. The number was "+randInt+"."); //tell them what the number was
		$("#answer > h2").text("Do you want to try again?"); //ask them to try again and create a button to click to restart
		$("#restartButton").show(); //show the text and restart button 
		$(".options").hide(); //hide the redundant and unnecessary reset and hint buttons
		
    }else if(guess>100 || guess<1){ //error handling to make sure they guess a number between 1 and 100. decrement guess number so it doesn't count against them
    	alert("That guess was not between 1 and 100. Try again with a different number.");
    	guessNum--;
    }else if(guesses.indexOf(guess)!=-1){ //check to see if they've already guessed that number before. if so, decrement the number of guesses so that it doesn't count
    	alert("You've already guessed this! Try again");
    	guessNum--;
	}else if(guess>randInt && guessNum == 1){ //if their guess is higher than the number
		$("#answer > h1").text("Too high! You have "+(numGuesses-guessNum)+" guesses left.")
		guesses.push(guess);
		$("#guessList").append("<li>Your first guess, "+guess+" was too high.</li>");

	}else if(guess<randInt && guessNum == 1){ //if their guess is lower than the number
		$("#answer > h1").text("Too low! You have "+(numGuesses-guessNum)+" guesses left.")
		guesses.push(guess)	
		$("#guessList").append("<li>Your first guess, "+guess+" was too low.</li>");
	
	}else if((currentDifference>previousDifference) && (randInt!=guess)){//further away guess
		if(numGuesses-guessNum==1){
			$("#answer > h1").text("You're getting colder! You have "+(numGuesses-guessNum)+" guess left.")

		}else{
			$("#answer > h1").text("You're getting colder! You have "+(numGuesses-guessNum)+" guesses left.")
		}		
		guesses.push(guess);
		$("#guessList").append("<li>The guess of "+guess+" was colder than the previous guess.</li>");

	}else if((currentDifference<previousDifference) && (randInt!=guess)){//closer guess
		if(numGuesses-guessNum==1){
			$("#answer > h1").text("You're getting warmer! You have "+(numGuesses-guessNum)+" guess left.")

		}else{
			$("#answer > h1").text("You're getting warmer! You have "+(numGuesses-guessNum)+" guesses left.")
		}
		guesses.push(guess);
		$("#guessList").append("<li>The guess of "+guess+" was warmer than the previous guess.</li>");

	}else if(Math.abs(guess-randInt)==Math.abs(guesses[guesses.length-1]-randInt)){ //if the guess and the previous guess were the same distance away from the random num
		$("#answer > h1").text("You're just as far away as you were on your last guess! You have "+(numGuesses-guessNum)+" guesses left.")
		guesses.push(guess);
	}else{ //their guess is equal to the number
		if(guessNum==1){ //check to see if the number of guesses taken is 1 for better grammar
			$("#answer > h1").text("You got it! It took you "+guessNum+" guess.")
		}else{
			$("#answer > h1").text("You got it! It took you "+guessNum + " guesses.")
		}
		$("#submitGuess").prop("disabled",true); //disable the submit button
		$("body").css("background-color","#32CD32"); //change the background color
		$("#answer > h2").text("Do you want to play again?"); 
		$("#restartButton").show(); //show the restart button
		$(".options").hide(); //hide unnecessary hint and reset buttons
	}
}