var NavBar = Panel.extend({
      initialize : function(args) {
        NavBar.__super__.initialize.call(this, args);
        this.classes.unshift("navbar");
      },

      renderChildren : function() {
        return "<div class='navbar-inner'>" + NavBar.__super__.renderChildren.call(this) + "</div>";
      }
    });