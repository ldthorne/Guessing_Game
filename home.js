var guessNum = 0;
var numGuesses = 5;
var guesses = [];

$(document).ready(function(){
	randInt = Math.floor(Math.random()*100)+1;
	console.log(randInt)
    $("#restartButton").hide();

});

function goToButton(){
	if (event.keyCode == 13){
		document.getElementById('submitGuess').click()
	}
}

var hintPopup = function(){
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
		location.reload();
	}
}


var response = function(){
	var guess = $("#submitNumber").val();
	guessNum++;
	var currentDifference = Math.abs(guess-randInt);
	var previousDifference = Math.abs(guesses[guesses.length-1]-randInt);
	if((guessNum>=numGuesses) && (guess != randInt)){//checks what number guess vs how many guesses allowed. if it's the last guess and the guess is the random number, don't trigger this body
		$("body").css("background-color","#FF0000");

		$("#submitGuess").prop("disabled",true); //disable the submit after number of guesses specified
		$("#answer > h1").text("You ran out of guesses. The number was "+randInt+"."); //tell them what the number was
		$("#answer > h2").text("Do you want to try again?"); //ask them to try again and create a button to click to restart
		$("#restartButton").show();
		$(".options").hide();
		
    }else if(guess>100 || guess<1){
    	alert("That guess was not between 1 and 100. Try again with a different number.");
    	guessNum--;
    }else if(guesses.indexOf(guess)!=-1){ //check to see if they've already guess that number before. if so, decrement the number of guesses so that it doesn't count
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
		$("#answer > h1").text("You're getting colder! You have "+(numGuesses-guessNum)+" guesses left.")
		guesses.push(guess);
		$("#guessList").append("<li>The guess of "+guess+" was colder than the previous guess.</li>");

	}else if((currentDifference<previousDifference) && (randInt!=guess)){//closer guess
		$("#answer > h1").text("You're getting warmer! You have "+(numGuesses-guessNum)+" guesses left.")
		guesses.push(guess);
		$("#guessList").append("<li>The guess of "+guess+" was warmer than the previous guess.</li>");

	}else if(Math.abs(guess-randInt)==Math.abs(guesses[guesses.length-1]-randInt)){
		$("#answer > h1").text("You're just as far away as you were on your last guess! You have "+(numGuesses-guessNum)+" guesses left.")
		guesses.push(guess);
	}else{ //their guess is equal to the number
		if(guessNum==1){ //check to see if the number of guesses taken is 1 for better grammar
			$("#answer > h1").text("You got it! It took you "+guessNum+" guess.")
		}else{
			$("#answer > h1").text("You got it! It took you "+guessNum + " guesses.")
		}
		$("body").css("background-color","#32CD32");
		$("#answer > h2").text("Do you want to play again?");
		$("#restartButton").show();
		$(".options").hide();
	}
}