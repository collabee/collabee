function Comment(id, name, text, left, top) {

	this.id = id;
	this.name = name;
	this.text = text;
	this.time = new Date();
	this.left = left;
	this.top = top;

	return this;
};

function toolboxInit() {
	window.toolboxToggled = false;
	var toolbox = $('.screen-toolbox img');
	
	$(toolbox).on('click', function(e) {
		if (window.toolboxToggled) {
			$(toolbox).attr('src', 'images/screen/tool_nor.png');
		} else {
			$(toolbox).attr('src', 'images/screen/tool_sel.png');
		}
		
		window.toolboxToggled = ~window.toolboxToggled;
	});};

function appImageInit() {
	
	var src = "images/sample-screen1.png";
	var image = $("<img src='" + src + "' />");
	
	var iphone = $('.screen-app-background');
	
	$(image).css({
		position: "absolute",
		left: $(iphone).offset().left + 61,
		top: $(iphone).offset().top + 59,
		width: 226,
		height: 404,
		"z-index" : 2,
		"border-radius" : 5
	}).appendTo('body');
};

$(document).ready(function() {
	// image ready
	appImageInit();
	
	// toolbox
	toolboxInit();
	
	// comment
	var commentList = [];

	var user = {
		name : "Hoon"
	};

	var template = _.template($('#tmpl_commentWritePanel').html());
	var iconMap = {
		comment : '<img src="images/screen/ic_comment_1.png" class="comment-icon margin-right-10">',
		loveit : '<img src="images/screen/ic_comment_2.png" class="comment-icon margin-right-10">',
		problem : '<img src="images/screen/ic_comment_3.png" class="comment-icon margin-right-10">',
		idea : '<img src="images/screen/ic_comment_4.png" class="comment-icon margin-right-10">',
	};

	$('.comment').on('click', function(e) {
		$('.main-content').css('cursor', 'pointer');
		
		window.toggledComment = ($(e.target).attr('comment-type'));
		
		
		$('.main-content').on('click', function(e) {
			var comment = iconMap[window.toggledComment];
			

			
			window.commentTop = e.pageY;
			window.commentLeft = e.pageX;

			if (!window.commentWritten) {
				$('.comment-icon[comment-id="' + commentList.length + '"').remove();
			}

			window.commentWritten = false;

			$(comment).css({
				position : "absolute",
				left : e.pageX,
				top : e.pageY,
				"z-index" : 3
			}).attr({
				"comment-id" : commentList.length
			}).appendTo('body');

			// comment-write panel html tempalte
			var html = ($('#commentWritePanel').length) ? $('#commentWritePanel') : template({
				comment : "Comment",
				name : user.name,
				time : "",
				text : ""
			});

			$(html).css({
				position : "absolute",
				left : e.pageX + 50,
				top : e.pageY,
				"z-index" : 3
			}).appendTo('body');

			$('#comment-btn-write').on('click', function(e) {
				window.commentWritten = true;

				var commentModel = new Comment(commentList.length, user.name, $('#comment-text').val(), // text
				window.commentLeft + 50, window.commentTop);

				console.log(commentModel);
				commentList.push(commentModel);

				$('#commentWritePanel').remove();
				$('.comment-icon').off();	
				$('.comment-icon').on('click', function(e) {
					
					var comment = $(e.target).attr('comment-id');
					var tmpl = _.template($('#tmpl_commentReadPanel').html());
					var html = tmpl({
						name : commentList[comment].name,
						text : commentList[comment].text,
					});

					$(html).css({
						position : "absolute",
						left : commentList[comment].left,
						top : commentList[comment].top,
						"z-index" : 3
					}).appendTo('body');
					
					$('#read-comment-btn-close').off();
					$('#read-comment-btn-close').on('click', function(e) {
						$(this).parents('.panel').remove();
					});
				});

			});

			$('#comment-btn-close').on('click', function(e) {
				window.commentWritten = false;
				$('#commentWritePanel').remove();
				$('.comment-icon[comment-id="' + commentList.length + '"').remove();
			});
		});
	});
});
