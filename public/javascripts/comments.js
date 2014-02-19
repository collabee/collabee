function Comment(id, name, text, left, top) {

	this.id = id;
	this.name = name;
	this.text = text;
	this.time = new Date();
	this.left = left;
	this.top = top;

	return this;
};

$(document).ready(function() {
	var commentList = [];

	var user = {
		name : "Hoon"
	};

	var template = _.template($('#tmpl_commentWritePanel').html());

	var iconMap = {
		Good : '<i class="comment-icon fa fa-check-square margin-right-10">',
		Cancel : '<i class="comment-icon fa fa-mail-reply margin-right-10">',
		Review : '<i class="comment-icon fa fa-search margin-right-10">',
		Warning : '<i class="comment-icon fa fa-warning margin-right-10">',
	};

	$('.comment').on('click', function(e) {
		$('.main-content').css('cursor', 'crosshair');

		window.toggledComment = $(e.target).text().replace(/ /g, '');

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
				left : e.pageX + 30,
				top : e.pageY,
				"z-index" : 3
			}).appendTo('body');

			$('#comment-btn-write').on('click', function(e) {
				window.commentWritten = true;

				var commentModel = new Comment(commentList.length, user.name, $('#comment-text').val(), // text
				window.commentLeft + 30, window.commentTop);

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
