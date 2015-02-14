"use strict";
var schelling = {
	//variables

	satisfiedPercentage: 0,
	sizeOfBoard: 0,
	percentSimilar: 0,
	agentSatisfiedPercentage: 0,
	unsatisfiedArray: [], 
	emptyArray: [],
	currentRound: 0,
	boardSatisfied: false,
	gameInterval: 0,

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

		schelling.findUnsatisfiedCells()
		schelling.calcTotalSatisfiedPercentage();
		schelling.emptyArray = [];
		schelling.unsatisfiedArray = [];
		clearInterval(schelling.gameInterval);
		schelling.gameInterval = 0;
	}, 

	findUnsatisfiedCells: function(){
		var occupied = 0;
		var similar = 0;

		for (var atRow = 0; atRow < schelling.sizeOfBoard; atRow++) {
			for (var atCol = 0; atCol < schelling.sizeOfBoard; atCol++) {
				if(!$("#pos-" +atRow + "-" + atCol).hasClass('empty')){
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
					if(simPer >= $("#similarPercentage").val()){
						//satisfied
					} else{
						schelling.unsatisfiedArray.push($("#pos-" +atRow + "-" + atCol));
					}

					similar = 0;
					occupied = 0;
				} else{
					schelling.emptyArray.push($("#pos-" +atRow + "-" + atCol));
				}
			}
		}

		if(schelling.unsatisfiedArray.length > 0)
			schelling.boardSatisfied = false;
		else{
			schelling.boardSatisfied = true;
		}
	},

	makeRound: function(){
		schelling.findUnsatisfiedCells();
		if (!schelling.boardSatisfied){//if board is not satisfied

			schelling.moveUnsatisfiedToRandomEmpty(); //move them
			schelling.unsatisfiedArray = []; //clear for next round

			schelling.calcTotalSatisfiedPercentage();
			schelling.currentRound += 1;
			$("#currentRound").html(schelling.currentRound);
		} else{
			//everything is satisfied
			clearInterval(schelling.gameInterval);
		}
	},

	moveUnsatisfiedToRandomEmpty: function(){
		for (var i = 0; i < schelling.unsatisfiedArray.length; i++){
			var td = schelling.unsatisfiedArray[i];
			var tdColor = schelling.colorOfAgentFromObj(td);
			var rand = Math.floor(Math.random()*schelling.emptyArray.length);
			var randomEmptyTd = schelling.emptyArray[rand];
			//remove element from the empty array and unsatisfied array

			randomEmptyTd.removeClass('empty');
			randomEmptyTd.addClass(tdColor);
			td.removeClass(tdColor);
			td.addClass('empty');
			schelling.emptyArray[rand] = td;
		}

		schelling.emptyArray = [];
	},

	startGame: function(){
		if (schelling.gameInterval == 0){
			schelling.gameInterval = setInterval(function(){schelling.makeRound();}, $("#delayTime").val());
		}
	},

	stopGame: function(){
		clearInterval(schelling.gameInterval);
		schelling.gameInterval = 0;
	},

	calcTotalSatisfiedPercentage: function(){
		var totalTds = $("#boardSize").val() * $("#boardSize").val();
			schelling.agentSatisfiedPercentage = (totalTds - schelling.unsatisfiedArray.length) / totalTds;
			$("#satisfied").html(Math.floor(schelling.agentSatisfiedPercentage * 100) + "%");
	},

	resetGame: function(){
		//update board
		schelling.updateGameBoard($("#boardSize").val());
		//clear scores
		schelling.currentRound = 0;
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