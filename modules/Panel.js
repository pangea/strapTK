var Panel = Component.extend({
      constructor: function(attributes, options) {
        if(typeof(attributes) == "string") {
          attributes = {body: attributes};
        }
        Panel.__super__.constructor.apply(this, arguments);
      },

  template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>{{= yield }}</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();

    return this.template({
      "yield": markup,
      "rootAttrs" : this.attributes.join(" "),
      "rootClasses": this.classes.join(" "),
      "rootID": this.id
    });
  },

  wellify : function() {
    if(!_.include(this.classes, "well")) {
      this.classes.push("well");
    }
  },

  dewellify : function() {
    this.classes = _.without(this.classes, "well");
  },

  welled : function(isWelled) {
    if(!isWelled && isWelled !== false) {
      return _.include(this.classes, "well");
    }

    isWelled ? this.wellify() : this.dewellify();
  },
  /**
   * Sets the closability of this alert.
   * Calling setClosable without specifying the closability sets closable to true
   *
   * @param closable [Boolean|null] Sets the closability of the alert.
   */
  setClosable : function(closable) {
    this.closable = typeof(closable) === "boolean" ? closable : true;
  }
});
