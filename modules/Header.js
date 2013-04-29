/* Sprocket Manifest
 *= require Panel
 */
var Header = Panel.extend({
      initialize: function(args) {
        Header.__super__.initialize.call(this, args);
        this.setDefaultValue(1, "level");
      },
      template : strap.generateSimpleTemplate("h<%= level %>"),

      renderHash : function() {
        return  _.extend(
                  Header.__super__.renderHash.call(this),
                  { level: this.level }
                );
      }

    },{
      klass: "Header"
    });