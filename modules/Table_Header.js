/* Sprocket Manifest
 *= require Panel
 */
var TableHeader = Panel.extend(
    /** @lends TableHeader# */
    {
      template : strap.generateSimpleTemplate("th")
    },
    /** @lends TableHeader */
    {
      klass: "TableHeader"
    });