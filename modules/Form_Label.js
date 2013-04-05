var FormLabel = Panel.extend({
      template : _.template("<label id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></label>")
    },{
      klass : "FormLabel"
    });