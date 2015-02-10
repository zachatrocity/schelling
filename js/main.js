"use strict";
var schelling = {
	//variables

	satisfiedPercentage: 0,
	sizeOfBoard: 0,
	percentSimilar: 0,


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
		var agent = $("#pos-" + atRow + "-" + atCol);
		var occupied = 0;
		var similar = 0;
		//for (var row = -1; row < 2; row++){
		//	for (var col = 0; col < 3; col++) {
		//		if (row == atRow && col == atCol){
		//			//skip
		//		}
		//		else if (row >= 0 && row < schelling.sizeOfBoard &&
		//			col >= 0 && col < schelling.sizeOfBoard){
		//			if(schelling.isAgent(row,col)){
		//				occupied++;
		//				var otherAgent = $("#pos-" + row + "-" + col);
		//				if((agent.hasClass('blue') && otherAgent.hasClass('blue')) ||
		//					(agent.hasClass('red') && otherAgent.hasClass('red'))){
		//					similar++;
		//				}
		//			}
		//		}
		//	};
		//}

		if (occupied == 0) {
			schelling.percentSimilar = 100;
		}
		else{
			schelling.percentSimilar = (similar/occupied) * 100;
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
		schelling.stepGame();
	});

	schelling.updateGameBoard($("#boardSize").val());

	$("#resetButton").click(function(){
		schelling.resetGame();
	});


});