/* Sprocket Manifest
 *= require Panel
 */
var Accordion = Panel.extend(
    /** @lends Accordion# */
    {
      initialize: function(args) {
        Accordion.__super__.initialize.call(this, args);

        this.addClass("accordion");
      },

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          var childPanelID = this.id + "-" + i;
          markup += "<div class='accordion-group'>" +
                      "<div class='accordion-heading'>" +
                        "<a class='accordion-toggle' data-parent='#" + this.id + "' data-toggle='collapse' href='#" + childPanelID +"'>" +
                          child.heading +
                        "</a>" +
                      "</div>" +
                      "<div class='accordion-body collapse" + (child.open ? " in" : "") + "' id='" + childPanelID +"'>" +
                        "<div class='accordion-inner'>" +
                          child.render() +
                        "</div>" +
                      "</div>" +
                    "</div>";
        }, this);

        return markup;
      }
    },
    /** @lends Accordion */
    {
      klass: "Accordion"
    });