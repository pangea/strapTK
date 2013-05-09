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
          // Add click handlers
          $(function(paginator) {
            $("body").on("click", "#"+paginator.id+" a", {paginator: paginator}, function(e) {
              e.preventDefault();
              if(!$(this).parent().is(".active, .disabled")) {
                var p = e.data.paginator,
                    pEl = p.el(),
                    $this = $(this);

                switch($this.attr("class")) {
                  case "first": // first page button clicked
                    p.currentPage = 1;
                    break;

                  case "prev":  // previous page button clicked
                    p.currentPage--;
                    break;

                  case "next":  // next page button clicked
                    p.currentPage++;
                    break;

                  case "last":  // last page button clicked
                    p.currentPage = p.pages;
                    break;

                  default:      // numbered page button clicked
                    p.currentPage = parseInt($this.text(), 10);
                }

                p.render(true);
                p.onPage.call(p, p.currentPage, this, e);

                pEl.find("li").not(".first, .last, .prev, .next").eq(p.currentPage-1).addClass("active");

                if(p.currentPage === 1) {
                  pEl.find(".first, .prev").parent().addClass("disabled");
                } else if(p.currentPage === p.pages) {
                  pEl.find(".last, .next").parent().addClass("disabled");
                }
              }
            });
          }.bind(window, this));
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
