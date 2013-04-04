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

      addClass : function() {
        // gather up the classes to be added
        var newClasses = Array.prototype.slice.call(arguments, 0);
        // combine the current class list with the new class list, ignoring duplicates
        this.classes = _.union(this.classes, newClasses);
        return this;
      },

      removeClass : function() {
        // gather up the classes to be removed, and add them to an array
        // the final result is [[list, of, current, classes], list, of, classes, to, be, removed]
        var args = [this.classes].concat(Array.prototype.slice.call(arguments, 0));
        // apply the arguments to _.without
        // this is equivalent to _.without(this.classes, list, of, classes, to, be, removed);
        this.classes = _.without.apply(this, args);
        return this;
      },

      toggleClass : function() {
        var theClasses = Array.prototype.slice.call(arguments, 0);
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

      // this function can be called with a list of additional attributes that will be included in the output
      listAttributes : function() {
        // convert arguments into an actual array and wrap it with Lo-Dash
        var addAttrs = _(Array.prototype.slice.call(arguments, 0));
        // map the values to the ones attached to this Panel
        addAttrs.map(function(val) {
          return val + "='" + this[val] + "'";
        }, this);

        // return the combined list
        return this.attributes.join(" ") + " " + addAttrs.value().join(" ");
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
    },{
      klass: "Panel"
    }),
    Div = Panel;
