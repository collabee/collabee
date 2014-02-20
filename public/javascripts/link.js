function toolboxInit() {
	window.toolboxToggled = false;
	var toolbox = $('.screen-toolbox img');

	$(toolbox).on('click', function(e) {
		if (window.toolboxToggled) {
			$(toolbox).attr('src', 'images/screen/tool_nor.png');
			$('.target-screen').css('cursor', 'default');

		} else {
			$(toolbox).attr('src', 'images/screen/tool_sel.png');
			$('.target-screen').css('cursor', 'crosshair');

			$(document).ready(function() {
				$('.target-screen, ui-widget-content').imgAreaSelect({
					maxWidth : 200,
					maxHeight : 150,
					handles : true
				});
			});
		}

		window.toolboxToggled = ~window.toolboxToggled;
	});};

$(document).ready(function() {
	// toolbox
	toolboxInit();
});
