var Nav = Panel.extend({
  types : ["tabs", "pills", "list"],

  initialize: function(args) {
    Nav.__super__.initialize.call(this, args);
    if(this.childPrefix === "") {
      this.childPrefix = "<li>";
    }
    if(this.childSuffix === "") {
      this.childSuffix = "</li>";
    }
    this.base = "nav";
    Typify(this);
  },

  template: _.template( "<ul id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</ul>")
});