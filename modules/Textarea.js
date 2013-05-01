/* Sprocket Manifest
 *= require Panel
 */
var Textarea = Panel.extend({
      initialize : function(args) {
        Textarea.__super__.initialize.call(this, args);

        this.setDefaultValue("", "placeholder");
      },

      template : strap.generateSimpleTemplate("textarea"),

      listAttributes : function() {
        return Textarea.__super__.listAttributes.call(this, "placeholder");
      }
    }, {
      klass : "Textarea"
    });