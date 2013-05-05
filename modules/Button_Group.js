/* Sprocket Manifest
 *= require Panel
 */
var ButtonGroup = Panel.extend(
    /** @lends ButtonGroup# */
    {
      initialize: function(args) {
        ButtonGroup.__super__.initialize.call(this, args);
        this.addClass("btn-group");
      }
    },
    /** @lends ButtonGroup */
    {
      klass: "ButtonGroup"
    });