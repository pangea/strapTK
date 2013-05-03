/* Sprocket Manifest
 *= require Panel
 */
var PageHeader = Header.extend(
    /** @lends PageHeader# */
    {
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

      renderHash : function() {
        return  _.extend(
                  PageHeader.__super__.renderHash.call(this),
                  {
                    header: this.header,
                    level: this.level
                  }
                )
      }

    },
    /** @lends PageHeader */
    {
      klass: "PageHeader"
    });