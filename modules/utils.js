/**
 * The strap object contains a set of global functions that apply to the entire page
 */
var strap = new (function() {
      /**#nocode+
       * @WIP
       */
      this.allDraggable = function(draggable) {
        if(draggable === true) {
          $("body").find("*").attr("draggable", "true")
        } else if(draggable === false) {
          $("body").find("*").removeAttr("draggable")
        }
      }
      /**#nocode- */

      /**
       * Constructs Strap'd objects from JSON.
       * While it is possible to pass a Strap'd object into this function and receive a
       * fully functional object out, the original object will be altered.
       *
       * @param {String|Object|Array} json The JSON string or object to be converted
       *
       * @returns {Object|Object[]} The result of building the Strap'd objects
       */
      this.build = function(json) {

        /**
         * Parses the JSON and produces Strap'd classes
         *
         * @private
         *
         * @oaram {String|Object|Array} json The JSON string or Object to be parsed
         *
         * @returns {Object} A Strap'd object
         */
        function parse(json) {
          var obj,
              name = json.klass,
              children = json.children;

          delete json.klass;
          delete json.children;

          // Create the base strap'd class
          obj = new window[name](json);

          // Check if the object was manually typified
          if(obj.type && !obj.setType) {
            Typify(obj);  // and typify it
          }

          // Parse the list of children
          if(children && _.isArray(children) && children.length) {
            _(children).each(function(child) {
              obj.add(parse(child)); // Parse each child and add it to the main object's list of children
            });
          }

          return obj;
        }

        // Check if the JSON needs parsing
        if(typeof(json) === "string") {
          json = JSON.parse(json);
        }

        if(_.isArray(json)) {
          // If we have an array of objects, we need to parse each of them
          var ret = [];
          _.each(json, function(obj) { ret.push(parse(obj)); });
          return ret;
        } else {
          // Otherwise, we just parse what we have
          return parse(json);
        }
      }

      /**
       * Generates a simple template with the given tag
       *
       * @param {String} tag The HTML tag to use
       *
       * @returns {Function} A function that can be used to compile the template
       */
      this.generateSimpleTemplate = function(tag) {
        return _.template("<"+tag+" <%= rootAttrs %>><%= yield %></"+tag+">");
      }
    })();

/**
 * Global Extend function for creating subclasses
 * Unceremoniously ripped out of Backbone.js.  Those guys are way smarter than I am.
 * You should go check out their work too: http://backbonejs.org
 *
 * The only modification made to this function is to add 'parent' as an argument instead
 *  of having the function be added to an object.
 *
 * @function
 *
 * @param parent [Object] the object to be extended
 * @param protoProps [Object] the properties to add to the new object's prototype
 * @param staticProps [Object] the properties to add to the new object's constructor
 *
 * @return the extended object
 */
// Function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
function Extend(parent, protoProps, staticProps) {
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
}

/**
 * Decorates the given component with the necessary variables and methods to handle being typed.
 *  A typed object is one that has a "base" and is then further modified with a "type".
 *  E.G. An alert can be an "error" message (and have a "type" of "error")
 *
 * This method does not overwrite any variables set on the decorated component unless it
 *  already has a setType property (which it shouldn't >:[)
 *
 * @param component [Component] the component to be decorated,
 * @param options   [Object]    the default values of type, base, and types can be defined in this object
 */
function Typify(component, options) {
  options = _.extend({}, Typify.defaults, options);

  component.setType = function(type) {
    if(this.type) {
      this.removeClass(this.base+"-"+this.type);
      delete this.type;
    }
    if(type) {
      if(!_.include(this.constructor.types, type)) {
        throw new RangeError("Invalid type - "+type);
      }
      this.type = type;
      this.addClass(this.base+"-"+type);
    }
  };
    // call is used here to force the value of this to be the
    //  component's constructor instead of the component itself
  component.setDefaultValue.call(component.constructor, options.types, "types");  // set the types, if not already set
                                                                                  // types are defined on the constructor because only instance of
                                                                                  //  the list of types is needed for each instance of this component
                                                                                  //  In most cases, this function will do nothing
  component.setDefaultValue(options.base, "base");  // set the base, if not already set
  component.setDefaultValue(options.type, "type");  // set the type, if not already set

  if(component.base) {
    component.addClass(component.base);
  }

  if(component.type) {
    component.setType(component.type);
  }
}

/** @constant */
Typify.defaults = {
  types: [""],
  base: "",
  type: ""
}