/**
 * @class As the name suggests, AbstractBadge is an abstract class used to keep the Badge and Label classes DRY.  This is a type aware class.
 * @extends Panel
 *
 * @see Typify
 */
var AbstractBadge = Panel.extend(
    /** @lends AbstractBadge# */
    {
      /** @see Panel#initialize */
      initialize : function(args) {
        AbstractBadge.__super__.initialize.call(this, args);
        Typify(this);
      },

      /** @see Panel#template */
      template : strap.generateSimpleTemplate("span")
    },
    /** @lends AbstractBadge */
    {
      klass: "AbstractBadge",
      types : ["success", "warning", "important", "info", "inverse"]
    });