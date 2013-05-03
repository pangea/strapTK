/* Sprocket Manifest
 *= require Panel
 */
var ButtonToolbar = Panel.extend(
    /** @lends ButtonToolbar */
    {
      initialize: function(args) {
        ButtonToolbar.__super__.initialize.call(this, args);
        this.addClass("btn-toolbar");
      }
    },
    /** @lends ButtonToolbar */
    {
      klass: "ButtonToolbar"
    });