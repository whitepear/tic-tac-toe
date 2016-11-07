// Some of the opponent programming is not necessary to create an unbeatable opponent,
// instead, it has been included because it increases the computer's win rate

var userMark; // stores type of user input (X or O) 
var computerMark; // stores type of computer input (X or O)		 
var startingMove = Math.random() < 0.5 ? '5' : '7'; // randomly choose either center or corner square for computer's start position 
var $square = $('.col-xs-4'); // jquery variable - targets each square on board
var availableMoves = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // pool of untaken moves
var unavailableMoves = []; // pool of moves made by program and user
var computerMoves = []; // pool of moves made by program
var userMoves = []; // pool of moves made by user
var winConditions = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'], ['1','5','9'], ['3','5','7']];
// array of move sets that trigger win-state in game

var modalOptions = {
	'backdrop': 'static',
	'keyboard': false
}; // options which prevent user from closing modal without clicking button

var moveMade = false; // boolean that checks if computer made a move
var winState = false; // boolean that checks if someone has won
var playerFirst; // boolean that indicates if player makes first move
var userWon;
var computerWon;
var noneWon; // booleans that check which win-state variant was triggered

$('#startModal').modal(modalOptions); // open modal prompting side selection 

$('#sideX').click(function() {
	userMark = 'X';
	computerMark = 'O';		
	playerFirst = $('#startModalFirst').is(":checked"); // check if checkbox is ticked
	$('input').prop('checked', false); // reset all checkboxes		 
	if (playerFirst === false) {
		firstMove(startingMove);
	}
	$('#startModal').modal('hide');		
}); // sets user input as X, computer input as O, calls firstMove

$('#sideO').click(function() {
	userMark = 'O';
	computerMark = 'X';
	playerFirst = $('#startModalFirst').is(":checked"); // check if checkbox is ticked
	$('input').prop('checked', false);	// reset all checkboxes
	if (playerFirst === false) {
		firstMove(startingMove);
	}
	$('#startModal').modal('hide');
}); // sets user input as O, computer input as X, calls firstMove

function firstMove(position) {
	$square.css('pointer-events', 'none'); // disable clicks on squares
	$('#' + position).text(computerMark); // take square 
	computerMoves.push(position); // push taken square to computerMoves
	unavailableMoves.push(position); // push taken square to unavailableMoves
	var removeThis = availableMoves.indexOf(position); // find index of taken square within availableMoves array
	availableMoves.splice(removeThis, 1); // remove taken square from availableMove array
	$square.css('pointer-events', 'auto'); // make all squares clickable
	for (var i = 0; i < unavailableMoves.length; i++) {
		$('#' + unavailableMoves[i]).css('pointer-events', 'none');
	} // iterate over taken moves in array, and remove clickable state on the corresponding squares
} // computer moves first, takes square 5 or 7, update arrays to reflect change

