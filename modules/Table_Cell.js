/* Sprocket Manifest
 *= require Panel
 */
var TableCell = Panel.extend(
    /** @lends TableCell# */
    {
      template : strap.generateSimpleTemplate("td")
    },
    /** @lends TableCell */
    {
      klass: "TableCell"
    });