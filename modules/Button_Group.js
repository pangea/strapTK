var ButtonGroup = Panel.extend({
      initialize: function(args) {
        ButtonGroup.__super__.initialize.call(this, args);
        this.addClass("btn-group");
      }
    },{
      klass: "ButtonGroup"
    });