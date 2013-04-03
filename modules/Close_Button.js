var CloseButton = Link.extend({
      initialize : function(args) {
        CloseButton.__super__.initialize.call(this, args);
        this.addClass("close");
        this.body || (this.body = "&times;");
      }
    },{
      name: "CloseButton"
    });