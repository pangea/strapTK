var Viewport = Component.extend({
      initialize: function(args) {
        Viewport.__super__.initialize.call(this, args);
        this.setDefaultValue("body", "root");
      },
      render : function() {
        return $(this.root).empty().append(this.renderChildren());
      }
    },{
      klass: "Viewport"
    });