/* Sprocket Manifest
 *= require Panel
 */

/**
 * @class Provides a method of creating images simply
 * @extends Panel
 *
 * @property {String} src The URI of the source image
 */
var Img = Panel.extend(
    /** @lends Img# */
    {
      /** @see Panel#initialize */
      initialize : function(args) {
        Img.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "src");
      },

      /** @see Panel#template */
      template : _.template("<img <%= rootAttrs %> />"),

      /**
       * Override of listAttributes to add src to the attributes returned
       *
       * @see Panel#listAttributes
       */
      listAttributes : function() {
        return Img.__super__.listAttributes.call(this, "src");
      }
    },
    /** @lends Img */
    {
      klass: "Img"
    });