var Header = Panel.extend({
      initialize: function(args) {
        Header.__super__.initialize.call(this, args);
        this.setDefaultValue(1, "level");
      },
      template : strap.generateSimpleTemplate("h<%= level %>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "level": this.level,
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "Header"
    });