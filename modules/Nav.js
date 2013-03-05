var Nav = Panel.extend({
  initialize: function(args) {
    Nav.__super__.initialize.call(this, args);

    if(!this.hasOwnProperty("divided")) {
      this.divided = false;
    }

    this.childPrefix = "<li>";
    this.childSuffix = "</li>";
    this.types = ["tabs", "pills", "list"];
    this.base = "nav";
    Typify(this);
  },

  template: _.template( "<ul id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</ul>"),

  render : function() {
    var markup = Nav.__super__.render.call(this);
    if(this.divided) {
      markup = markup.split("</li><li>").join("</li><li class='divider-vertical'></li><li>");
    }
    return markup
  },

  divide : function(divided) {
    if(divided) {
      this.divided = true;
    } else if(divided === false) {
      this.divided = false;
    }

    return this.divided;
  }
});