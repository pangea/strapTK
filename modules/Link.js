var Link = Panel.extend({
      initialize : function(args) {
        Link.__super__.initialize.call(this, args);

        this.setDefaultValue("", "href");
      },

      listAttributes : function() {
        return this.attributes.join(" ") + " href='"+this.href+"'";
      }

      template : _.template("<a id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></a>")
    });