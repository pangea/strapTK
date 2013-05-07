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

        this.setDefaultValue(1, "pages", "currentPage");
        this.setDefaultValue(Infinity, "maxPages");
        this.setDefaultValue(true, "prevNext");
        this.setDefaultValue(false, "firstLast");
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
        var dispPages, startPage, pageRange;

        this.children = [];
        if(this.pages > 1) {
          dispPages = Math.min(this.maxPages, this.pages);          // determine the number of pages to display
          pageRange = Math.floor(dispPages/2);                      // determine the number of pages on each side of current
          startPage = Math.max(this.currentPage - pageRange, 1);    // ensure the start page isn't less than 1
          startPage = Math.min(startPage, this.pages - pageRange);  // ensure the start page doesn't chop off pages
          startPage = Math.floor(startPage);                        // handle dispPages being odd

          _.times(dispPages, function(i) {
            this.add(new Link((i+startPage)+""));
          }, this);

          if(this.pages > dispPages) {
            if(this.currentPage - pageRange > 0) {
              this.unshift(new Raw("..."));
            }

            if(this.pages - this.currentPage > pageRange) {
              this.add(new Raw("..."));
            }
          }

          if(this.prevNext) {
            this.unshift(new Link({ classes: "prev", children: [ new Icon({type: "angle-left"}) ] }));
            this.add(new Link({ classes: "next", children: [ new Icon({type: "angle-right"}) ] }));
          }

          if(this.firstLast) {
            this.unshift(new Link({ classes: "first", children: [ new Icon({type: "double-angle-left"}) ] }));
            this.add(new Link({ classes: "last", children: [ new Icon({type: "double-angle-right"}) ] }));
          }

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
