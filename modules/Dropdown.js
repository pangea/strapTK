var Dropdown = Panel.extend({
	initialize : function(args) {
		this.__super__.initialize.call(this, args);
		this.childPrefix || (this.childPrefix = "<li><a>");
		this.childSuffix || (this.childSuffix = "</a></li>");
	},

	template : _.template("<ul id='{{= rootID }}' class='dropdown-menu {{= rootClasses }}' {{= rootAttrs }}>"+
													"{{= yield }}"+
												"</ul>")
});