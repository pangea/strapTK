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

      render : function(intoDOM) {
        var markup = Breadcrumbs.__super__.render.call(this).split(this.childSuffix),
            last = markup.pop();

        markup = markup.join(this.childSuffix) + last;

        if(intoDOM && this.id) {
          $(this.id).html(markup);
        }

        return markup;
      }
    },{
      klass: "Breadcrumbs"
    });