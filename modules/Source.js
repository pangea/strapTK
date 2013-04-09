var Source = Panel.extend({
      initialize : function(args) {
        Source.__super__.initialize.call(this, args);

        this.setDefaultValue("", "src");
        this.setDefaultValue({}, "data");

        //set up Fetching here, if src exists
      },

      template : function() { throw "Not Implemented"; },

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "data" : this.data,
          "rootAttrs" : this.listAttributes()
        });
      }
    });