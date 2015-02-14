"use strict";
var schelling = {
	//variables

	satisfiedPercentage: 0,
	sizeOfBoard: 0,
	percentSimilar: 0,
	agentSatisfiedPercentage: 0,
	stopButtonPressed: false,
	unsatisfiedArray: [], 
	emptyArray: [],
	currentRound: 0,

	//methods
	updateGameBoard: function(size){
		$("#gameboard").html("");
		schelling.sizeOfBoard = size;
		var emptyNum;
		var colorRandom;
		for (var i = 0; i < size; i++) {
			//make tr element
			$("#gameboard").append("<tr id='row-" + i + "' class='row'></tr>")
			for (var x = 0; x < size; x++) {
				//make td elements
				emptyNum = Math.floor(Math.random() * 100) + 1;

				if(emptyNum <= $("#emptyPercentage").val()){
					$("#row-" + i).append("<td id='pos-" + i + "-" + x +"' class='cell empty'>");
				}
				else{
					colorRandom = Math.floor(Math.random() * 100) + 1;
					if(colorRandom <= $("#redPercentage").val())
						$("#row-" + i).append("<td id='pos-" + i + "-" + x +"' class='cell red'>");
					else
						$("#row-" + i).append("<td id='pos-" + i + "-" + x +"' class='cell blue'>");
				}
			};
		};

		schelling.calcTotalSatisfiedPercentage();
		$("#similarity").html(schelling.agentSatisfiedPercentage);
	}, 

	isSatisfied: function(atRow, atCol){
		var occupied = 0;
		var similar = 0;
		var curColor = schelling.colorOfAgent(atRow, atCol);
		//make array of n,s,e,w,nw,ne, etc..
		var tdAdjacencies = [($("#pos-" + (atRow - 1) + "-" + atCol)),
							 ($("#pos-" + (atRow - 1) + "-" + (atCol + 1))),
							 ($("#pos-" + atRow + "-" + (atCol + 1))),
							 ($("#pos-" + (atRow + 1) + "-" + (atCol + 1))),
							 ($("#pos-" + (atRow + 1) + "-" + atCol)),
							 ($("#pos-" + (atRow + 1) + "-" + (atCol - 1))),
							 ($("#pos-" + atRow + "-" + (atCol - 1))),
							 ($("#pos-" + (atRow - 1) + "-" + (atCol - 1)))];

		$.each(tdAdjacencies, function(index, val) {
			if(!val.hasClass('empty') && val.hasClass('cell')){
				occupied++;
				if (val.hasClass(curColor)) {
					similar++;
				};
			}
		});	

		var simPer = (similar/occupied) * 100;
		if(simPer >= $("#similarPercentage")){
			//satisfied
		} else{
			schelling.unsatisfiedArray.push($("#pos-" +atRow + "-" + atCol));
		}
	},

	makeRound: function(){
		for (var row = 0; row < schelling.sizeOfBoard; row++) {
			for (var col = 0; col < schelling.sizeOfBoard; col++) {
				if($("#pos-" +row + "-" + col).hasClass('empty')){
					schelling.emptyArray.push($("#pos-" +row + "-" + col));
				}
				else{
					schelling.isSatisfied(row,col);
				}
			};
		};

		schelling.moveUnsatisfiedToRandomEmpty();
		schelling.unsatisfiedArray = [];

		schelling.calcTotalSatisfiedPercentage()
		$("#similarity").html(schelling.agentSatisfiedPercentage);

		schelling.currentRound += 1;
		$("#currentRound").html(schelling.currentRound);
	},

	moveUnsatisfiedToRandomEmpty: function(){
		$.each(schelling.unsatisfiedArray, function(index, val) {
			var tdColor = schelling.colorOfAgentFromObj(val);
			var rand = Math.floor(Math.random()*schelling.emptyArray.length);
			var randomEmptyTd = schelling.emptyArray[rand];
			//remove element from the empty array
			if(rand > -1){
				schelling.emptyArray.splice(rand, 1);
			}

			randomEmptyTd.removeClass('empty');
			randomEmptyTd.addClass(tdColor);
			val.removeClass(tdColor);
			val.addClass('empty');
			schelling.emptyArray.push(val);
		});

		schelling.emptyArray = [];
	},

	calcTotalSatisfiedPercentage: function(){
		var occupied = 0;
		var similar = 0;
		//make array of n,s,e,w,nw,ne, etc..
		for (var row = 0; row < schelling.sizeOfBoard; row++) {
			for (var col = 0; col < schelling.sizeOfBoard; col++) {
				var curColor = schelling.colorOfAgent(row, col);
				var tdAdjacencies = [($("#pos-" + (row - 1) + "-" + col)),
									 ($("#pos-" + (row - 1) + "-" + (col + 1))),
									 ($("#pos-" + row + "-" + (col + 1))),
									 ($("#pos-" + (row + 1) + "-" + (col + 1))),
									 ($("#pos-" + (row + 1) + "-" + col)),
									 ($("#pos-" + (row + 1) + "-" + (col - 1))),
									 ($("#pos-" + row + "-" + (col - 1))),
									 ($("#pos-" + (row - 1) + "-" + (col - 1)))];

				$.each(tdAdjacencies, function(index, val) {
					if(!val.hasClass('empty') && val.hasClass('cell')){
						occupied++;
						if (val.hasClass(curColor)) {
							similar++;
						};
					}
				});	
			}
		}

		if (occupied == 0) {
			schelling.agentSatisfiedPercentage = 100;
		} else{
			schelling.agentSatisfiedPercentage = Math.floor((similar/occupied) * 100) + "%";
		}
	},

	startGame: function(){
		schelling.stopButtonPressed = false;
		setInterval(function(){
			schelling.makeRound();

			if(schelling.agentSatisfiedPercentage == "100%" || !schelling.stopButtonPressed){
				clearInterval();
			}

		}, $("#delayTime").val());
	},

	stopGame: function(){
		schelling.stopButtonPressed = true;
	},



	resetGame: function(){
		//update board
		schelling.updateGameBoard($("#boardSize").val());
		//clear scores
		$("#currentRound").html(0);
		//start game
	},

	//utility methods
	isAgent: function(row, col){
		var result = false;
		var element = $("#pos-" + row + "-" + col);

		if (element.hasClass('blue') || element.hasClass('red')){
			result = true;
		}
		return result;
	},

	colorOfAgentFromObj: function(element){
		var result = "";

		if (element.hasClass('blue')){
			result = "blue";
		} else if (element.hasClass('red')){
			result = "red";
		}
		return result;
	},

	colorOfAgent: function(row, col){
		var result = "";
		var element = $("#pos-" + row + "-" + col);

		if (element.hasClass('blue')){
			result = "blue";
		} else if (element.hasClass('red')){
			result = "red";
		}
		return result;
	}
}

