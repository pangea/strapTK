/* Sprocket Manifest
 *= require Panel
 */
var Source = Panel.extend(
    /** @lends Source# */
    {
      /**
       * Overrides Panel's constructor to apply strings passed in via attributes
       * to be applyed as a template instead of the body.
       *
       * @class Sources are Components that use data to construct themselves.
       *        The data can either be provided (via an object) or collected
       *        (via a function).
       *
       * @extends Panel
       *
       * @property {String} src       The URL to the data source of this component
       * @property {Object} data      The data for this Source
       * @property {String} parentID  The ID to insert the content into if doing DOM injection
       *
       * @see Source#render
       */
      constructor : function(attributes, options) {
        if(_.isString(attributes)) {
          attributes = { template: attributes };
        }

        Source.__super__.constructor.call(this, attributes, options);
      },

      /** @see Component#initialize */
      initialize : function(args) {
        Source.__super__.initialize.call(this, args);

        this.setDefaultValue("", "src", "parentID");
        this.setDefaultValue({}, "data");

        // convert template from string to function
        if(_.isString(this.template)) {
          var temp = this.template;
          this.template = _.template(temp);
          this.template.uncompiled = temp;
          this.template.toJSON = function() {
            return this.uncompiled;
          };
        }

        //set up Fetching here, if src is not blank
      },

      /**
       * Source objects must define their templates at instantiation.
       *
       * @throws Not Defined
       */
      template : function() { throw "Template Not Defined"; },

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
