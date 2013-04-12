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
      renderChildren: function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);
        var rowWidth = this.maxChildren,
            fluidChildren = this.children.length;

        _.each(this.children, function(child) {
          rowWidth -= (child.span || 0);
          fluidChildren -= (isNaN(child.span) ? 0 : 1);
        });

        var span = Math.floor(rowWidth/fluidChildren),
            markup = "";
        _.each(this.children, function(child) {
          var childMarkup = prefix + child.render() + suffix;
          if(child.span !== 0) {
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