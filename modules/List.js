/* Sprocket Manifest
 *= require Panel
 */
var List = Panel.extend({
      initialize: function(args) {
        List.__super__.initialize.call(this, args);

        this.childPrefix || (this.childPrefix = "<li>");
        this.childSuffix || (this.childSuffix = "</li>");
      },

      template: strap.generateSimpleTemplate("ul")
    },{
      klass: "List"
    });