// CONSTANTS
const maxGuesses = 6;

// VARIABLES
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var hintUsed = false;
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{word: "snake", hint: "It's a reptile"},
			 {word: "monkey", hint: "It's a mammal"},
			 {word: "beetle", hint: "It's an insect" }];


// LISTENERS

// Initialize game
window.onload = startGame();

// Click a letter
$(".letter").click(function(){
	checkLetter($(this).attr("id"));
	disableButton($(this));
});

// Replay button clicked
$(".replayBtn").on("click", function (){
	location.reload(); // Reload the current page
});

// Hint button clicked
$(".hintBtn").on("click", function (){
	hintUsed = true;
	
	// Use one turn
	remainingGuesses -= 1;
	
	// Remove after use
	$(this).hide();
	
	// End game if last point
	if (remainingGuesses <= 0) {
		endGame(false);
	}
	
	updateMan();
	updateBoard();
});


// FUNCTIONS
function startGame() {
	pickWord();
	initBoard();
	updateBoard();
	createLetters();
}

function pickWord() {
	var randomInt = Math.floor(Math.random() * words.length);
	selectedWord = words[randomInt].word.toUpperCase();
	selectedHint = words[randomInt].hint;
}

function initBoard(){
	for (var letter in selectedWord){
		board.push("_");
	}
	hintUsed = false;
}

function updateBoard(){
	$("#word").empty();
	
	for (var letter of board){
		document.getElementById("word").innerHTML += letter + " ";
	}
	
	if (hintUsed){
		displayHint();
	}
	
	updateTurns();
}

function updateTurns(){
	$("#points-remaining").empty();
	$("#points-remaining").append("Turns remaining: " + remainingGuesses);
}

function createLetters(){
	for (var letter of alphabet) {
		$("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
	}
}

function displayHint() {
	$("#word").append("<br />");
	$("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
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
	
	updateTurns();
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

function disableButton(btn) {
	btn.prop("disabled", true);
	btn.attr("class", "btn btn-danger")
}

function endGame(win) {
	$("#letters").hide();
	
	if (win) {
		$('#won').show();
	} else {
		$(".hintBtn").hide();
		$('#lost').show();
	}
}

