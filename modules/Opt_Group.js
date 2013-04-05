var OptGroup = Panel.extend({
      initialize : function(args) {
        OptGroup.__super__.initialize.call(this, args);

        this.setDefaultValue("", "label");
      },

      template : _.template("<optgroup <%= rootAttrs %>> <%= yield %> </optgroup>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "label");
      }
    },{
      klass: "OptGroup"
    });