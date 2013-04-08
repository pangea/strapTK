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
        // convert arguments into an actual array and map the values to the ones attached to this Panel
        // the HTML ID is always added to this list
        var args = Array.prototype.slice.call(arguments, 0).concat(["id"]),
            addAttrs = _.map(args, function(val) {
              // remove empty values
              if(this[val] === "") {
                return false;
              }

              return val + "='" + this[val] + "'";
            }, this),
            classes = this.listClasses();

        if(classes !== "") {
          addAttrs.push("class='"+classes+"'");
        }

        // return the combined list
        return this.attributes.join(" ") + " " + _.compact(addAttrs).join(" ");
      },

      template : strap.generateSimpleTemplate("div"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "rootAttrs" : this.listAttributes()
        });
      }
    },{
      klass: "Panel"
    }),
    Div = Panel;
