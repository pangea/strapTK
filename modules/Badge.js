var Badge = AbstractBadge.extend({
      initialize : function(args) {
        this.base = "badge";
        Badge.__super__.initialize.call(this, args);
      }
    },{
      klass: "Badge"
    });