/* Sprocket Manifest
 *= require List
 */
var DropdownMenu = List.extend(
    /** @lends DropdownMenu# */
    {
      initialize : function(args) {
        DropdownMenu.__super__.initialize.call(this, args);

        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("dropdown-menu");
      }
    },
    /** @lends DropdownMenu */
    {
      klass: "DropdownMenu"
    });