var Pagination = Panel.extend({
	initialize: function(args) {
		Pagination.__super__.initialize.call(this, args);
		if(!this.hasOwnProperty("pages")) {
			this.pages = 0
		}
		if(this.childPrefix === "") {
			this.childPrefix = "<li>";
		}
		if(this.childSuffix === "") {
			this.childSuffix = "</li>";
		}
		this.classes.unshift("pagination");
		if(this.children.length === 0) {
			this.add(new Link({body: "&laquo;", classes: ["prev"]}));
			_(this.pages).times(function(i) {
				this.add(new Link({body: (i+1)}));
			}, this);
			this.add(new Link({body: "&raquo;", classes: ["next"]}));
		}
	},

	renderChildren: function() {
		return "<ul>" + Pagination.__super__.renderChildren.call(this) + "</ul>";
	}

});