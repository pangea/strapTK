/* Sprocket Manifest
 *= require Panel
 */
var Paragraph = Panel.extend(
    /** @lends Paragraph# */
    {
      template : strap.generateSimpleTemplate("p")
    },
    /** @lends Paragraph */
    {
      klass: "Paragraph"
    }),
    P = Paragraph;