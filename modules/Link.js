/* Sprocket Manifest
 *= require Panel
 */
var Link = Panel.extend({
      initialize : function(args) {
        Link.__super__.initialize.call(this, args);

        this.setDefaultValue("#", "href");
      },

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "href");
      },

      template : strap.generateSimpleTemplate("a")
    },{
      klass: "Link"
    });