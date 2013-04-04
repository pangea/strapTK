var FormLabel = Panel.extend({
      template : _.template("<label id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAtrs %>> <%= yield %> </label>")
    },{
      klass : "FormLabel"
    });