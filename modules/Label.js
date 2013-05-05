/* Sprocket Manifest
 *= require Abstract_Badge
 */
var Label = AbstractBadge.extend(
    /** @lends Label# */
    {
      initialize : function(args) {
        this.base = "label";
        Label.__super__.initialize.call(this, args);
      }
    },
    /** @lends Label */
    {
      klass: "Label"
    });