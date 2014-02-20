function Image(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;
};

function Screen(id, imageList, name) {
	this.id = id;
	this.imageList = imageList;
	this.imageCount = 0;
	this.name = name;
};

function createDummySketchs() {
	var screens = [];
	var imageList1 = [];
	imageList1.push(new Image(imageList1.length, 'layer 1', 'url1'));
	imageList1.push(new Image(imageList1.length, 'layer 2', 'url2'));
	imageList1.push(new Image(imageList1.length, 'layer 3', 'url3'));

	var imageList2 = [];
	imageList2.push(new Image(imageList1.length, 'layer 1', 'url1'));
	imageList2.push(new Image(imageList1.length, 'layer 2', 'url2'));

	screens.push(new Screen(screens.length, imageList1, 'main'));
	screens[0].imageCount = 3;
	window.sketchCount++;
	screens.push(new Screen(screens.length, imageList2, 'service'));
	screens[1].imageCount = 2;
	window.sketchCount++;

	return screens;
};

function createDummyDesigns() {
	var screens = [];
	var imageList1 = [];
	imageList1.push(new Image(imageList1.length, 'layer 1', 'url1'));

	var imageList2 = [];
	imageList2.push(new Image(imageList1.length, 'layer 1', 'url1'));

	screens.push(new Screen(screens.length, imageList1, 'main'));
	screens[0].imageCount = 1;
	window.designCount++;
	screens.push(new Screen(screens.length, imageList2, 'service'));
	screens[1].imageCount = 1;
	window.designCount++;

	return screens;
};

function imageButtonInit() {
	var storageMap = {
		sketch : window.sketchScreens,
		design : window.designScreens
	};

	$('.image-add.button').off();
	$('.image-delete.button').off();

	$('.image-add-button').on('click', function(e) {
		var storage = storageMap[window.workMode];
		var screenId = Number($(this).closest('.screen').attr('screen-id'));
		var imageId = Number($(this).closest('.screen').find(':selected').attr('image-id'));

		var image = new Image(storage[screenId].imageCount, 'layer ' + (storage[screenId].imageCount + 1), '');
		storage[screenId].imageCount++;

		storage[screenId].imageList.push(image);
		updateScreenView(screenId);
	});

	$('.image-delete-button').on('click', function(e) {
		var storage = storageMap[window.workMode];
		var screenId = Number($(this).closest('.screen').attr('screen-id'));
		var imageId = Number($(this).closest('.screen').find(':selected').attr('image-id'));

		// find image index by image id for removing
		var index = -1;

		_.find(storage[screenId].imageList, function(image) {
			index++;
			return (image.id === imageId);
		});

		storage[screenId].imageList.splice(index, 1);
		updateScreenView(screenId);
	});
};

function updateScreenView(screenId) {

	var templateMap = {
		sketch : _.template($('#tmpl_screen').html()),
		design : _.template($('#tmpl_screen').html())
	};

	var storageMap = {
		sketch : window.sketchScreens,
		design : window.designScreens
	};

	var template = templateMap[window.workMode];
	var storage = storageMap[window.workMode];

	var target = '[screen-id="' + screenId + '"]';

	$(target).replaceWith(template({
		screen : storage[screenId]
	}));

	imageButtonInit();

};

$(document).ready(function() {

	// global storage for mode-contents : screens

	window.sketchCount = 0;
	window.designCount = 0;
	window.sketchScreens = createDummySketchs();
	window.designScreens = createDummyDesigns();

	var sketchScreens = window.sketchScreens;
	var designScreens = window.designScreens;

	// new screen
	$('.btn-new-screen').on('click', function(e) {
		// get screen name from input
		
		var name = $('input', '#modal-new-screen').val() || 'screen' + window.designCount;
		console.log(name);
		
		// make new sketch screen
		var imageList = [];
		var screen = new Screen(window.sketchCount, imageList, name);
		imageList.push(new Image(screen.imageCount, 'layer ' + (screen.imageCount + 1), ''));
		screen.imageCount++;
		
		// make new design creen
		var imageList2 = [];
		var designScreen = new Screen(window.designCount, imageList2, name);
		imageList2.push(new Image(designScreen.imageCount, 'layer ' + (designScreen.imageCount + 1), ''));
		designScreen.imageCount++;
		

		// var targetRow = $('.mode-area > .row:last-child');
		var targetRow = $('.mode-area');
		var template = _.template($('#tmpl_screen').html());

		$(targetRow).append(template({
			screen : screen
		}));
		sketchScreens.push(screen);
		designScreens.push(designScreen);
		window.sketchCount++;
		window.designCount++;
		$('input', '#modal-new-screen').val('');

		imageButtonInit();
	});

	// tab contents initializing
	var designTemplate = _.template($('#tmpl_designArea').html());
	var sketchTemplate = _.template($('#tmpl_sketchArea').html());

	var target = '#mode-contents-area';

	// mode-content area initialize
	$(target).html(sketchTemplate({
		screenList : sketchScreens
	}));
	imageButtonInit();

	//bootstrap switch
	switchInitialize(sketchScreens, designScreens);
	makeSketchSwitch();
});

function switchInitialize(sketchScreens, designScreens) {
	// bootstrap switch
	$("#mode-switch").bootstrapSwitch();
	$("#mode-switch").bootstrapSwitch('setOnLabel', 'Sketch');
	$("#mode-switch").bootstrapSwitch('setOffLabel', 'Design');
	$("#mode-switch").bootstrapSwitch('setSizeClass', 'switch-large');
	$('.has-switch').css({
		outline : 'none'
	});

	// switch event collback
	var designTemplate = _.template($('#tmpl_designArea').html());
	var sketchTemplate = _.template($('#tmpl_sketchArea').html());

	var target = '#mode-contents-area';

	var templateMap = {
		design : designTemplate,
		sketch : sketchTemplate
	};

	var storageMap = {
		sketch : window.sketchScreens,
		design : window.designScreens
	};

	var switchMap = {
		'true' : 'sketch',
		'false' : 'design'
	};

	window.workMode = 'sketch';

	$('#mode-switch').on('switch-change', function(e, data) {
		var modeState = switchMap['' + data.value];
		window.workMode = modeState;
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

		$(target).html(templateMap[modeState]({
			screenList : storageMap[modeState]
		}));
		imageButtonInit();
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
