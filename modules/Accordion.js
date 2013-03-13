var Accordion = Panel.extend({
      initialize: function(args) {
        Accordion.__super__.initialize.call(this, args);

        this.addClass("accordion");
      },

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          markup += "<div class='accordion-group'>" +
                      "<div class='accordion-heading'>" +
                        "<a class='accordion-toggle' data-parent='" + this.id + "' data-toggle='collapse' href='#" + this.id + "_" + i +"'>" +
                          child.heading +
                        "</a>" +
                      "</div>" +
                      "<div class='accordion-body collapse in' id='" + this.id + "_" + i +"'>" +
                        "<div class='accordion-inner'>" +
                          child.render() +
                        "</div>" +
                      "</div>" +
                    "</div>";
        }, this);

        return markup;
      }
    });