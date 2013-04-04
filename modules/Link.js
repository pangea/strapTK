var Link = Panel.extend({
      initialize : function(args) {
        Link.__super__.initialize.call(this, args);

        this.setDefaultValue("#", "href");
      },

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "href");
      },

      template : _.template("<a id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></a>")
    },{
      klass: "Link"
    });