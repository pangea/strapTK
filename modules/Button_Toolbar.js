var ButtonToolbar = Panel.extend({
  initialize: function(args) {
    this.__super__.initialize.call(this, args);
    this.addClass("btn-toolbar");
  }
});