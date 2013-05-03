/* Sprocket Manifest
 *= require Panel
 */
var Span = Panel.extend(
    /** @lends Span# */
    {
      template: strap.generateSimpleTemplate("span")
    },
    /** @lends Span */
    {
      klass: "Span"
    });