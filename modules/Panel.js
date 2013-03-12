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
        if(!_.include(this.classes, newClass)) {
          this.classes.push(newClass);
        }
      },

      removeClass : function(oldClass) {
        this.classes = _.without(this.classes, oldClass);
      },

      toggleClass : function(theClass) {
        if(_.include(this.classes, theClass)) {
          this.removeClass(theClass);
        } else {
          this.addClass(theClass);
        }
      },

      listClasses : function() {
        return this.classes.join(" ");
      },

      listAttributes : function() {
        return this.attributes.join(" ");
      }

      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs" : this.listAttributes();
        });
      }
    }),
    Div = Panel;
