/* Sprocket Manifest
 *= require Panel
 */
var Pagination = Panel.extend(
    /** @lends Pagination# */
    {
      initialize: function(args) {
        if(this.children && this.pages) {
          throw new SyntaxError("Paginators cannot accept both children and pages");
        }
        Pagination.__super__.initialize.call(this, args);

        this.setDefaultValue(1, "pages");
        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("pagination");

        if(this.children.length === 0) {
          this.buildPages();
        }

        if(this.onPage && this.id) {
          $("body").on("click", this.id+" a", {paginator: this}, function(e) {
            if(!$(this).parent().is(".active, .disabled")) {
              var p = e.data.paginator,
                  $this = $(this),
                  curPage = $this.parent().siblings(".active"),
                  pageNum = $this.text();

              curPage.removeClass(".active");
              if($this.is(".prev, .next")) {
                // handle prev/next
              } else {
                // handle direct click
                $this.parent().addClass("active");
              }
              p.render(true);
              p.onPage.call(p, pageNum, this, e);
            }
          });
        }
      },

      renderChildren: function() {
        return "<ul>" + Pagination.__super__.renderChildren.call(this) + "</ul>";
      },

      setPages: function(pages) {
        this.pages = pages;
        this.buildPages();
      },

      buildPages: function() {
        this.children = [];
        if(this.pages > 1) {

          this.add(new Link({body: "&laquo;", classes: ["prev"]}));
          _.times(this.pages, function(i) {
            this.add(new Link((i+1)+""));
          }, this);
          this.add(new Link({body: "&raquo;", classes: ["next"]}));

        } else {
          //paginators with less than 2 pages don't display
          console.warn("Paginator set to have less than 2 pages.  Pagination not will not display.");
        }
      }

    },
    /** @lends Pagination */
    {
      klass: "Pagination"
    });
