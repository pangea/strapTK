/* Sprocket Manifest
 *= require Panel
 */
var OptGroup = Panel.extend(
    /** @lends OptGroup# */
    {
      initialize : function(args) {
        OptGroup.__super__.initialize.call(this, args);

        this.setDefaultValue("", "label");
      },

      template : strap.generateSimpleTemplate("optgroup"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "label");
      }
    },
    /** @lends OptGroup */
    {
      klass: "OptGroup"
    });