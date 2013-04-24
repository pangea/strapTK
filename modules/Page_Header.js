var PageHeader = Header.extend({
      initialize: function(args) {
        PageHeader.__super__.initialize.call(this, args);
        this.setDefaultValue("", "header");
        this.addClass("page-header");
      },
      template : _.template("<div <%= rootAttrs %>>"+
                              "<h<%= level %>>"+
                                "<%= header %> "+
                                "<small><%= yield %></small>"+
                              "</h<%= level %>>"+
                            "</div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "header": this.header,
          "level": this.level,
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "PageHeader"
    });