var AbstractBadge = Panel.extend({
  initialize : function(args) {
    AbstractBadge.__super__.initialize.call(this, args);
    this.types = ["success", "warning", "important", "info", "inverse"];
    Typify(this);
  },
  template : _.template("<span id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</span>")
});