$square.click(function() {
	$square.css('pointer-events', 'none'); // disable clicks on squares
	$(this).text(userMark); // place X or O into clicked square
	var $position = $(this).attr('id'); // stores id value of clicked square
	userMoves.push($position); // push clicked square position to array of moves taken by user
	unavailableMoves.push($position) // push clicked square position to array of moves taken by user and computer
	var removeThis = availableMoves.indexOf($position); // find index of $position within availableMoves array
	availableMoves.splice(removeThis, 1); // remove $position value from availableMove array
	userWinCheck(); // call function that checks if user has won
	
	if (winState === false) {
	// START COMPUTER PROGRAMMING
		computerWinTake();
		if (moveMade === false) {
			computerMoveBlock();
		}

		// START: COMPUTER FIRST-MOVE STRATEGIES FOR CENTER AND CORNER STARTING POSITIONS
		if (moveMade === false && startingMove === '5' && playerFirst === false) {
			if (userMoves.length === 1) {
				switch (userMoves[0]) {
					case '1':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '2':
						$('#7').text(computerMark);
						moveMade = true;
						computerMoveUpdate('7');
						break;
					case '3':
						$('#7').text(computerMark);
						moveMade = true;
						computerMoveUpdate('7');
						break;	
					case '4':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '6':
						$('#7').text(computerMark);
						moveMade = true;
						computerMoveUpdate('7');
						break;
					case '7':
						$('#3').text(computerMark);
						moveMade = true;
						computerMoveUpdate('3');
						break;		
					case '8':
						$('#3').text(computerMark);
						moveMade = true;
						computerMoveUpdate('3');
						break;
					case '9':
						$('#1').text(computerMark);
						moveMade = true;
						computerMoveUpdate('1');
						break;					
				} // end switch for first user move
			} // if this is first user-move of game

			if (userMoves.length === 2) {
				if (computerMoves[1] === '1' && userMoves[1] === '2') {
					$('#7').text(computerMark);
					moveMade = true;
					computerMoveUpdate('7');
				} else if (computerMoves[1] === '1' && userMoves[1] === '4') {
					$('#3').text(computerMark);
					moveMade = true;
					computerMoveUpdate('3');
				} else if (computerMoves[1] === '3' && userMoves[1] === '2') {
					$('#9').text(computerMark);
					moveMade = true;
					computerMoveUpdate('9');
				} else if (computerMoves[1] === '3' && userMoves[1] === '6') {	
					$('#1').text(computerMark);
					moveMade = true;
					computerMoveUpdate('1');
				} else if (computerMoves[1] === '7' && userMoves[1] === '4') {
					$('#9').text(computerMark);
					moveMade = true;
					computerMoveUpdate('9');
				} else if (computerMoves[1] === '7' && userMoves[1] === '8') {
					$('#1').text(computerMark);
					moveMade = true;
					computerMoveUpdate('1');
				} else if (computerMoves[1] === '9' && userMoves[1] === '6') {
					$('#7').text(computerMark);
					moveMade = true;
					computerMoveUpdate('7');
				} else if (computerMoves[1] === '9' && userMoves[1] === '8') {
					$('#3').text(computerMark);
					moveMade = true;
					computerMoveUpdate('3');
				}
			} // respond to second user-move of the game, will only be reached if first user-move was on a corner
		} // respond to user-moves (computer starting position is center square, and went first)

		if (moveMade === false && startingMove === '7' && playerFirst === false) {
			if (userMoves.length === 1) {
				switch (userMoves[0]) {
					case '1':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '2':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '3':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '4':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '5':
						$('#3').text(computerMark);
						moveMade = true;
						computerMoveUpdate('3');
						break;
					case '6':
						$('#9').text(computerMark);
						moveMade = true;
						computerMoveUpdate('9');
						break;
					case '8':
						$('#1').text(computerMark);
						moveMade = true;
						computerMoveUpdate('1');
						break;
					case '9':
						$('#1').text(computerMark);
						moveMade = true;
						computerMoveUpdate('1');
						break; 	
				} // end switch for first user-move
			} // respond to first user-move

			if (userMoves.length === 2) {
				if (computerMoves[1] === '9' && (userMoves[0] === '1' || userMoves[0] === '4')) {
					$('#3').text(computerMark);
					moveMade = true;
					computerMoveUpdate('3');
				} else if (computerMoves[1] === '9' && (userMoves[0] === '3' || userMoves[0] === '6')) {
					$('#1').text(computerMark);
					moveMade = true;
					computerMoveUpdate('1');
				} else if (computerMoves[1] === '1' && (userMoves[0] === '8' || userMoves[0] === '9')) {
					$('#3').text(computerMark);
					moveMade = true;
					computerMoveUpdate('3');
				}
			} // respond to second user-move
		} // respond to user-moves (computer starting position is bottom left square, and went first)
		// END

		// START: FIRST-MOVE STRATEGIES FOR FIRST MOVE BY PLAYER
		if (moveMade === false && playerFirst === true) {
			if (userMoves.length === 1) {
				if (userMoves[0] === '5') {
					$('#7').text(computerMark);
					moveMade = true;
					computerMoveUpdate('7');	
				} else {
					$('#5').text(computerMark);
					moveMade = true;
					computerMoveUpdate('5');
				}					
			} // respond to first user-move
			
			if (userMoves.length === 2) {
				if ((userMoves[0] === '7' && userMoves[1] === '3') ||
					(userMoves[0] === '9' && userMoves[1] === '1') ||
					(userMoves[0] === '3' && userMoves[1] === '7') ||
					(userMoves[0] === '1' && userMoves[1] === '9')) {
					$('#2').text(computerMark);
					moveMade = true;
					computerMoveUpdate('2');
				} else if ((userMoves[0] === '6' || userMoves[0] === '8') && (userMoves[1] === '8' || userMoves[1] === '6')) {
					$('#3').text(computerMark);
					moveMade = true;
					computerMoveUpdate('3');
				} else if ((userMoves[0] === '6' || userMoves[0] === '1') && (userMoves[1] === '1' || userMoves[1] === '6')) {
					$('#3').text(computerMark);
					moveMade = true;
					computerMoveUpdate('3');
				} else if ((userMoves[0] === '8' && userMoves[1] === '3') || (userMoves[0] === '6' && userMoves[1] === '7')) {
					$('#9').text(computerMark);
					moveMade = true;
					computerMoveUpdate('9');
				} else if (userMoves[0] === '8' && userMoves[1] === '1') {
					$('#7').text(computerMark);
					moveMade = true;
					computerMoveUpdate('7');
				} // respond to second user-move of a particular pattern	
			} // respond to second user-move
		}
		// END

		if (moveMade === false) {
			$('#' + availableMoves[0]).text(computerMark);
			moveMade = true;
			computerMoveUpdate(availableMoves[0]);
		} // otherwise, just take an available move

		computerWinCheck(); // check if computer made winning move
		moveMade = false;
	} // end winstate check
	// END COMPUTER PROGRAMMING

	$square.css('pointer-events', 'auto'); // make all squares clickable
	for (var i = 0; i < unavailableMoves.length; i++) {
		$('#' + unavailableMoves[i]).css('pointer-events', 'none');
	} // iterate over taken moves in array, and remove clickable state on the corresponding squares
}); // end .click(), fires whenever user clicks a square

