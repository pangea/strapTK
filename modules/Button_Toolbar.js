var ButtonToolbar = Panel.extend({
  initialize: function(args) {
    ButtonToolbar.__super__.initialize.call(this, args);
    this.addClass("btn-toolbar");
  }
});