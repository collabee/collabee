function toolboxInit() {
	window.toolboxToggled = false;
	var toolbox = $('.screen-toolbox img');

	$(toolbox).on('click', function(e) {
		if (window.toolboxToggled) {
			$(toolbox).attr('src', 'images/screen/tool_nor.png');
			$('.target-screen').css('cursor', 'default');

			$(document).ready(function() {
				$('.target-screen, ui-widget-content').imgAreaSelect({
					disable: true
				});
			});

		} else {
			$(toolbox).attr('src', 'images/screen/tool_sel.png');
			$('.target-screen').css('cursor', 'crosshair');

			$(document).ready(function() {
				$('.target-screen, ui-widget-content').imgAreaSelect({
					handles : true,
					onSelectEnd: function(img, selection) {
						
						var template = _.template($('#tmpl_linkPanel').html());
						
						var panel = template();
						$(panel).css({
							position: "absolute",
							left: "70%",
							top: "30%",
							"z-index" : 3
						}).appendTo('body');
						
						console.log('onSelectChange');
						
						$('#link-btn-create, #link-btn-cancle').off();
						$('#link-btn-create').on('click', function(e) {
							
							$('#panel-link').remove();
							console.log(selection);
							createLinkedArea(selection);
							$('.target-screen, ui-widget-content').imgAreaSelect({
								remove : true
							});
							
						});

						$('#link-btn-cancel').on('click', function(e) {
							$('#panel-link').remove();
							$('.target-screen, ui-widget-content').imgAreaSelect({
								remove : true
							});
						});
					},
				});
			});
		}

		window.toolboxToggled = ~window.toolboxToggled;
	});};

function createLinkedArea(selection) {
	
	var img = $('.target-screen');
	console.log($(img).offset());
	var area = "<a class='area'></a>";
	
	$(area).css({
		position: "absolute",
		width: selection.width,
		height: selection.height,
		left: $(img).offset().left + selection.x1,
		top: $(img).offset().top + selection.y1,
		"z-index" : 3,
		"background-color" : "#591f3e",
		"opacity" : 0.4,
		border: "1px solid #591f3e"
	}).appendTo('body')
	.on('click', function(e) {
		$(img).attr('src', 'images/demo/wireframe-02.png');
		$('.area').remove();
	});
	
	
};

$(document).ready(function() {
	// toolbox
	toolboxInit();
});
