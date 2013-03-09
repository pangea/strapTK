var Breadcrumbs = Panel.extend({
	initialize : function(args) {
		Breadcrumbs.__super__.initialize.call(this, args);
		this.childPrefix || (this.childPrefix = "<li>");
		this.childSuffix || (this.childSuffix = "<span class='divider'>/</span></li>");
		this.classes.unshift("breadcrumb");
	},

	template : _.template("<ul id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
													"<%= yield %>"+
												"</ul>"),
	render : function() {
		var markup = Breadcrumbs.__super__.render.call(this).split("<span class='divider'>/</span>"),
				last = markup.pop();
		return markup.join("<span class='divider'>/</span>") + last;
	}
});