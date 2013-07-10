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

        if(this.id) {
          // Add click handlers
          var p = this;
          $(function() {
            $("body").on("click", "#"+p.id+" a", function(e) {
              e.preventDefault();
              if(!$(this).parent().is(".active, .disabled")) {
                var $this = $(this);

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

                p.buildPages();
                p.render(true);
                if(p.onPage) {
                  p.onPage.call(p, e, p.currentPage, this);
                }

                $(p).trigger('page', [p.currentPage, this]);
              }
            });
          });
        }

        $(this).on("after-render", function(e, pag) {
          var el  = pag.el();

          el.find("li").filter(function() {
            return $(this).find("a").text().match(pag.currentPage);
          }).addClass("active");

          if(pag.currentPage === 1) {
            el.find(".first, .prev").parent().addClass("disabled");
          } else if(pag.currentPage === pag.pages) {
            el.find(".last, .next").parent().addClass("disabled");
          }
        });
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
          dispPages = Math.min(this.maxPages, this.pages);              // determine the number of pages to display
          pageRange = Math.floor(dispPages/2);                          // determine the number of pages on each side of current
          startPage = Math.max(this.currentPage - pageRange, 1);        // ensure the start page isn't less than 1
          startPage = Math.min(startPage, this.pages - dispPages + 1);  // ensure the start page doesn't chop off pages
          startPage = Math.floor(startPage);                            // handle dispPages being odd

          _.times(dispPages, function(i) {
            this.add(new Link((i+startPage)+""));
          }, this);

          if(this.pages > dispPages) {
            if(this.currentPage - pageRange > 1) {
              this.unshift(new Span("..."));
            }

            if(this.pages - this.currentPage > pageRange) {
              this.add(new Span("..."));
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
