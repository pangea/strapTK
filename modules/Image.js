var Image = Panel.extend({
      initialize : function(args) {
        Image.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "src");
      },

      template : _.template("<img <%= rootAttrs %> />"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "src");
      }
    },{
      klass: "Image"
    })