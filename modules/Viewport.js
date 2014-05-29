/* Sprocket Manifest
 *= require Component
 */
 (function() {
  "use strict";

  strap.Viewport = Component.extend(
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
          return this.$node || (this.$node = $(this.root));
        },

        render : function() {
          this.$node = $(this.root)''
          return this.el.html(this.renderChildren()).add(this).trigger("after-render", [this]);
        }
      },
      /** @lends Viewport */
      {
        model: "Viewport"
      });
 }());