function userWinCheck() {		
	for (var i = 0; i < winConditions.length; i++) {			
		var positionCheck = winConditions[i].every(function(number, numberIndex) {
			return userMoves.indexOf(winConditions[i][numberIndex]) > -1;
		});	
		
		if(positionCheck) {
			userWon = true;
			$('#userWinModal').modal(modalOptions);
			winState = true;				
			break;
		} // if win-state set is matched, display userWinModal and break loop
	}

	if(availableMoves.length == 0 && winState == false) {
		noneWon = true;
		$('#tieModal').modal(modalOptions);
	} // if there are no moves left and nobody has won, call tieModal
} // function checks if user's set of moves match any of the win-state move sets	

function computerMoveUpdate(move) {
	computerMoves.push(move);
	unavailableMoves.push(move);
	var removeThis = availableMoves.indexOf(move); // find index of $position within availableMoves array
	availableMoves.splice(removeThis, 1); // remove $position value from availableMove array
} // update arrays with taken move

function computerWinTake() {
	var a, b, c; // storage vars for checking for presence of moves within computerMoves that match a win-state set
	for (var i = 0; i < winConditions.length; i++) {
		a = computerMoves.indexOf(winConditions[i][0]); // check computerMoves for presence of a win-state move
		b = computerMoves.indexOf(winConditions[i][1]);
		c = computerMoves.indexOf(winConditions[i][2]);		
		
		if (a > -1 && b > -1) {
			if (availableMoves.indexOf(winConditions[i][2]) > -1) {
				$('#' + winConditions[i][2]).text(computerMark);
				moveMade = true;
				computerMoveUpdate(winConditions[i][2]);
				break;
			}
		} else if (a > -1 && c > -1) {
			if (availableMoves.indexOf(winConditions[i][1]) > -1) {
				$('#' + winConditions[i][1]).text(computerMark);
				moveMade = true;
				computerMoveUpdate(winConditions[i][1]);
				break;
			}
		} else if (b > -1 && c > -1) {
			if (availableMoves.indexOf(winConditions[i][0]) > -1) {
				$('#' + winConditions[i][0]).text(computerMark);
				moveMade = true;		
				computerMoveUpdate(winConditions[i][0]);			
				break;
			}
		} // if two of three moves in computerMoves matches a win-state set, take the third move in the set if available
	}
} // check if a winning move can be made by computer, and if so, take it

