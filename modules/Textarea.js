var Textarea = Panel.extend({
      template : _.template("<textarea id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>> <%= yield %> </textarea>")
    }, {
      klass : "Textarea"
    });