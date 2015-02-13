"use strict";
var schelling = {
	//variables

	satisfiedPercentage: 0,
	sizeOfBoard: 0,
	percentSimilar: 0,
	unsatisfiedArray: [], 
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
			schelling.unsatisfiedArray.push([atRow,atCol]);
		}
	},

	makeRound: function(){
		for (var row = 0; row < schelling.sizeOfBoard; row++) {
			for (var col = 0; col < schelling.sizeOfBoard; col++) {
				if(!schelling.isSatisfied(row,col)){
					//do nothing
				} else{
					//add to list of unsatisfied
					schelling.unsatisfiedArray.push([row,col]);
				}
			};
		};

		schelling.currentRound += 1;
		$("currentRound").text(schelling.currentRound);
	},

	satisfyAgents: function(){
		var currentCell = $("#pos-" + row + "-" + col);
		var currentCellColor = schelling.colorOfAgent(row,col);

		while(!currentCell.hasClass('empty')){
			var randRow = Math.floor(Math.random() * schelling.boardSize) + 1;
			var randCol = Math.floor(Math.random() * schelling.boardSize) + 1;
			if($("#pos-" +randRow + "-" + randCol).hasClass('empty')){
				currentCell.removeClass(currentCellColor);
				$("#pos-" +randRow + "-" + randCol).removeClass('empty');
				$("#pos-" +randRow + "-" + randCol).addClass(currentCellColor);
			}
		}
	},

	startGame: function(){

	},

	stopGame: function(){

	},



	resetGame: function(){
		//update board
		schelling.updateGameBoard($("#boardSize").val());
		//clear scores

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