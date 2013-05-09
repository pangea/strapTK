/* Sprocket Manifest
 *= require Panel
 */

/**
 * @class Provides a method of creating images simply
 * @extends Panel
 *
 * @property {String} src The URI of the source image
 */
var StrapImage = Panel.extend(
    /** @lends StrapImage# */
    {
      /** @see Panel#initialize */
      initialize : function(args) {
        StrapImage.__super__.initialize.call(this, args);

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
        return FormSelect.__super__.listAttributes.call(this, "src");
      }
    },
    /** @lends StrapImage */
    {
      klass: "StrapImage"
    })