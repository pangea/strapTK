/* Sprocket Manifest
 *= require Abstract_Badge
 */
var Badge = AbstractBadge.extend(
    /** @lends Badge# */
    {
      initialize : function(args) {
        this.base = "badge";
        Badge.__super__.initialize.call(this, args);
      }
    },
    /** @lends Badge */
    {
      klass: "Badge"
    });