var Alert = Panel.extend({
  types: ["error", "success", "info"],

  initialize : function(args) {
    Alert.__super__.initialize.call(this, args);
    this.base = "alert";
    Typify(this);
  },

	template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>" +
													"{{ if(closable) { }}" +
                            "<button class='close' data-dismiss='alert' type='button'>&times;</button>" +
                          "{{ } }}" +
													"<strong>{{= title}}</strong>" +
													"{{= yield}}" +
												"</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "title": this.title,
      "closable": this.closable,
      "rootID": this.id,
      "rootClasses": this.classes.join(" "),
      "rootAttrs": this.attributes.join(" ")
    });
  },

  isBlock : function(blocked) {
    var isBlocked = _.include(this.classes, "alert-block");
    if(blocked) {
      if(!isBlocked) {
        this.classes.push("alert-block");
      }
    } else if(blocked === false) {
      if(isBlocked) {
        this.classes = _.without(this.classes, "alert-block");
      }
    } else {
      return isBlocked;
    }
  }
});