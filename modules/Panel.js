var Panel = Component.extend({
      constructor: function(attributes, options) {
        if(typeof(attributes) == "string") {
          attributes = {body: attributes};
        }
        Panel.__super__.constructor.apply(this, arguments);
      },

      initialize: function(args) {
        Panel.__super__.initialize.call(this, args);

        this.setDefaultValue([], "classes", "attributes");
        this.setDefaultValue("", "id", "body");
      },

      addClass : function(newClass) {
        var newClasses = arguments.length > 1 ? Array.prototype.slice.call(arguments, 0) : [newClass];
        this.classes = _.union(this.classes, newClasses);
        return this;
      },

      removeClass : function(oldClass) {
        var args = arguments.length > 1 ? [this.classes].concat(Array.prototype.slice.call(arguments, 0)) : [this.classes, oldClass];
        this.classes = _.without.apply(this, args);
        return this;
      },

      toggleClass : function(theClass) {
        var theClasses = arguments.length > 1 ? Array.prototype.slice.call(arguments, 0) : [theClass];
        _.each(theClasses, function(theClass) {
          if(_.include(this.classes, theClass)) {
            this.removeClass(theClass);
          } else {
            this.addClass(theClass);
          }
        }, this);
        return this;
      },

      listClasses : function() {
        return this.classes.join(" ");
      },

      listAttributes : function() {
        return this.attributes.join(" ");
      },

      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs" : this.listAttributes()
        });
      }
    }),
    Div = Panel;
