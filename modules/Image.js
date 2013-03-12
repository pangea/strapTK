var Image = Panel.extend({
  initialize : function(args) {
    Image.__super__.initialize.call(this, args);

    this.setDefaultValue("", "src");
  },

  template : _.template("<img id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %> />"),

  listAttributes : function() {
    return this.attributes.join(" ")+" src="+this.src;
  }
})