var AbstractBadge = Panel.extend({
      initialize : function(args) {
        AbstractBadge.__super__.initialize.call(this, args);
        Typify(this);
      },
      template : strap.generateSimpleTemplate("span")
    },{
      klass: "AbstractBadge",
      types : ["success", "warning", "important", "info", "inverse"]
    });