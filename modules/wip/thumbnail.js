var Thumbnail = Component.extend({

	template : _.template(
												"<ul class='thumbnails'>"+
													"{{ _(children).each(function(child){ }}"+
													"<li class='span3'>"+
														"<img src='{{= child }}' />"+
													"</li>"+
													"{{ }); }}"+
												"</ul>"
												)

});