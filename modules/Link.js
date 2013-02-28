var Link = Panel.extend({
  initialize : function(args) {
    Link.__super__.initialize.call(this, args);
    var hasHREF = false;
    _.each(this.attributes, function(attr) {
      if(attr.match(/^href/)) {
        hasHREF = true;
        return false;
      }
    });
    if(!hasHREF) {
      this.attributes.push("href='#'");
    }
  },

  template : _.template("<a id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>{{= yield }}</a>")
});