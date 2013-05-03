/* Sprocket Manifest
 *= require Component
 */
var Viewport = Component.extend(
    /** @lends Viewport# */
    {
      initialize: function(args) {
        Viewport.__super__.initialize.call(this, args);
        this.setDefaultValue("body", "root");
      },

      flush : function() {
        Viewport.__super__.flush.call(this);
        this.render();
      },

      el : function() {
        return $(this.root);
      },

      render : function() {
        return $(this.root).html(this.renderChildren()).add(this).trigger("after-render", [this]);
      }
    },
    /** @lends Viewport */
    {
      klass: "Viewport"
    });