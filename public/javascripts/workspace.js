

function Image(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;	
};

function Screen(id, imageList, name) {
	this.id = id;
	this.imageList = imageList;
	this.name = name;
};

$(document).ready(function() {
	// new Screen
	var screenList = [];
	
	$('.btn-new-screen').on('click', function(e) {
		var imageList = [];
		var screen = new Screen(screenList.length, imageList, 'screen' + screenList.length);
		var screenViewCount = screenList.length;
		
		if ( (screenViewCount % 4) === 0 ) {
			var row = $('<div class="row screen-row"></div>');
			$('.mode-area').append(row);
		}
		
		var targetRow = $('.mode-area > .row:last-child');
		var template = _.template($('#tmpl_screen').html());
		
		$(targetRow).append(template(screen));
		screenList.push(screen);
	}); 

	// mode switching
	var designTemplate = _.template($('#tmpl_designArea').html());
	var sketchTemplate = _.template($('#tmpl_sketchArea').html());

	var modeMap = {
		design : designTemplate,
		sketch : sketchTemplate
	};

	var target = '#mode-contents-area';
	$(target).html(sketchTemplate());
	switchInitialize();
	makeSketchSwitch();

	var switchMap = {
		'true' : 'sketch',
		'false' : 'design'
	};

	$('#mode-switch').on('switch-change', function(e, data) {
		var modeState = switchMap['' + data.value];
		var oppositeSwitch = $(this).siblings('label');

		if (modeState === 'design') {
			$('.btn-new-screen').css({
				display : 'none',
			});

			makeDesignSwitch();

		} else {// sketch
			$('.btn-new-screen').css({
				display : 'inline',
			});

			makeSketchSwitch();
		}
		$(target).html(modeMap[modeState]());
	});
});

function switchInitialize() {
	$("#mode-switch").bootstrapSwitch();
	$("#mode-switch").bootstrapSwitch('setOnLabel', 'Sketch');
	$("#mode-switch").bootstrapSwitch('setOffLabel', 'Design');
	$("#mode-switch").bootstrapSwitch('setSizeClass', 'switch-large');
	$('.has-switch').css({
		outline: 'none'
	});

};

function makeDesignSwitch() {
	$('.has-switch label').css({
		background : '#dd4814',
		color : '#fff',
		'font-weight' : 'normal',
		opacity : '0.4'
	}).text('Sketch');
};

function makeSketchSwitch() {
	$('.has-switch label').css({
		background : '#5c2040',
		color : '#fff',
		'font-weight' : 'normal',
		opacity : '0.6'
	}).text('Design');
};
