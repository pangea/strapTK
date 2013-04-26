/* Sprocket Manifest
 *= require Panel
 */
var Carousel = Panel.extend({
      initialize: function(args) {
        Carousel.__super__.initialize.call(this, args);

        this.setDefaultValue(true, "controls");
        this.setDefaultValue("&lsaquo;", "prevSymbol");
        this.setDefaultValue("&rsaquo;", "nextSymbol");

        this.addClass("carousel", "slide");
      },

      template : _.template("<div <%= rootAttrs %>>" +
                              "<% if(controls) { %>" +
                                "<ol class='carousel-indicators'>" +
                                  "<% _(slides).times(function(i){ %>" +
                                    "<li data-slide-to='<%= i %>' data-target='#<%= rootID %>' <%= i == 0 ? \"classes='active'\" : '' %>></li>" +
                                  "<% }); %>" +
                                "</ol>" +
                              "<% } %>" +
                              "<div class='carousel-inner'>" +
                                "<%= yield %>" +
                              "</div>" +
                              "<% if(controls) { %>" +
                                "<a class='carousel-control left' data-slide='prev' href='#<%= rootID %>'><%= prevSymbol %></a>" +
                                "<a class='carousel-control right' data-slide='next' href='#<%= rootID %>'><%= nextSymbol %></a>" +
                              "<% } %>" +
                            "</div>"),

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          child.addClass("item");
          if(i === 0) {
            child.addClass("active");
          }
          markup += child.render();
        });
        return markup;
      },

      renderHash : function() {
        return  _.extend(
                  Carousel.__super__.renderHash.call(this),
                  {
                    rootID    : this.id,
                    controls  : this.controls,
                    slides    : this.children.length,
                    prevSymbol: this.prevSymbol,
                    nextSymbol: this.nextSymbol
                  }
                );
      }

    },{
      klass: "Carousel"
    });