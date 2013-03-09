var Paragraph = Panel.extend({
      template : _.template("<p id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></p>")
    }),
    P = Paragraph;