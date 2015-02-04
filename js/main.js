
var schelling = {
	//variables






	//methods
	updateGameBoard: function(size){
		$("#gameboard").html("");
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

	startGame: function(){

	},

	stopGame: function(){

	},

	resetGame: function(){
		//update board
		schelling.updateGameBoard($("#boardSize").val());
		//clear scores

		//start game
	}


}

$(document).ready(function(){

	$("#similarPercentageText").val($("#similarPercentage").val());
	$("#redPercentageText").val($("#redPercentage").val());
	$("#bluePercentageText").val($("#bluePercentage").val());
	$("#emptyPercentageText").val($("#emptyPercentage").val());
	$("#boardSizeText").val($("#boardSize").val());
	$("#delayTimeText").val($("#delayTime").val());

	$("#similarPercentage").on('input', function(){
		$("#similarPercentageText").val($("#similarPercentage").val());
	});
	$("#redPercentage").on('input', function(){
		$("#redPercentageText").val($("#redPercentage").val());
	});
	$("#bluePercentage").on('input', function(){
		$("#bluePercentageText").val($("#bluePercentage").val());
	});
	$("#emptyPercentage").on('input', function(){
		$("#emptyPercentageText").val($("#emptyPercentage").val());
	});
	$("#boardSize").on('input', function(){
		$("#boardSizeText").val($("#boardSize").val());
	});
	$("#delayTime").on('input', function(){
		$("#delayTimeText").val($("#delayTime").val());
	});

	schelling.updateGameBoard($("#boardSize").val());

	$("#resetButton").click(function(){
		schelling.resetGame();
	});


});