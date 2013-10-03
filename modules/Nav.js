/* Sprocket Manifest
 *= require List
 *= require Typify
 */
var Nav = List.extend(
    /** @lends Nav# */
    {
      initialize: function(args) {
        Nav.__super__.initialize.call(this, args);

        this.setDefaultValue(false, "divided");

        this.base = "nav";
        Typify(this);
      },

      renderChildren : function(prefix, suffix) {
        if(!prefix) { prefix = this.childPrefix; }
        if(!suffix) { suffix = this.childSuffix; }

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
