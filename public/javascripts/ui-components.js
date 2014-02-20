function dragImageInit() {
	var src1 = "images/screen/drag_component_1.png";
	var src2 = "images/screen/drag_component_2.png";

	var component1 = $("<img class='not-moved ui-widget-content' src='" + src1 + "' />");
	var component2 = $("<img class='not-moved ui-widget-content' src='" + src2 + "' />");

	$(component1).css({
		position : "absolute",
		left : 42,
		top : 195,
		width : 252,
		"z-index" : 3,
	}).appendTo('body').draggable();
	
	$(component2).css({
		position : "absolute",
		left : 128,
		top : 277,
		"z-index" : 3,
	}).appendTo('body').draggable();;
	
	$('.ui-widget-content').on('mouseup', function(e) {
		$(this).removeClass('not-moved');
	});};
$(document).ready(function() {
	dragImageInit();

	$('#button-ui-component').on('click', function(e) {
		dragImageInit();

	});
});
