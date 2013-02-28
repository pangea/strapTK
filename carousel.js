var Carousel = Component.extend({
	//Gunna have to come back to this one
	template : _.template(
												"<div class='carousel slide' id='{{= rootID }}' {{= rootAttrs }}>"+
													"<ol class='carousel-indicators'>"+
														"{{ _(slides).each(function(slide, i){ }}"+
														"<li data-slide-to='{{= i }}' data-target='#{{= rootID }}'></li>"+
														"{{= slide}}"+
														"{{ }); }}"+
													"</ol>"+
													"<div class='carousel-inner'>"+
														"{{ _(items).each(function(item){ }}"+
														"<div class='item'></div>"+
														"{{= item}}"+
														"{{ }); }}"+
													"</div>"+
													"<a class='carousel-control left' data-slide='prev' href='#{{= rootID }}'>&lsaquo;</a>"+
													"<a class='carousel-control right' data-slide='next' href='#{{= rootID }}'>&rsaquo;</a>"+
												"</div>"
												)

});