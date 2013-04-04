var Form = Panel.extend({
      initialize : function(args) {
        Form.__super__.initialize.call(this, args);

        this.setDefaultValue("GET", "method");
        this.setDefaultValue("", "action");
      },

      template : _.template( "<form id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></form>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "method", "action");
      }
    },{
      klass: "Form"
    });