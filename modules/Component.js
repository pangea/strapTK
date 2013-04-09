/**
 * @author Chris Hall (chall8908@gmail.com)
 * @class
 * Generic Class that can apply arbitrary fields to itself and is extendable.
 * Base objects cannot be created directly as they lack an #initialize function.
 *
 * @param {Object|Array}  [attributes={}]  Values to apply to this Component.  All values supplied are applied to the created Component
 * @param {Object}        [options={}]     Passed to the initialize function (currently unused by any default component)
 */
function Base(attributes, options)  {
  var attrs = attributes || {},
      opts = options || {};

  if(_.isArray(attrs)) {
    attrs = {children: attrs};
  }

  for(attr in attrs) {
    this[attr] = attrs[attr];
  }

  this.initialize(opts);
};

/**
 * Wrapper for the Extend function to provide this as the parent of the new object
 *
 * @see Extend
 */
Base.extend = function(protoProps, staticProps) {
  return Extend(this, protoProps, staticProps);
};

/**
 * @class Components are generic objects that can add and remove children and render themselves
 * @extends Base
 */
var Component = Base.extend(
    /**
     * @lends Component#
     */
    {
      /**
       * Initializes Components with default values and performs sanity checks
       *
       * @param {Object} [args] Additional arguments (currently unused)
       */
      initialize : function(args) {
        /**
         * The child components of this component
         *
         * @name children
         * @field
         * @default []
         */
        this.setDefaultValue([], "children");

        _.each(this.children, function(child) {
          this.checkIfRenderable(child);
        }, this);

        /**
         * The string to prefix to each child's rendered markup
         *
         * @name childPrefix
         * @field
         * @default []
         */
        this.setDefaultValue("", "childPrefix", "childSuffix");

        /** used for deserialization from JSON */
        this.klass = this.constructor.klass;
      },

      /**
       * Sets the value of a field, if and only if it hasn't been defined on this object.
       * That is, it defines the value if Object.field was set on this Object and not in this Object's prototype chain.
       *
       * This method accepts a variable number of attibutes.
       * E.G.
       * <code>this.setDefaultValue("", "childPrefix", "childSuffix")</code>
       *
       * @param value The value to assign
       * @param {String} attribute The key to assign a value.
       *
       * @example
       * this.setDefaultValue("", "childPrefix", "childSuffix");
       */
      setDefaultValue: function(value, attribute) {
        var args = Array.prototype.slice.call(arguments, 1),      // get the list of attributes to apply the value to
            method = _.isArray(value) ? "apply" : "call";         // determine which Function prototype method to call

        _.each(args, function(attr) {
          if(!this.hasOwnProperty(attr)) {                        // set value only if it's not already set
            this[attr] = value.constructor[method](this, value);  // clone value by calling its constructor function
          }
        }, this);
      },

      //Default template function
      //Subcomponents should override this method to provide proper markup
      template : function(args) {
        return args.yield;
      },

      //Append a child
      push : function(component) {
        this.checkIfRenderable(component);
        this.children.push(component);
        return this;
      },

      //Remove the last child
      pop : function() {
        return this.children.pop();
      },

      //Prepend a child
      unshift : function(component) {
        this.checkIfRenderable(component);
        this.children.unshift(component);
        return this;
      },

      //Remove the first child
      shift : function() {
        return this.children.shift();
      },

      //Add a child at the specified index (or the last index)
      insert : function(component, index) {
        this.checkIfRenderable(component);
        if(index) {
          this.children.splice(index, 0, component);
        } else {
          this.children.push(component);
        }

        return this;
      },

      // Gets the child at the selected index
      get : function(index) {
        switch(typeof(index)) {
          case "string":
            return this[index];

          case "number":
            return this.children[index];
        }

        throw TypeError("index must be a string or number.");
      },

      //Removes the child at index
      remove : function(index) {
        if(index) {
          return this.children.splice(index, 1)[0];
        }
        return this.pop();
      },

      checkIfRenderable : function(renderable) {
        if(typeof(renderable.render) === "function") {
          return;
        }

        throw TypeError("Object does not respond to render.")
      },

      renderChildren : function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);

        var markup = "";
        _.each(this.children, function(child) {
          markup += prefix + child.render() + suffix;
        });
        return markup;
      },

      //Compiles the markup for this component
      render : function() {
        return this.template({"yield": this.renderChildren()});
      },

      /**
       * Provide a useful toString method
       */
      toString : function(asJSON) {
        return asJSON ? JSON.stringify(this) : this.render();
      },

      /**
       * Create a deep clone of this Component
       */
      clone : function() {
        return strap.build(this.toString(true));
      }

    },{
      klass : "Component"
    });

//aliases
Component.prototype.add = Component.prototype.push;