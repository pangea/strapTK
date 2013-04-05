var SelectOption = Panel.extend({
      initialize : function(args) {
        SelectOption.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "value");
      },

      template : _.template("<option <%= rootAttrs %>> <%= yield %> </option>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "value");
      }
    }, {
      klass : "SelectOption"
    });