$(document).ready(function() {
	$(".draggable").draggable({
		stop : function(event, ui) {
			var top = $(this).offset().top;
			var left = $(this).offset().left;
			$(this).append("top:" + top + ", left:" + left);
		}
	});
	
	$('#button-ui-component').on('click', function(e) {
		$('.main-content').css('cursor', 'default');
		$('.main-content').off();
	});
});
