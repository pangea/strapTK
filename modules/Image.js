var Image = Panel.extend({
  initialize: function(args) {
    Image.__super__.initialize.call(this, args);

    this.setDefaultValue("", "src");
  }
})