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

function imageChanged() {
	
	var storageMap = {
		sketch : window.sketchScreens,
		design : window.designScreens
	};


	$('select').off();
	$('select').change(function(e) {
		var screen = $(this).closest('.screen');
		imageId = $('select option:selected', screen).attr('image-id');
		screenId = $(this).closest('.screen').attr('screen-id');
		
		var screen = $('.screen[screen-id="' + screenId + '"]');
		var img = $($($(screen).children()[1]).children()).children();
		
		
		var storage = storageMap[window.workMode];
		var result = _.find(storage[screenId].imageList, function(image) {
			return (image.id == imageId);
		});
		
		console.log(result.url);
		
		$(img).attr('src', result.url);
		
		// updateScreenView(screenId, imageId);
	});
};

function createDummySketchs() {
	var screens = [];
	var imageList1 = [];
	imageList1.push(new Image(0, 'layer 1', 'images/image1.jpg'));
	imageList1.push(new Image(1, 'layer 2', 'images/image1-2.jpg'));
	imageList1.push(new Image(2, 'layer 3', 'images/image1.jpg'));

	var imageList2 = [];
	imageList2.push(new Image(0, 'layer 1', 'images/image1.jpg'));
	imageList2.push(new Image(1, 'layer 2', 'images/image1-2.jpg'));

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

function updateScreenView(screenId, imageId) {

	var imageIndex = imageId || 0;

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
		screen : storage[screenId],
		imageId : imageIndex
	}));

	imageButtonInit();
	imageChanged();

};

function getScreenContextMenu() {
	$('.image-wrapper').hover(function(e) {
		console.log(1);
	});
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

		getScreenContextMenu();

		sketchScreens.push(screen);
		designScreens.push(designScreen);
		window.sketchCount++;
		window.designCount++;
		$('input', '#modal-new-screen').val('');

		imageButtonInit();
		imageChanged();
	});

	// tab contents initializing
	var designTemplate = _.template($('#tmpl_sketchArea').html());
	var sketchTemplate = _.template($('#tmpl_sketchArea').html());

	var target = '#mode-contents-area';

	// mode-content area initialize
	$(target).html(sketchTemplate({
		screenList : sketchScreens
	}));
	imageButtonInit();
	imageChanged();

	//bootstrap switch
	switchInitialize(sketchScreens, designScreens);
	makeSketchSwitch();
});

function switchInitialize(sketchScreens, designScreens) {
	// bootstrap switch
	$("#mode-switch").bootstrapSwitch();
	$("#mode-switch").bootstrapSwitch('setOnLabel', 'Sketch Mode');
	$("#mode-switch").bootstrapSwitch('setOffLabel', 'Graphic Mode');
	$("#mode-switch").bootstrapSwitch('setSizeClass', 'switch-large');
	$('.has-switch').css({
		outline : 'none'
	});

	// switch event collback
	var designTemplate = _.template($('#tmpl_sketchArea').html());
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
		imageChanged();
	});

};

function makeDesignSwitch() {
	$('.has-switch label').css({
		/*background : '#dd4814',*/
		background : 'gray',
		color : '#fff',
		'font-weight' : 'normal',
		opacity : '0.4'
	}).text('Sketch Mode');
};

function makeSketchSwitch() {
	$('.has-switch label').css({
		/*background : '#5c2040',*/
		background : 'gray',
		color : '#fff',
		'font-weight' : 'normal',
		opacity : '0.4'
	}).text('Graphic Mode');
};
