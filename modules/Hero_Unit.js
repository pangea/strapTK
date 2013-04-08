var HeroUnit = Panel.extend({
      initialize : function(args) {
        HeroUnit.__super__.initialize.call(this, args);

        this.setDefaultValue("", "title");

        this.addClass("hero-unit");
      },
      template : _.template("<div <%= rootAttrs %>>"+
                              "<h1><%= title %></h1>"+
                              "<%= yield %>"+
                            "</div>"),
      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "title": this.title,
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "HeroUnit"
    });