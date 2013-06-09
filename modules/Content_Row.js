/* Sprocket Manifest
 *= require Panel
 */
var ContentRow = Panel.extend({
      initialize: function(args) {
        ContentRow.__super__.initialize.call(this, args);
        this.setDefaultValue(12, "maxChildren");
        this.ensureChildLimit();
        this.addClass("row-fluid");
      },
      push: function(component) {
        this.ensureChildLimit();
        ContentRow.__super__.push.call(this, component);
      },
      unshift: function(component) {
        this.ensureChildLimit();
        ContentRow.__super__.unshift.call(this, component);
      },
      insert: function(component, index) {
        this.ensureChildLimit();
        ContentRow.__super__.insert.call(this, component, index);
      },
      renderChildren: function() {
        var span,
            prefix        = this.childPrefix,
            suffix        = this.childSuffix,
            rowWidth      = this.maxChildren,
            fluidChildren = this.children.length,
            markup        = "";

        _.each(this.children, function(child) {
          rowWidth -= (child.span || 0);
          fluidChildren -= (isNaN(child.span) ? 0 : 1);
        });

        span = Math.floor(rowWidth/fluidChildren);
        _.each(this.children, function(child) {
          var childMarkup = prefix + child.render() + suffix;

          if(child.klass === "Panel" && !child.tag) { // don't double wrap divs, but also don't falsely detected custom strap objects
            if(child.span !== 0) {
              child.addClass("span"+(child.span || span));
            }

            childMarkup = child.render();

            if(child.span !== 0) {  // check if a span class was added and remove it if it was
              child.removeClass("span"+(child.span || span));
            }
          } else if(child.span !== 0) {
            childMarkup = "<div class='span"+(child.span || span)+"'>" + childMarkup + "</div>";
          }

          markup += childMarkup;
        });
        return markup;
      },
      ensureChildLimit: function() {
        if(this.children.length >= this.maxChildren) {
          throw TooManyChildrenError("This row can only have "+this.maxChildren+" children");
        }
      }
    },{
      klass: "ContentRow"
    });