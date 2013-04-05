var FormSelect = Panel.extend({
      template : _.template("<select id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>> <%= yield %> </select>")
    },{
      klass : "FormSelect"
    });