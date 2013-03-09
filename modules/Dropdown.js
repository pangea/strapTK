var Dropdown = List.extend({
      initialize : function(args) {
        Dropdown.__super__.initialize.call(this, args);

        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.classes.unshift("dropdown-menu");
      }
    });