/* Sprocket Manifest
 *= require Panel
 */
var FormLabel = Panel.extend(
    /** @lends FormLabel# */
    {
      template : strap.generateSimpleTemplate("label")
    },
    /** @lends FormLabel */
    {
      klass : "FormLabel"
    });