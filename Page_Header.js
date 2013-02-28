var PageHeader = Panel.extend({
  initialize : function(args) {
    PageHeader.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("header")) {
      this.header = "";
    }
  },

	template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
													"<h1>"+
														"{{= header}} "+
														"<small>{{= yield}}</small>"+
													"</h1>"+
												"</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "header": this.header,
      "rootID": this.id,
      "rootClasses": this.classes.join(" "),
      "rootAttrs": this.attributes.join(" ")
    });
  }
});