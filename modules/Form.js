/* Sprocket Manifest
 *= require Panel
 */
var Form = Panel.extend({
      initialize : function(args) {
        Form.__super__.initialize.call(this, args);

        this.setDefaultValue("GET", "method");
        this.setDefaultValue("", "action");
      },

      template : strap.generateSimpleTemplate("form"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "method", "action");
      }
    },{
      klass: "Form"
    });