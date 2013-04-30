/* Sprocket Manifest
 *= require Abstract_Badge
 */
var Label = AbstractBadge.extend({
      initialize : function(args) {
        this.base = "label";
        Label.__super__.initialize.call(this, args);
      }
    },{
      klass: "Label"
    });