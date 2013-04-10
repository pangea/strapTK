var DropdownMenu = List.extend({
      initialize : function(args) {
        Dropdown.__super__.initialize.call(this, args);

        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("dropdown-menu");
      }
    },{
      klass: "DropdownMenu"
    });