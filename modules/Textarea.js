/* Sprocket Manifest
 *= require Panel
 */
var Textarea = Panel.extend(
    /** @lends Textarea# */
    {
      initialize : function(args) {
        Textarea.__super__.initialize.call(this, args);

        this.setDefaultValue("", "placeholder");
      },

      template : strap.generateSimpleTemplate("textarea"),

      listAttributes : function() {
        return Textarea.__super__.listAttributes.call(this, "placeholder");
      }
    },
    /** @lends Textarea */
    {
      klass : "Textarea"
    });