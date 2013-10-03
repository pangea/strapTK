/* Sprocket Manifest
 *= require Panel
 */

/**
 * @class Sources are Components that know how to gather and use data gathered from a 3rd party API
 * @extends Panel
 *
 * @property {String} src       The URL to the data source of this component
 * @property {Object} data      The data for this Source
 * @property {String} parentID  The ID to insert the content into if doing DOM injection
 *
 * @see Source#render
 */
var Source = Panel.extend(
    /** @lends Source# */
    {
      /** @see Component#initialize */
      initialize : function(args) {
        Source.__super__.initialize.call(this, args);

        this.setDefaultValue("", "src", "parentID");
        this.setDefaultValue({}, "data");

        // convert template from string to function
        if(typeof(this.template) === "string") {
          this.template = _.template(this.template);
        }

        //set up Fetching here, if src is not blank
      },

      /**
       * Source objects must define their templates at instantiation.
       *
       * @throws Not Defined
       */
      template : function() { throw "Not Defined"; },

      /**
       * Overrides render to pass in the Source#data field
       *
       * If data is a function, the result of calling that function is
       * passed into the template
       *
       * If data is an array, the template is called once for each element
       * in the array.
       *
       * @see Panel#render
       */
      render : function(intoDOM) {
        // if data is a function, use the return from that function, else data
        var markup,
            _data = (this.data.call ? this.data.call(this) : this.data),
            innerHTML = this.body + this.renderChildren();

        // make data an array to make this easier
        if(!_.isArray(_data)) {
          _data = [_data];
        }

        // iterate over the contents of data and produce the templates
        markup = _.map(_data, function(entry, i) {
          return this.template({
            "yield"     : innerHTML,
            "data"      : entry,
            "index"     : i,
            "rootAttrs" : this.listAttributes()
          });
        }, this).join("");

        if(intoDOM && this.parentID) {
          $("#"+this.parentID).html(markup).add(this).trigger("after-render", [this]);
        }

        return markup;
      }
    },
    /** @lends Source */
    {
      klass: "Source"
    });
