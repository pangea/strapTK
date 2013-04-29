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

      renderHash : function() {
        return  _.extend(
                  Source.__super__.renderHash.call(this),
                  { data: this.data }
                );
      }
    },
    /** @lends Source */
    {
      klass: "Source"
    });