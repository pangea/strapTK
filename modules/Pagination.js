var Pagination = Panel.extend({
      initialize: function(args) {
        if(this.children && this.pages) {
          throw new SyntaxError("Paginators cannot accept both children and pages");
        }
        Pagination.__super__.initialize.call(this, args);

        this.setDefaultValue(0, "pages");
        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.classes.unshift("pagination");

        if(this.children.length === 0) {
          this.buildPages();
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
        if(this.pages < 1) {
          throw new SyntaxError("You must supply a number of pages greater than 0");
        } else if(this.pages > 1) {
          this.add(new Link({body: "&laquo;", classes: ["prev"]}));
          _.times(this.pages, function(i) {
            this.add(new Link((i+1).toString()));
          }, this);
          this.add(new Link({body: "&raquo;", classes: ["next"]}));
        } else {
          console.warn("Paginator instanciated with only 1 page."); //paginators with only 1 page don't display
        }
      }

    });