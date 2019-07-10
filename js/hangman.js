// Constants
const maxGuesses = 6;

// Variables
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{word: "snake", hint: "It's a reptile"},
			 {word: "monkey", hint: "It's a mammal"},
			 {word: "beetle", hint: "It's an insect" }];
var hintUsed = false;

// Listeners
window.onload = startGame();

$(".letter").click(function(){
	checkLetter($(this).attr("id"));
	disableButton($(this));
});

$(".replayBtn").on("click", function (){
	location.reload(); // Reload the current page
});

$(".hintBtn").on("click", function (){
	displayHint();
	hintUsed = true;
	remainingGuesses -= 1;
	updateMan();
	disableButton($(this));	
	
	if (remainingGuesses <= 0) {
		endGame(false);
	}
});


function displayHint() {
	$("#word").append("<br />");
	$("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
	

}


// Functions
function startGame() {
	pickWord();
	initBoard();
	updateBoard();
	createLetters();
}

function initBoard(){
	for (var letter in selectedWord){
		board.push("_");
	}
	hintUsed = false;
}

function pickWord() {
	var randomInt = Math.floor(Math.random() * words.length);
	selectedWord = words[randomInt].word.toUpperCase();
	selectedHint = words[randomInt].hint;
}

function updateBoard(){
	$("#word").empty();
	
	for (var letter of board){
		document.getElementById("word").innerHTML += letter + " ";
	}
	
	if (hintUsed){
		displayHint();
	}
}

function createLetters(){
	for (var letter of alphabet) {
		$("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
	}
}

function checkLetter(letter) {
	var positions = new Array();
	
	for (var i = 0; i < selectedWord.length; i++){
		console.log(selectedWord)
		if (letter == selectedWord[i]){
			positions.push(i);
		}
	}
	
	if (positions.length > 0) {
		updateWord(positions, letter);
		
		if (!board.includes('_')) {
			endGame(true);
		}
		
	} else {
		remainingGuesses -= 1;
		updateMan();
	}
	
	if (remainingGuesses <= 0) {
		endGame(false);
	}
}


function updateWord(positions, letter) {
	for (var pos of positions) {
		board[pos] = letter;
	}
	
	updateBoard();
}

function updateMan() {
	$("#hangImg").attr("src", "img/stick_" + (maxGuesses - remainingGuesses) + ".png");
}

function endGame(win) {
	$("#letters").hide();
	
	if (win) {
		$('#won').show();
	} else {
		$('#lost').show();
	}
}

function disableButton(btn) {
	btn.prop("disabled", true);
	btn.attr("class", "btn btn-danger")
}

