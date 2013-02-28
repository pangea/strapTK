var Accordion = Panel.extend({
	//this one is going to take some thought....
	template : _.template(
												"<div class='accordion' id='{{= rootID }}' {{= rootAttrs }}>"+
													"{{ _(children).each(function(child){ }}"+
													"<div class='accordion-group'>"+
														"<div class='accordion-heading'>"+
															"<a class='accordion-toggle' data-parent='{{= rootID }}' data-toggle='collapse' href='#collapseOne'>"+
																"{{= child.heading}}"+
															"</a>"+
														"</div>"+
														"<div class='accordion-body collapse in' id='collapseOne'>"+
															"<div class='accordion-inner'>"+
																"{{= child.body}}"+
															"</div>"+
														"</div>"+
													"</div>"+
													"{{ }); }}"+
												"</div>"
												)

});