var Button = Link.extend({
  types : ["primary", "info", "success", "warning", "danger", "inverse", "link"],

  initialize : function(args) {
    Button.__super__.initialize.call(this, args);
    var hasType = false;
    _.each(this.attributes, function(attr) {
      if(attr.match(/^type/)) {
        hasType = true;
        return false;
      }
    });
    if(!hasType) {
      this.attributes.push("type='button");
    }

    this.base = "btn";

    Typify(this);
  }
});