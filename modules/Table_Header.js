var TableHeader = Panel.extend({
      template : _.template("<th id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></th>")
    },{
      klass: "TableHeader"
    });