var ViewportSwitcher = Viewport.extend({
  initialize: function(args) {
    ViewportSwitcher.__super__.initialize.call(this, args);
  },
  add: function(port) {
    if(!port instanceof Viewport) {
      throw SyntaxError("Only Viewports can be added to ViewportSwitchers");
    }

    var id = _.uniqueID(this.root);
  }
});