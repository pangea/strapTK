var PageHeader = Panel.extend({
      initialize: function(args) {
        PageHeader.__super__.initialize.call(this, args);
        this.setDefaultValue("", "header");
        this.setDefaultValue(1, "level");
      },
      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
    													"<h<%= level %>>"+
    														"<%= header%> "+
    														"<small><%= yield%></small>"+
    													"</h<%= level %>>"+
    												"</div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "header": this.header,
          "level": this.level,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "PageHeader"
    });