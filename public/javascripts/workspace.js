$(document).ready(function() {
	
	
	var designTemplate = _.template($('#tmpl_designArea').html());	
	var sketchTemplate = _.template($('#tmpl_sketchArea').html());	
	
	var modeMap = {
		design : designTemplate,
		sketch : sketchTemplate
	};
	
	var target = '#mode-contents-area';
	$(target).html(sketchTemplate());
	switchInitialize();
	
	var switchMap = {
		'true': 'sketch',
		'false': 'design'
	};

	$('#mode-switch').on('switch-change', function(e, data) {
		var modeState = switchMap['' + data.value];
		
		if(modeState === 'design') {
			$('.btn-new-screen').css({
				display: 'none',
			});
		} else {
			$('.btn-new-screen').css({
				display: 'inline',
			});
		}
		$(target).html(modeMap[modeState]());
	});
});

function switchInitialize() {
	$("#mode-switch").bootstrapSwitch();
	$("#mode-switch").bootstrapSwitch('setOnLabel', 'Sketch');
	$("#mode-switch").bootstrapSwitch('setOffLabel', 'Design');
	$("#mode-switch").bootstrapSwitch('setSizeClass', 'switch-large');
};
