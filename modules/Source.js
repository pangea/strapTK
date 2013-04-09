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

        //set up Fetching here, if src is not blank
      },

      /**
       * Source objects must define their templates at instanciation.
       *
       * @throws Not Defined
       */
      template : function() { throw "Not Defined"; },

      /**
       * Overrides render to pass in the Source#data field
       *
       * @see Panel#render
       */
      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "data" : this.data,
          "rootAttrs" : this.listAttributes()
        });
      }
    },
    /** @lends Source */
    {
      klass: "Source"
    });