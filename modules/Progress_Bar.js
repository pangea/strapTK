/* Sprocket Manifest
 *= require Panel
 *= require Typify
 */
var ProgressBar = Panel.extend(
    /** @lends ProgressBar# */
    {
      initialize: function(args) {
        ProgressBar.__super__.initialize.call(this, args);
        this.setDefaultValue(100, "width");

        this.setWidth(this.width);

        this.base = "bar";
        Typify(this);
      },

      setWidth: function(newWidth) {
        if(newWidth > 100) {
          throw new RangeError("cannot set width greater than 100%");
        } else if(newWidth < 0) {
          throw new RangeError("cannot set width less than 0%");
        }

        //set width and style attributes
        var oldWidth = this.width;
        this.width = newWidth;
        this.attributes = _.reject(this.attributes, function(attr) {
          return attr.match(/style/i);
        }).concat(["style='width: "+newWidth+"'"]);

        //fire width-change event so that parent ProgressBarGroups can update accordingly
        if(oldWidth !== newWidth) {
          $(this).trigger("progressbar.width-change", newWidth, oldWidth);
        }
      }
    },
    /** @lends ProgressBar */
    {
      klass: "ProgressBar",
      types: ["info", "success", "warning", "danger"]
    });