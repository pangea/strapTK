var FormInput = Panel.extend({
      initialize : function(args) {
        FormInput.__super__.initialize.call(this, args);

        this.types = [
                      "button", "checkbox", "color", "date", "datetime", "datetime-local", "email", "file", "hidden", "image", "month",
                      "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"
                    ];

        this.setDefaultValue("", "placeholder", "name");
        this.setDefaultValue("text", "type");
        this.base = "input";
        Typify(this);
      },

      template : _.template("<input id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %> />"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "type", "placeholder", "name");
      }
    });