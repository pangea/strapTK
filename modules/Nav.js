/* Sprocket Manifest
 *= require List
 *= require Typify
 */
var Nav = List.extend(
    /** @lends Nav# */
    {
      initialize: function(args) {
        // this.childPrefix = "<li>";
        // this.childSuffix = "</li>";

        Nav.__super__.initialize.call(this, args);

        this.setDefaultValue(false, "divided");

        this.base = "nav";
        Typify(this);
      },

      renderChildren : function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);

        var markup = "";
        _.each(this.children, function(child, i) {
          if(i && this.divided) {
            markup += "<li class='divider-vertical'></li>";
          }
          if(child.tag === "li") { // this allows users to force an override for a specific child
            markup += child.render();
          } else {
            markup += (child.active ? prefix.replace(/>$/," class='active'>") : prefix) + child.render() + suffix;
          }
        }, this);
        return markup;
      },

      // render : function(intoDOM) {
      //   var markup = Nav.__super__.render.call(this);
      //   if(this.divided) {
      //     markup = markup.split("</li><li").join("</li><li class='divider-vertical'></li><li");
      //   }

      //   if(intoDOM && this.id) {
      //     $("#"+this.id).html(markup);
      //   }

      //   return markup;
      // },

      divide : function(divided) {
        if(divided) {
          this.divided = true;
        } else if(divided === false) {
          this.divided = false;
        }

        return this.divided;
      }
    },
    /** @lends Nav */
    {
      klass: "Nav",
      types: ["tabs", "pills", "list"]
    });