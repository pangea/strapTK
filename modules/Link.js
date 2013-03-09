var Link = Panel.extend({
  initialize : function(args) {
    Link.__super__.initialize.call(this, args);
    console.log(this);
    this.setDefaultValue("", "href");
    this.attributes.unshift("href='"+this.href+"'");
  },

  template : _.template("<a id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></a>")
});