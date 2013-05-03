/* Sprocket Manifest
 *= require Panel
 */
var HeroUnit = Panel.extend(
    /** @lends HeroUnit */
    {
      initialize : function(args) {
        HeroUnit.__super__.initialize.call(this, args);

        this.setDefaultValue("", "title");

        this.addClass("hero-unit");
      },
      template : _.template("<div <%= rootAttrs %>>"+
                              "<h1><%= title %></h1>"+
                              "<%= yield %>"+
                            "</div>"),

      renderHash : function() {
        return  _.extend(
                  HeroUnit.__super__.renderHash.call(this),
                  { title: this.title }
                );
      }

    },
    /** @lends HeroUnit */
    {
      klass: "HeroUnit"
    });