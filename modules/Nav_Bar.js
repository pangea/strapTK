/* Sprocket Manifest
 *= require Panel
 */
var NavBar = Panel.extend(
    /** @lends NavBar# */
    {
      initialize : function(args) {
        NavBar.__super__.initialize.call(this, args);
        this.addClass("navbar");
      },

      renderChildren : function() {
        return "<div class='navbar-inner'>" + NavBar.__super__.renderChildren.call(this) + "</div>";
      }
    },
    /** @lends NavBar */
    {
      klass: "NavBar"
    });