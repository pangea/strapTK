var Button = Link.extend({
      initialize : function(args) {
        Button.__super__.initialize.call(this, args);

        this.attributes.unshift("type='button'");

        this.base = "btn";
        this.types = ["primary", "info", "success", "warning", "danger", "inverse", "link"];

        Typify(this);
      }
    });