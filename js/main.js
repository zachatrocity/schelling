$(document).ready(function(){

	$("#similarPercentageText").val($("#similarPercentage").val());
	$("#redPercentageText").val($("#redPercentage").val());
	$("#bluePercentageText").val($("#bluePercentage").val());
	$("#emptyPercentageText").val($("#emptyPercentage").val());
	$("#boardSizePercentageText").val($("#boardSizePercentage").val());
	$("#delayTimeText").val($("#delayTime").val());

	$("#similarPercentage").change(function(){
		$("#similarPercentageText").val($("#similarPercentage").val());
	});
	$("#redPercentage").change(function(){
		$("#redPercentageText").val($("#redPercentage").val());
	});
	$("#bluePercentage").change(function(){
		$("#bluePercentageText").val($("#bluePercentage").val());
	});
	$("#emptyPercentage").change(function(){
		$("#emptyPercentageText").val($("#emptyPercentage").val());
	});
	$("#boardSizePercentage").change(function(){
		$("#boardSizePercentageText").val($("#boardSizePercentage").val());
	});
	$("#delayTime").change(function(){
		$("#delayTimeText").val($("#delayTime").val());
	});
});
