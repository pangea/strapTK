var Viewport = Component.extend({
  initialize : function(args) {
    Viewport.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("root")) {
      this.root = "body";
    }
  },

  render : function() {
    $(this.root).empty().append(this.renderChildren());
  }
});