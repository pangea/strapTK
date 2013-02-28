var HeroUnit = Component.extend({
  initialize : function(args) {
    this.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("title")) {
      this.title = "";
    }
    this.classes.unshift("hero-unit");
  },
  template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "<h1>{{= title}}</h1>"+
                          "{{= yield}}"+
                        "</div>"),
  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "title": this.title,
      "rootID": this.id,
      "rootClasses": this.classes.join(" "),
      "rootAttrs": this.attributes.join(" ")
    });
  }
});