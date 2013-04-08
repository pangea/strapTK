var OptGroup = Panel.extend({
      initialize : function(args) {
        OptGroup.__super__.initialize.call(this, args);

        this.setDefaultValue("", "label");
      },

      template : strap.generateSimpleTemplate("optgroup"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "label");
      }
    },{
      klass: "OptGroup"
    });