function computerMoveBlock() {	
	var a, b, c; 
	for (var i = 0; i < winConditions.length; i++) {
		a = winConditions[i][0];
		b = winConditions[i][1];
		c = winConditions[i][2];
		var aPresent = userMoves.indexOf(a);
		var bPresent = userMoves.indexOf(b);
		var cPresent = userMoves.indexOf(c);
		// storage vars for checking for presence of moves within userMoves that match a win-state set

		if (aPresent > -1 && bPresent > -1) {
			if (availableMoves.indexOf(c) > -1) {
				$('#' + c).text(computerMark);
				moveMade = true;
				computerMoveUpdate(c);
				break;
			}
		} else if (aPresent > -1 && cPresent > -1) {
			if (availableMoves.indexOf(b) > -1) {
				$('#' + b).text(computerMark);
				moveMade = true;
				computerMoveUpdate(b);
				break;
			}
		} else if (bPresent > -1 && cPresent > -1) {
			if (availableMoves.indexOf(a) > -1) {
				$('#' + a).text(computerMark);
				moveMade = true;
				computerMoveUpdate(a);
				break;
			}
		} // if two of three moves in userMoves matches a win-state set, block the third move if it is available
	}
} // check if user is about to make a winning move, and if so, block it


function computerWinCheck() {		
	for (var i = 0; i < winConditions.length; i++) {			
		var positionCheck = winConditions[i].every(function(number, numberIndex) {
			return computerMoves.indexOf(winConditions[i][numberIndex]) > -1;
		});	
		
		if(positionCheck) {
			computerWon = true;
			$('#computerWinModal').modal(modalOptions);
			winState = true;	
			break;			
		} // if win-state set is matched, display computerWinModal and break loop
	}
	
	if(availableMoves.length == 0 && winState == false) {
		noneWon = true;
		$('#tieModal').modal(modalOptions);
	} // if there are no moves left and nobody has won, call tieModal
} // function checks if computer's set of moves match any of the win-state move sets	

$('.playAgain').click(function() {
	winState = false; 
	startingMove = Math.random() < 0.5 ? '5' : '7'; // roll a new starting move
	$square.text(''); // remove marks on squares
	$square.css('pointer-events', 'auto'); // unlock all squares to be clicked		
	availableMoves = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	unavailableMoves = []; 
	computerMoves = [];
	userMoves = [];	// reset arrays to initial conditions
	if (computerWon === true) {
		playerFirst = $('#computerWinFirst').is(":checked"); // check if checkbox is ticked
	} else if (noneWon === true) {
		playerFirst = $('#tieFirst').is(":checked"); // check if checkbox is ticked
	} else if (userWon === true) {
		playerFirst = $('#userWinFirst').is(":checked"); // check if checkbox is ticked
	}		
	$('input').prop('checked', false); // reset all checkboxes	
	computerWon = false;
	noneWon = false;
	userWon = false; // reset all win-state booleans	 
	if (playerFirst === false) {
		firstMove(startingMove);	
	}		
	$('#userWinModal, #computerWinModal, #tieModal').modal('hide'); // close modal		
}); // reset play conditions to allow new game to take place, calls firstMove