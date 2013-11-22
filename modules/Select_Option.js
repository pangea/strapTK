/* Sprocket Manifest
 *= require Panel
 */
var SelectOption = Panel.extend(
    /** @lends SelectOption# */
    {
      initialize : function(args) {
        SelectOption.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "value");
      },

      template : strap.generateSimpleTemplate("option"),

      listAttributes : function() {
        return SelectOption.__super__.listAttributes.call(this, "value");
      }
    },
    /** @lends SelectOption */
    {
      klass : "SelectOption"
    });