$(document).ready(function(){
	$("#similarPercentageText").val($("#similarPercentage").val());
	$("#redPercentageText").val($("#redPercentage").val());
	$("#bluePercentageText").val($("#bluePercentage").val());
	$("#emptyPercentageText").val($("#emptyPercentage").val());
	$("#boardSizeText").val($("#boardSize").val());
	$("#delayTimeText").val($("#delayTime").val());

	schelling.sizeOfBoard = $("#boardSizeText").val();
	schelling.similarPercentage = $("#similarPercentage").val();

	$("#similarPercentage").on('input', function(){
		$("#similarPercentageText").val($("#similarPercentage").val());
	});
	$("#redPercentage").on('input', function(){
		$("#redPercentageText").val($("#redPercentage").val());
		$("#bluePercentage").val((100 - $("#redPercentage").val()));
		$("#bluePercentageText").val($("#bluePercentage").val());
	});
	$("#bluePercentage").on('input', function(){
		$("#bluePercentageText").val($("#bluePercentage").val());
		$("#redPercentage").val((100 - $("#bluePercentage").val()));
		$("#redPercentageText").val($("#redPercentage").val());
	});
	$("#emptyPercentage").on('input', function(){
		$("#emptyPercentageText").val($("#emptyPercentage").val());
	});
	$("#boardSize").on('input', function(){
		$("#boardSizeText").val($("#boardSize").val());
		schelling.updateGameBoard($("#boardSize").val());
	});
	$("#delayTime").on('input', function(){
		$("#delayTimeText").val($("#delayTime").val());
	});

	$("#startButton").click(function(event) {
		schelling.startGame();
	});

	$("#stopButton").click(function(event) {
		schelling.stopGame();
	});

	$("#stepButton").click(function(event) {
		schelling.makeRound();
	});

	schelling.updateGameBoard($("#boardSize").val());

	$("#resetButton").click(function(){
		schelling.resetGame();
	});


});