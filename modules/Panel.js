/* Sprocket Manifest
 *= require Component
 */
var Panel = Component.extend(
    /** @lends Panel# */
    {
      /**
       * Extends the functionality of the Base contstructor to also allow a String to be passed as attributes.
       * If attributes is a String, it's used as the body of the resulting Panel.
       *
       * @class
       * Panels are components designed to work with the DOM.
       * They have templates that return HTML and fields and methods for working with HTML markup.
       * Aliased as Div
       *
       * @extends Component
       *
       * @property {String[]} classes     The list of classes for this Panel
       * @property {String[]} attributes  The list of attributes for this Panel (can be any valid XML attribute)
       * @property {String}   id          The CSS ID of this Panel
       * @property {String}   body        The text and/or markup that makes up this Panel
       *
       * @constructs
       *
       * @param {Object|Array|String} [attributes={}]  Values to apply to this Panel.  All values supplied are applied to the created Panel
       * @param {Object}              [options={}]     Passed to the initialize function (currently unused by any default component)
       *
       * @see Base
       */
      constructor: function(attributes, options) {
        if(typeof(attributes) == "string") {
          attributes = {body: attributes};
        }

        Panel.__super__.constructor.call(this, attributes, options);
      },

      /** @see Component#initialize */
      initialize: function(args) {
        Panel.__super__.initialize.call(this, args);

        this.setDefaultValue([], "classes", "attributes");
        this.setDefaultValue("", "id", "body");

        // Convert a list of space separated classes/attributes into a proper array
        _.each(["classes", "attributes"], function(attr) {
          if(typeof(this[attr]) === "string") {
            this[attr] = _.uniq(this[attr].split(" "));
          }
        }, this);
      },

      /**
       * Adds classes to the list of classes
       * This function accepts a variable number of arguments
       * this function is chainable
       *
       * @param {String} newClass The new class to be added
       * @returns {Panel} this
       */
      addClass : function() {
        // gather up the classes to be added
        var newClasses = Array.prototype.slice.call(arguments, 0);
        // combine the current class list with the new class list, ignoring duplicates
        this.classes = _.union(this.classes, newClasses);
        return this;
      },

      /**
       * Removes classes to the list of classes
       * This function accepts a variable number of arguments
       * this function is chainable
       *
       * @param {String} oldClass The new class to be removed
       * @returns {Panel} this
       */
      removeClass : function() {
        // gather up the classes to be removed, and add them to an array
        // the final result is [[list, of, current, classes], list, of, classes, to, be, removed]
        var args = [this.classes].concat(Array.prototype.slice.call(arguments, 0));
        // apply the arguments to _.without
        // this is equivalent to _.without(this.classes, list, of, classes, to, be, removed);
        this.classes = _.without.apply(this, args);
        return this;
      },

      /**
       * Adds or removes classes from the list of classes
       * This function accepts a variable number of arguments
       * this function is chainable
       *
       * @param {String} theClass The class to be toggled
       * @returns {Panel} this
       */
      toggleClass : function() {
        var theClasses = Array.prototype.slice.call(arguments, 0),
            existingClasses = _.intersection(this.classes, theClasses);

        // Essentially, what we're doing here is combining the classes to be toggled
        //  with the current list of classes to add any new ones.
        // Then, we're removing the ones that existed in both lists prior to the union
        this.classes = _.without(_.union(this.classes, theClasses), existingClasses);

        return this;
      },

      /**
       * Helper method to stringify the class array for DOM insertion
       *
       * @returns {String} The list of classes, space separated.
       */
      listClasses : function() {
        return this.classes.join(" ");
      },

      /**
       * Compiles all the HTML attributes and returns them in a manner acceptable for DOM insertion
       * This method always tries to attach the ID and classes of the Panel
       * If supplied string keys as arguments, it will attempt to add these keys to the attribute output in the following form:
       * key='value_of_key'
       *
       * If the key has no value or is not defined, it is not added to the list.
       * A key is considered to have no value if it is === "".
       * If you need an attribute to have this value, you should manually add it to the list of attributes.
       *
       * @param {String} [addAttr]  Additional attribute to be added to the compiled list of attributes
       *
       * @returns {String} A space separated list of attributes ready for use in the DOM
       */
      listAttributes : function() {
        // convert arguments into an actual array and map the values to the ones attached to this Panel
        // the HTML ID is always added to this list
        var args = Array.prototype.slice.call(arguments, 0).concat(["id"]),
            attrs = this.attributes,
            classes = this.listClasses(),
            addAttrs = _(args).map(function(key) {
              // remove empty values
              if(this[key] === "" || typeof(this[key]) === "undefined") {
                return false;
              }

              return key + "='" + this[key] + "'";
            }, this).compact().value();

        // Add the classes, if any
        if(classes !== "") {
          addAttrs.push("class='"+classes+"'");
        }

        // if attributes isn't an array, we need to make it one
        if(_.isObject(attrs) && !_.isArray(attrs)) {
          // parse the data object, if it exists
          if(attrs.data && _.isObject(attrs)) {
            _.each(attrs.data, function(val, key) {
              attrs["data-"+key] = val;
            });
          }

          attrs = _.map(attrs, function(val, key) {
            return key + "='" + val + "'";
          });
        }

        // return the combined list
        return _.union(attrs, addAttrs).join(" ");
      },

      /**
       * Panels and their subclasses all define HTML markup templates.
       * The Panel template is very simple, and is built using the {@link Strap#generateSimpleTemplate} method
       * For more information on templates, see <a href='http://lodash.com/docs#template' target='_dash'>Lo-Dash's Template Docs</a>.
       *
       * @param {Object} args           The data used to construct the template
       * @param {Object} args.yield     The main body of the template
       * @param {Object} args.rootAttrs The HTML attributes of the root HTML element of the template
       *
       * @returns {String} the HTML markup for this Panel
       *
       * @see Panel#render
       * @see Strap#generateSimpleTemplate
       */
      template : strap.generateSimpleTemplate("div"),

      /**
       * @see Component#renderHash
       *
       * Overrides Component#renderHash to add body and attributes
       */
      renderHash : function() {
        return  {
                  yield: this.body + this.renderChildren(),
                  rootAttrs : this.listAttributes()
                };
      },

      /**
       * Compiles all the markup for this Panel
       * If the optional intoDom argument is truthy and the Panel has an ID
       *  the generated markup is inserted directly into the DOM.
       *
       * @param {Boolean} intoDOM Specifies that the markup should be inserted into the DOM
       *
       * @returns {String} The compiled markup
       */
      render : function(intoDOM) {
        var markup = Panel.__super__.render.call(this);

        if(intoDOM && this.id) {
          $("#"+this.id).html(markup).add(this).trigger("after-render", [this]);
        }

        return markup;
      }
    },
    /** @lends Panel */
    {
      klass: "Panel"
    }),
    /** @ignore */
    Div = Panel;
