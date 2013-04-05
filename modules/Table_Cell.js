var TableCell = Panel.extend({
      template : _.template("<td id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></td>")
    },{
      klass: "TableCell"
    });