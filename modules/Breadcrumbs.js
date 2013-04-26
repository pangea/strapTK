/* Sprocket Manifest
 *= require Panel
 */
var Breadcrumbs = Panel.extend({
      initialize : function(args) {
        Breadcrumbs.__super__.initialize.call(this, args);
        this.childPrefix || (this.childPrefix = "<li>");
        this.childSuffix || (this.childSuffix = "<span class='divider'>/</span></li>");
        this.addClass("breadcrumb");
      },

      template : strap.generateSimpleTemplate("ul"),

      render : function() {
        var markup = Breadcrumbs.__super__.render.call(this).split(this.childSuffix),
            last = markup.pop();
        return markup.join(this.childSuffix) + last;
      }
    },{
      klass: "Breadcrumbs"
    });