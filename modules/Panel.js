var Panel = Component.extend({
      constructor: function(attributes, options) {
        if(typeof(attributes) == "string") {
          attributes = {body: attributes};
        }
        Panel.__super__.constructor.call(this, attributes, options);
      },

      initialize: function(args) {
        Panel.__super__.initialize.call(this, args);

        this.setDefaultValue([], "classes", "attributes");
        this.setDefaultValue("", "id", "body");
      },

      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></div>"),

      render : function() {
        var markup = this.body + this.renderChildren();

        return this.template({
          "yield": markup,
          "rootID": this.id,
          "rootClasses": this.classes.join(" "),
          "rootAttrs" : this.attributes.join(" ")
        });
      }
    }),
    Div = Panel;