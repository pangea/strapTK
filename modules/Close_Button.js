var CloseButton = Link.extend({
  initialize : function(args) {
    this.__super__.initialize.call(this, args);
    this.classes.unshift("close");
    if(!this.hasOwnProperty("body")) {
      this.body = "&times;"
    }
  }
});