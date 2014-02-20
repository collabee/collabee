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

function createDummySketchs() {
	var screens = [];
	var imageList1 = [];
	imageList1.push(new Image(imageList1.length, 'Main 1-1', 'url1'));
	imageList1.push(new Image(imageList1.length, 'Main 1-2', 'url2'));
	imageList1.push(new Image(imageList1.length, 'Main 1-3', 'url3'));

	var imageList2 = [];
	imageList2.push(new Image(imageList1.length, 'Service 1-1', 'url1'));
	imageList2.push(new Image(imageList1.length, 'Service 1-2', 'url2'));
	
	screens.push(new Screen(screens.length, imageList1, 'Main'));
	screens.push(new Screen(screens.length, imageList2, 'Service'));
		
	return screens;
};

function createDummyDesigns() {
	
};

$(document).ready(function() {
	// new screen
	var sketchScreens = createDummySketchs();
	var designScreens = createDummyDesigns();

	$('.btn-new-screen').on('click', function(e) {
		var imageList = [];
		var screen = new Screen(sketchScreens.length, imageList, 'screen' + sketchScreens.length);
		var screenViewCount = sketchScreens.length;

		// var targetRow = $('.mode-area > .row:last-child');
		var targetRow = $('.mode-area');
		var template = _.template($('#tmpl_screen').html());

		$(targetRow).append(template(screen));
		sketchScreens.push(screen);
	});

	// mode switching
	var designTemplate = _.template($('#tmpl_designArea').html());
	var sketchTemplate = _.template($('#tmpl_sketchArea').html());

	var modeMap = {
		design : designTemplate,
		sketch : sketchTemplate
	};

	var target = '#mode-contents-area';
	$(target).html(sketchTemplate({
		screenList : sketchScreens
	}));
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
		$(target).html(modeMap[modeState]({
			screenList: sketchScreens
		}));
	});
});

function switchInitialize() {
	$("#mode-switch").bootstrapSwitch();
	$("#mode-switch").bootstrapSwitch('setOnLabel', 'Sketch');
	$("#mode-switch").bootstrapSwitch('setOffLabel', 'Design');
	$("#mode-switch").bootstrapSwitch('setSizeClass', 'switch-large');
	$('.has-switch').css({
		outline : 'none'
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
		opacity : '0.4'
	}).text('Design');
};
