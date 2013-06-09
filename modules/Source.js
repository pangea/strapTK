/* Sprocket Manifest
 *= require Panel
 */

/**
 * @class Sources are Components that know how to gather and use data gathered from a 3rd party API
 * @extends Panel
 *
 * @property {String} src   The URL to the data source of this component
 * @property {Object} data  The data for this Source
 */
var Source = Panel.extend(
    /** @lends Source# */
    {
      /** @see Component#initialize */
      initialize : function(args) {
        Source.__super__.initialize.call(this, args);

        this.setDefaultValue("", "src");
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
        markup = _.map(_data, function(entry) {
          return this.template({
            "yield": innerHTML,
            "data" : entry,
            "rootAttrs" : this.listAttributes()
          });
        }, this).join("");

        if(intoDOM && this.id) {
          $("#"+this.id).html(markup);
        }

        return markup;
      }
    },
    /** @lends Source */
    {
      klass: "Source"
    });