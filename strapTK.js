/*
 * Strap'd ToolKit v 0.2.2
 * Authored by Chris Hall
 * Copyright 2013 to Pangea Real Estate
 * Under a Creative Commons Attribution-ShareAlike 3.0 Unported License
 */
;
var strap = (function() {
      /**
       * Attempts to generate a Component from a given hash
       *
       * @param {Object} obj        The object to strap
       * @param {String} [obj.tag]  The HTML tag the new Component should have
       *
       * @return {Component|Panel} A strap'd object
       *
       * @see Component
       * @see Panel
       */
      var strap = function(obj) {
        var tagged = typeof(obj.tag) != "undefined" && typeof(obj.tag) == "string",
            gen = tagged ? new Panel(obj) : new Component(obj);

        if(tagged) {
          gen.template = strap.generateSimpleTemplate(obj.tag);
        }

        return gen;
      }

      /**
       * Constructs Strap'd objects from JSON.
       * While it is possible to pass a Strap'd object into this function and receive a
       * fully functional object out, the original object will be altered.
       *
       * @param {String|Object|Array} json The JSON string or object to be converted
       *
       * @returns {Object|Object[]} The result of building the Strap'd objects
       */
      strap.build = function(json) {

        /**
         * Parses the JSON and produces Strap'd classes
         *
         * @private
         *
         * @param {Object} json The object to be parsed
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
      strap.generateSimpleTemplate = function(tag) {
        return _.template("<"+tag+" <%= rootAttrs %>><%= yield %></"+tag+">");
      }

      return strap;
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
;
/* Sprocket Manifest

 */

/**
 * Defines the base constructor for all Strap'd Components (except Raw, HorizontalRule, and LineBreak).
 * If attributes is an Array, it will be used as the list of children for the resulting Component.
 *
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
/* Sprocket Manifest


 */

/**
 * @class Components are generic objects that can add and remove children and render themselves
 * @extends Base
 *
 * @property {String[]} children    This component's children.
 * @property {String}   childPrefix The string to prepend to each child's rendered markup.
 * @property {String}   childSuffix The string to append to each child's rendered markup.
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

        this.setDefaultValue([], "children");

        _.each(this.children, this.checkIfRenderable);

        this.setDefaultValue("", "childPrefix", "childSuffix");

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

      /**
       * Used to compile the markup for this Component.
       *  By default, Components only return the yield field in the supplied args
       *
       * Subclasses of Component should override template to provide proper markup
       *
       * @param {Object} args       The arguments used to build this Component's markup
       * @param {String} args.yield The body and compiled children of this Component
       *
       * @returns {String} Returns args.yield
       */
      template : function(args) {
        return args.yield;
      },

      /**
       * Adds a child object to the end of the list of children
       * This function is chainable
       *
       * @param {Component} component The component to add to this Component's list of children
       *
       * @returns {Component} returns this
       *
       * @throws {TypeError} if the supplied component doesn't respond to #render
       */
      push : function(component) {
        this.checkIfRenderable(component);
        this.children.push(component);
        return this;
      },

      /**
       * Removes the last child from the list of children
       *
       * @returns {Component} The removed child
       */
      pop : function() {
        return this.children.pop();
      },

      /**
       * Adds a child to the beginning of the list of children
       * This function is chainable
       *
       * @param {Component} component The component to add to this Component's list of children
       *
       * @returns {Component} returns this
       *
       * @throws {TypeError} If the supplied component doesn't respond to #render
       */
      unshift : function(component) {
        this.checkIfRenderable(component);
        this.children.unshift(component);
        return this;
      },

      /**
       * Removes the first child from the list of children
       *
       * @returns {Component} The removed child
       */
      shift : function() {
        return this.children.shift();
      },

      /**
       * Adds a child at the specified index to the list of children
       * If no index is given, functions as {@link Component#push}
       * This function is chainable
       *
       * @param {Component} component The component to add to this Component's list of children
       * @param {Integer}   [index]   The index at which to add the child
       */
      insert : function(component, index) {
        this.checkIfRenderable(component);
        if(index) {
          this.children.splice(index, 0, component);
        } else {
          this.children.push(component);
        }

        return this;
      },

      /**
       * Gets the child at the given index or the field with the given key
       *
       * @param {String|Integer} index  The index of the child or key of the field to return
       *
       * @returns The child at the given index or the value of the given key
       *
       * @throws {TypeError} If index is not a string or integer
       */
      get : function(index) {
        switch(typeof(index)) {
          case "string":
            return this[index];

          case "number":
            return this.children[index];
        }

        throw TypeError("index must be a string or number.");
      },

      /**
       * Removes the child at the given index
       * if no index is given, functions as {@link Component#pop}
       *
       * @param {Integer} [index] The index of the child to be removed
       *
       * @returns {Component} The component at the given index
       */
      remove : function(index) {
        if(index) {
          return this.children.splice(index, 1)[0];
        }
        return this.pop();
      },

      /**
       * Removes all the children from this Component
       *
       * @returns {Array} the list of children
       */
      flush : function() {
        var children = this.children;
        this.children = [];
        return children;
      },

      /**
       * Checks if the given object is renderable
       * That is, if it has a method named render.
       *
       * @param {Object} renderable The object to check
       *
       * @throws {TypeError} If the given object is not renderable
       */
      checkIfRenderable : function(renderable) {
        // renderable might be buildable
        if(renderable.klass && !renderable.render) {
          renderable = strap.build(renderable);
        }

        if(typeof(renderable.render) === "function") {
          return;
        }

        throw TypeError("Object does not respond to render.")
      },

      /**
       * Renders this components children
       *
       * @param {String} [prefix=this.childPrefix] the string to prepend to each child's markup
       * @param {String} [suffix=this.childSuffix] the string to append to each child's markup
       *
       * @returns {String} The compiled markup of this Component's children
       */
      renderChildren : function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);

        var markup = "";
        _.each(this.children, function(child) {
          markup += prefix + child.render() + suffix;
        });
        return markup;
      },

      /**
       * Constructs the hash of attributes to send into the template function
       *
       * @returns {Object} the render hash
       */
      renderHash : function() {
        return { yield: this.renderChildren() };
      },

      /**
       * Compiles all the markup for this component.
       *
       * @returns {String} The compiled markup for this component
       * @see Component#renderChildren
       */
      render : function() {
        return this.template(this.renderHash());
      },

      /**
       * Calls Component#render or stringifies to JSON
       *
       * @param {Boolean} asJSON  If this method should return the output of render or JSON#stringify
       *
       * @returns {String}
       */
      toString : function(asJSON) {
        return asJSON ? JSON.stringify(this) : this.render();
      },

      /**
       * Create a deep clone of this Component
       *
       * @returns {Component} a deep clone of this component
       */
      clone : function() {
        return strap.build(this.toString(true));
      }

    },
    /** @lends Component */
    {
      /** Used in serialization and deserialization */
      klass : "Component"
    });

//aliases
/**
 * @function
 * @see Component#push
 */
Component.prototype.add = Component.prototype.push;
/* Sprocket Manifest

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
       * @param {Object|Array|String} [attributes={}]  Values to apply to this Component.  All values supplied are applied to the created Component
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

        // return the combined list
        return _.union(this.attributes, addAttrs).join(" ");
      },

      /**
       * Panels and their subclasses all define HTML markup templates.
       * The Panel template is very simple, and is built using the {@link Strap#generateSimpleTemplate} method
       *
       * @param {Object} args           The data used to construct the template
       * @param {Object} args.yield     The main body of the template
       * @param {Object} args.rootAttrs The HTML attributes of the root HTML element of the template
       *
       * @returns {String} the HTML markup for this Panel
       *
       * @see Panel#render
       * @see Strap#generateSimpleTemplate
       * @see <a href='http://lodash.com/docs#template' target='_dash'>Lo-Dash's Template Docs</a>
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
;
/* Sprocket Manifest


 */

/**
 * @class As the name suggests, AbstractBadge is an abstract class used to keep the Badge and Label classes DRY.  This is a type aware class.
 * @extends Panel
 *
 * @see Typify
 */

var AbstractBadge = Panel.extend(
    /** @lends AbstractBadge# */
    {
      /** @see Panel#initialize */
      initialize : function(args) {
        AbstractBadge.__super__.initialize.call(this, args);
        Typify(this);
      },

      /** @see Panel#template */
      template : strap.generateSimpleTemplate("span")
    },
    /** @lends AbstractBadge */
    {
      klass: "AbstractBadge",
      types : ["success", "warning", "important", "info", "inverse"]
    });
/* Sprocket Manifest

 */

var Accordion = Panel.extend({
      initialize: function(args) {
        Accordion.__super__.initialize.call(this, args);

        this.addClass("accordion");
      },

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          var childPanelID = this.id + "-" + i;
          markup += "<div class='accordion-group'>" +
                      "<div class='accordion-heading'>" +
                        "<a class='accordion-toggle' data-parent='#" + this.id + "' data-toggle='collapse' href='#" + childPanelID +"'>" +
                          child.heading +
                        "</a>" +
                      "</div>" +
                      "<div class='accordion-body collapse" + (child.open ? " in" : "") + "' id='" + childPanelID +"'>" +
                        "<div class='accordion-inner'>" +
                          child.render() +
                        "</div>" +
                      "</div>" +
                    "</div>";
        }, this);

        return markup;
      }
    },{
      klass: "Accordion"
    });
/* Sprocket Manifest


 */

var Alert = Panel.extend({
      initialize : function(args) {
        Alert.__super__.initialize.call(this, args);
        this.base = "alert";
        Typify(this);
      },

      isBlock : function(blocked) {
        var isBlocked = _.include(this.classes, "alert-block");
        if(blocked === true) {
          if(!isBlocked) {
            this.addClass("alert-block");
          }
        } else if(blocked === false) {
          if(isBlocked) {
            this.removeClass("alert-block");
          }
        } else {
          return isBlocked;
        }
      },
      /**
       * Sets the closability of this alert.
       * Calling setClosable without specifying the closability sets closable to true
       *
       * @param closable [Boolean|null] Sets the closability of the alert.
       */
      setClosable : function(closable) {
        var hasCloseButton = false,
            closeButtonIndex = -1;

        _.each(this.children, function(child, i) {
          if(child instanceof CloseButton) {
            hasCloseButton = true;
            closeButtonIndex = i;
            return false;
          }
        });

        if(closable === true || typeof(closable) != "boolean") {
          if(hasCloseButton === false) {
            this.unshift(new CloseButton({
              attributes: ["data-dismiss='alert'"]
            }));
          }
          this.closable = true;
        } else {
          if(hasCloseButton) {
            this.remove(closeButtonIndex);
          }
        }
      }
    },{
      klass: "Alert",
      types: ["error", "success", "info"]
    });
/* Sprocket Manifest

 */

var Badge = AbstractBadge.extend({
      initialize : function(args) {
        this.base = "badge";
        Badge.__super__.initialize.call(this, args);
      }
    },{
      klass: "Badge"
    });
/* Sprocket Manifest

 */

var Breadcrumbs = Panel.extend({
      initialize : function(args) {
        Breadcrumbs.__super__.initialize.call(this, args);
        this.childPrefix || (this.childPrefix = "<li>");
        this.childSuffix || (this.childSuffix = "<span class='divider'>/</span></li>");
        this.addClass("breadcrumb");
      },

      template : strap.generateSimpleTemplate("ul"),

      render : function(intoDOM) {
        var markup = Breadcrumbs.__super__.render.call(this).split(this.childSuffix),
            last = markup.pop();

        markup = markup.join(this.childSuffix) + last;

        if(intoDOM && this.id) {
          $("#"+this.id).html(markup);
        }

        return markup;
      }
    },{
      klass: "Breadcrumbs"
    });
/* Sprocket Manifest

 */

var Link = Panel.extend({
      initialize : function(args) {
        Link.__super__.initialize.call(this, args);

        this.setDefaultValue("#", "href");
      },

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "href");
      },

      template : strap.generateSimpleTemplate("a")
    },{
      klass: "Link"
    });
/* Sprocket Manifest


 */

var Button = Link.extend({
      initialize : function(args) {
        Button.__super__.initialize.call(this, args);

        this.attributes.unshift("type='button'");

        this.base = "btn";

        Typify(this);
      }
    },{
      klass: "Button",
      types: ["primary", "secondary", "info", "success", "warning", "danger", "inverse", "link"]
    });
/* Sprocket Manifest

 */

var ButtonGroup = Panel.extend({
      initialize: function(args) {
        ButtonGroup.__super__.initialize.call(this, args);
        this.addClass("btn-group");
      }
    },{
      klass: "ButtonGroup"
    });
/* Sprocket Manifest

 */

var ButtonToolbar = Panel.extend({
      initialize: function(args) {
        ButtonToolbar.__super__.initialize.call(this, args);
        this.addClass("btn-toolbar");
      }
    },{
      klass: "ButtonToolbar"
    });
/* Sprocket Manifest

 */

var Carousel = Panel.extend({
      initialize: function(args) {
        Carousel.__super__.initialize.call(this, args);

        this.setDefaultValue(true, "controls");
        this.setDefaultValue("&lsaquo;", "prevSymbol");
        this.setDefaultValue("&rsaquo;", "nextSymbol");

        this.addClass("carousel", "slide");
      },

      template : _.template("<div <%= rootAttrs %>>" +
                              "<% if(controls) { %>" +
                                "<ol class='carousel-indicators'>" +
                                  "<% _(slides).times(function(i){ %>" +
                                    "<li data-slide-to='<%= i %>' data-target='#<%= rootID %>' <%= i == 0 ? \"classes='active'\" : '' %>></li>" +
                                  "<% }); %>" +
                                "</ol>" +
                              "<% } %>" +
                              "<div class='carousel-inner'>" +
                                "<%= yield %>" +
                              "</div>" +
                              "<% if(controls) { %>" +
                                "<a class='carousel-control left' data-slide='prev' href='#<%= rootID %>'><%= prevSymbol %></a>" +
                                "<a class='carousel-control right' data-slide='next' href='#<%= rootID %>'><%= nextSymbol %></a>" +
                              "<% } %>" +
                            "</div>"),

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          child.addClass("item");
          if(i === 0) {
            child.addClass("active");
          }
          markup += child.render();
        });
        return markup;
      },

      renderHash : function() {
        return  _.extend(
                  Carousel.__super__.renderHash.call(this),
                  {
                    rootID    : this.id,
                    controls  : this.controls,
                    slides    : this.children.length,
                    prevSymbol: this.prevSymbol,
                    nextSymbol: this.nextSymbol
                  }
                );
      }

    },{
      klass: "Carousel"
    });
/* Sprocket Manifest

 */

var CloseButton = Link.extend({
      initialize : function(args) {
        CloseButton.__super__.initialize.call(this, args);
        this.addClass("close");
        this.body || (this.body = "&times;");
      }
    },{
      klass: "CloseButton"
    });
/* Sprocket Manifest

 */

var ContentRow = Panel.extend({
      initialize: function(args) {
        ContentRow.__super__.initialize.call(this, args);
        this.setDefaultValue(12, "maxChildren");
        this.ensureChildLimit();
        this.addClass("row-fluid");
      },
      push: function(component) {
        this.ensureChildLimit();
        ContentRow.__super__.push.call(this, component);
      },
      unshift: function(component) {
        this.ensureChildLimit();
        ContentRow.__super__.unshift.call(this, component);
      },
      insert: function(component, index) {
        this.ensureChildLimit();
        ContentRow.__super__.insert.call(this, component, index);
      },
      renderChildren: function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);
        var rowWidth = this.maxChildren,
            fluidChildren = this.children.length;

        _.each(this.children, function(child) {
          rowWidth -= (child.span || 0);
          fluidChildren -= (isNaN(child.span) ? 0 : 1);
        });

        var span = Math.floor(rowWidth/fluidChildren),
            markup = "";
        _.each(this.children, function(child) {
          var childMarkup = prefix + child.render() + suffix;
          if(child.span !== 0) {
            childMarkup = "<div class='span"+(child.span || span)+"'>" + childMarkup + "</div>";
          }

          markup += childMarkup;
        });
        return markup;
      },
      ensureChildLimit: function() {
        if(this.children.length >= this.maxChildren) {
          throw TooManyChildrenError("This row can only have "+this.maxChildren+" children");
        }
      }
    },{
      klass: "ContentRow"
    });
/* Sprocket Manifest

 */

var List = Panel.extend({
      initialize: function(args) {
        List.__super__.initialize.call(this, args);

        this.childPrefix || (this.childPrefix = "<li>");
        this.childSuffix || (this.childSuffix = "</li>");
      },

      template: strap.generateSimpleTemplate("ul")
    },{
      klass: "List"
    });
/* Sprocket Manifest

 */

var DropdownMenu = List.extend({
      initialize : function(args) {
        DropdownMenu.__super__.initialize.call(this, args);

        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("dropdown-menu");
      }
    },{
      klass: "DropdownMenu"
    });
/* Sprocket Manifest

 */

var Form = Panel.extend({
      initialize : function(args) {
        Form.__super__.initialize.call(this, args);

        this.setDefaultValue("GET", "method");
        this.setDefaultValue("", "action");
      },

      template : strap.generateSimpleTemplate("form"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "method", "action");
      }
    },{
      klass: "Form"
    });
/* Sprocket Manifest

 */

var FormInput = Panel.extend({
      initialize : function(args) {
        FormInput.__super__.initialize.call(this, args);

        this.setDefaultValue("", "placeholder", "name", "value");
        this.setDefaultValue("text", "type");
        this.base = "input";
        Typify(this);
      },

      template : _.template("<input <%= rootAttrs %> />"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "type", "placeholder", "name", "value");
      }
    },{
      klass: "FormInput",
      types:  [
                "button", "checkbox", "color", "date", "datetime", "datetime-local", "email", "file", "hidden", "image", "month",
                "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"
              ]
    });
/* Sprocket Manifest

 */

var FormLabel = Panel.extend({
      template : strap.generateSimpleTemplate("label")
    },{
      klass : "FormLabel"
    });
/* Sprocket Manifest

 */

var FormSelect = Panel.extend({
      template : strap.generateSimpleTemplate("select")
    },{
      klass : "FormSelect"
    });
/* Sprocket Manifest

 */

var Header = Panel.extend({
      initialize: function(args) {
        Header.__super__.initialize.call(this, args);
        this.setDefaultValue(1, "level");
      },
      template : strap.generateSimpleTemplate("h<%= level %>"),

      renderHash : function() {
        return  _.extend(
                  Header.__super__.renderHash.call(this),
                  { level: this.level }
                );
      }

    },{
      klass: "Header"
    });
/* Sprocket Manifest

 */

var HeroUnit = Panel.extend({
      initialize : function(args) {
        HeroUnit.__super__.initialize.call(this, args);

        this.setDefaultValue("", "title");

        this.addClass("hero-unit");
      },
      template : _.template("<div <%= rootAttrs %>>"+
                              "<h1><%= title %></h1>"+
                              "<%= yield %>"+
                            "</div>"),

      renderHash : function() {
        return  _.extend(
                  HeroUnit.__super__.renderHash.call(this),
                  { title: this.title }
                );
      }

    },{
      klass: "HeroUnit"
    });
/**
 * @author Chris Hall (chall8908@gmail.com)
 * @class Provides a simple wrapper around a hroizontal rule tag that can be used as the child to a Component
 */

function HorizontalRule() { this.klass = "HorizontalRule"; }
/**
 * Returns a horizontal rule
 *
 * @returns {String} the string "&lt;hr/&gt;"
 */
HorizontalRule.prototype.render = function() {
  return "<hr/>";
}

/** @borrows HorizontalRule# as HR# */
var HR = HorizontalRule;
/* Sprocket Manifest


 */

var Icon = Panel.extend({
      initialize : function(args) {
        Icon.__super__.initialize.call(this, args);

        this.base = "icon";

        Typify(this);
      },

      template : _.template("<i <%= rootAttrs %>></i> <%= yield %>")
    },{
      klass: "Icon",
      types: [
              "cloud-download", "cloud-upload", "lightbulb", "exchange", "bell-alt", "file-alt", "beer", "coffee", "food", "fighter-jet", "user-md",
              "stethoscope", "suitcase", "building", "hospital", "ambulance", "medkit", "h-sign", "plus-sign-alt", "spinner", "angle-left", "angle-right",
              "angle-up", "angle-down", "double-angle-left", "double-angle-right", "double-angle-up", "double-angle-down", "circle-blank", "circle", "desktop",
              "laptop", "tablet", "mobile-phone", "quote-left", "quote-right", "reply", "github-alt", "folder-close-alt", "folder-open-alt", "adjust", "asterisk",
              "ban-circle", "bar-chart", "barcode", "beaker", "beer", "bell", "bell-alt", "bolt", "book", "bookmark", "bookmark-empty", "briefcase", "bullhorn",
              "calendar", "camera", "camera-retro", "certificate", "check", "check-empty", "circle", "circle-blank", "cloud", "cloud-download", "cloud-upload",
              "coffee", "cog", "cogs", "comment", "comment-alt", "comments", "comments-alt", "credit-card", "dashboard", "desktop", "download", "download-alt",
              "edit", "envelope", "envelope-alt", "exchange", "exclamation-sign", "external-link", "eye-close", "eye-open", "facetime-video", "fighter-jet",
              "film", "filter", "fire", "flag", "folder-close", "folder-open", "folder-close-alt", "folder-open-alt", "food", "gift", "glass", "globe", "group",
              "hdd", "headphones", "heart", "heart-empty", "home", "inbox", "info-sign", "key", "leaf", "laptop", "legal", "lemon", "lightbulb", "lock", "unlock",
              "magic", "magnet", "map-marker", "minus", "minus-sign", "mobile-phone", "money", "move", "music", "off", "ok", "ok-circle", "ok-sign", "pencil",
              "picture", "plane", "plus", "plus-sign", "print", "pushpin", "qrcode", "question-sign", "quote-left", "quote-right", "random", "refresh", "remove",
              "remove-circle", "remove-sign", "reorder", "reply", "resize-horizontal", "resize-vertical", "retweet", "road", "rss", "screenshot", "search",
              "share", "share-alt", "shopping-cart", "signal", "signin", "signout", "sitemap", "sort", "sort-down", "sort-up", "spinner", "star", "star-empty",
              "star-half", "tablet", "tag", "tags", "tasks", "thumbs-down", "thumbs-up", "time", "tint", "trash", "trophy", "truck", "umbrella", "upload",
              "upload-alt", "user", "user-md", "volume-off", "volume-down", "volume-up", "warning-sign", "wrench", "zoom-in", "zoom-out", "file", "file-alt",
              "cut", "copy", "paste", "save", "undo", "repeat", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify",
              "indent-left", "indent-right", "font", "bold", "italic", "strikethrough", "underline", "link", "paper-clip", "columns", "table", "th-large", "th",
              "th-list", "list", "list-ol", "list-ul", "list-alt", "angle-left", "angle-right", "angle-up", "angle-down", "arrow-down", "arrow-left",
              "arrow-right", "arrow-up", "caret-down", "caret-left", "caret-right", "caret-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up",
              "circle-arrow-down", "circle-arrow-left", "circle-arrow-right", "circle-arrow-up", "double-angle-left", "double-angle-right", "double-angle-up",
              "double-angle-down", "hand-down", "hand-left", "hand-right", "hand-up", "circle", "circle-blank", "play-circle", "play", "pause", "stop",
              "step-backward", "fast-backward", "backward", "forward", "fast-forward", "step-forward", "eject", "fullscreen", "resize-full", "resize-small",
              "phone", "phone-sign", "facebook", "facebook-sign", "twitter", "twitter-sign", "github", "github-alt", "github-sign", "linkedin", "linkedin-sign",
              "pinterest", "pinterest-sign", "google-plus", "google-plus-sign", "sign-blank", "ambulance", "beaker", "h-sign", "hospital", "medkit",
              "plus-sign-alt", "stethoscope", "user-md"
            ]
    });
/* Sprocket Manifest

 */

/**
 * @class Provides a method of creating images simply
 * @extends Panel
 *
 * @property {String} src The URI of the source image
 */

var Image = Panel.extend({
      /** @see Panel#initialize */
      initialize : function(args) {
        Image.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "src");
      },

      /** @see Panel#template */
      template : _.template("<img <%= rootAttrs %> />"),

      /**
       * Override of listAttributes to add src to the attributes returned
       *
       * @see Panel#listAttributes
       */
      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "src");
      }
    },{
      klass: "Image"
    })
;
/* Sprocket Manifest

 */

var Label = AbstractBadge.extend({
      initialize : function(args) {
        this.base = "label";
        Label.__super__.initialize.call(this, args);
      }
    },{
      klass: "Label"
    });
/* Sprocket Manifest

 */

var Legend = Panel.extend({
      template: strap.generateSimpleTemplate("legend")
    }, {
      klass: "Legend"
    });
/**
 * @author Chris Hall (chall8908@gmail.com)
 * @class Provides a simple wrapper around the line break tag that can be used as the child to a Component
 */

function LineBreak() { this.klass = "LineBreak"; }
/**
 * Returns a line break
 *
 * @returns {String} the string "&lt;br/&gt;"
 */
LineBreak.prototype.render = function() {
  return "<br/>";
}

/** @borrows LineBreak# as BR# */
var BR = LineBreak;
/* Sprocket Manifest

 */

var Modal = Panel.extend({
      initialize : function(args) {
        Modal.__super__.initialize.call(this, args);

        this.setDefaultValue([], "actions");
        this.setDefaultValue("", "header");
        this.setDefaultValue(false, "closable");
        this.addClass("modal");
      },

      template : _.template("<div <%= rootAttrs %>>"+
                              "<% if(closable || header) { %>" +
                                "<div class='modal-header'>"+
                                  "<% if(closable) { %>" +
                                    "<button aria-hidden='true' class='close' data-dismiss='modal' type='button'>&times;</button>"+
                                  "<% } %>" +
                                  "<%= header %>"+
                                "</div>"+
                              "<% } %>" +
                              "<div class='modal-body'><%= yield%></div>"+
                              "<% if(actions) { %>" +
                                "<div class='modal-footer'><%= actions %></div>"+
                              "<% } %>" +
                            "</div>"),

      pushAction : function(action) {
        this.actions.push(action);
        return this;
      },
      popAction : function() {
        return this.actions.pop();
      },
      shiftAction : function(action) {
        return this.actions.shift();
      },
      unshiftAction : function(action) {
        this.actions.unshift(action);
        return this;
      },

      renderActions : function() {
        var markup = "";
        _.each(this.actions, function(action) {
          markup += action.render();
        });

        return markup;
      },

      renderHash : function() {
        return  _.extend(
                  Modal.__super__.renderHash.call(this),
                  {
                    header  : this.header,
                    actions : this.renderActions(),
                    closable: this.closable
                  }
                );
      }
    },{
      klass: "Modal"
    });

//aliases
Modal.prototype.addAction = Modal.prototype.pushAction;
/* Sprocket Manifest


 */

var Nav = List.extend({
      initialize: function(args) {
        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        Nav.__super__.initialize.call(this, args);

        this.setDefaultValue(false, "divided");

        this.base = "nav";
        Typify(this);
      },

      renderChildren : function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);

        var markup = "";
        _.each(this.children, function(child) {
          markup += (child.active ? prefix.replace(/>$/," class='active'>") : prefix) + child.render() + suffix;
        });
        return markup;
      },

      render : function(intoDOM) {
        var markup = Nav.__super__.render.call(this);
        if(this.divided) {
          markup = markup.split("</li><li").join("</li><li class='divider-vertical'></li><li");
        }

        if(intoDOM && this.id) {
          $("#"+this.id).html(markup);
        }

        return markup
      },

      divide : function(divided) {
        if(divided) {
          this.divided = true;
        } else if(divided === false) {
          this.divided = false;
        }

        return this.divided;
      }
    },{
      klass: "Nav",
      types: ["tabs", "pills", "list"]
    });
/* Sprocket Manifest

 */

var NavBar = Panel.extend({
      initialize : function(args) {
        NavBar.__super__.initialize.call(this, args);
        this.addClass("navbar");
      },

      renderChildren : function() {
        return "<div class='navbar-inner'>" + NavBar.__super__.renderChildren.call(this) + "</div>";
      }
    },{
      klass: "NavBar"
    });
/* Sprocket Manifest

 */

var OptGroup = Panel.extend({
      initialize : function(args) {
        OptGroup.__super__.initialize.call(this, args);

        this.setDefaultValue("", "label");
      },

      template : strap.generateSimpleTemplate("optgroup"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "label");
      }
    },{
      klass: "OptGroup"
    });
/* Sprocket Manifest

 */

var PageHeader = Header.extend({
      initialize: function(args) {
        PageHeader.__super__.initialize.call(this, args);
        this.setDefaultValue("", "header");
        this.addClass("page-header");
      },
      template : _.template("<div <%= rootAttrs %>>"+
                              "<h<%= level %>>"+
                                "<%= header %> "+
                                "<small><%= yield %></small>"+
                              "</h<%= level %>>"+
                            "</div>"),

      renderHash : function() {
        return  _.extend(
                  PageHeader.__super__.renderHash.call(this),
                  {
                    header: this.header,
                    level: this.level
                  }
                )
      }

    },{
      klass: "PageHeader"
    });
/* Sprocket Manifest

 */

var Pagination = Panel.extend({
      initialize: function(args) {
        if(this.children && this.pages) {
          throw new SyntaxError("Paginators cannot accept both children and pages");
        }
        Pagination.__super__.initialize.call(this, args);

        this.setDefaultValue(1, "pages");
        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("pagination");

        if(this.children.length === 0) {
          this.buildPages();
        }
      },

      renderChildren: function() {
        return "<ul>" + Pagination.__super__.renderChildren.call(this) + "</ul>";
      },

      setPages: function(pages) {
        this.pages = pages;
        this.buildPages();
      },

      buildPages: function() {
        this.children = [];
        if(this.pages < 1) {

          throw new SyntaxError("You must supply a number of pages greater than 0");

        } else if(this.pages > 1) {

          this.add(new Link({body: "&laquo;", classes: ["prev"]}));
          _.times(this.pages, function(i) {
            this.add(new Link((i+1)+""));
          }, this);
          this.add(new Link({body: "&raquo;", classes: ["next"]}));

        } else {
          console.warn("Paginator instantiated with only 1 page."); //paginators with only 1 page don't display
        }
      }

    },{
      klass: "Pagination"
    });
/* Sprocket Manifest

 */

var Paragraph = Panel.extend({
      template : strap.generateSimpleTemplate("p")
    },{
      klass: "Paragraph"
    }),
    P = Paragraph;
/* Sprocket Manifest


 */

var ProgressBar = Panel.extend({
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
    },{
      klass: "ProgressBar",
      types: ["info", "success", "warning", "danger"]
    });
/**
 * Generates a renderable entity that acts as a simple passthrough for the attributes it's given.
 *
 * @author Chris Hall (chall8908@gmail.com)
 * @class
 * A simple wrapper class providing render capability to an artibrary string of text.
 * Raws function as Components with the notable exception of only retaining or rendering its body field.
 *
 * @param {Object|String} attrs the attributes to provide this Raw.
 * @param {String} attrs.body if attrs is not a string, this field is applied to Raw#body
 */

function Raw(attrs) {
  // the idea here is you can send in an object with the field body or just a string for the body
  this.body = attrs.body || attrs;
  this.klass = "Raw"
}

/**
 * Provides render functionality to Raws and allows them to be used as children for Components
 *
 * @returns {String} the body field of this Raw
 */
Raw.prototype.render = function() {
  return this.body;
}
;
/* Sprocket Manifest

 */

var SelectOption = Panel.extend({
      initialize : function(args) {
        SelectOption.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "value");
      },

      template : strap.generateSimpleTemplate("option"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "value");
      }
    }, {
      klass : "SelectOption"
    });
/* Sprocket Manifest

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
            _data = (data.call ? data.call(this) : data),
            innerHTML = this.body + this.renderChildren();

        // make data an array to make this easier
        if(!_.isArray(_data)) {
          _data = [_data];
        }

        // iterate over the contents of data and produce the templates
        markup = _.each(_data, function(entry) {
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
/* Sprocket Manifest

 */

var Span = Panel.extend({
      template: strap.generateSimpleTemplate("span")
    }, {
      klass: "Span"
    });
/* Sprocket Manifest

 */

var Table = Panel.extend({
      initialize: function(args) {
        Table.__super__.initialize.call(this, args);
        this.addClass("table");
        this.attributes.unshift("style='color: inherit'");  //monkey patch for odd behavior in Webkit
        _.each(this.children, this.throwUnlessRow);         //make sure all children are table rows
      },

      push: function(row) {
        this.throwUnlessRow(row);
        Table.__super__.push.call(this, row);
      },

      unshift: function(row) {
        this.throwUnlessRow(row);
        Table.__super__.unshift.call(this, row);
      },

      insert: function(row, index) {
        this.throwUnlessRow(row);
        Table.__super__.insert.call(this, row, index);
      },

      throwUnlessRow: function(row) {
        if(row instanceof TableRow) { return; }

        throw new TypeError("Tables can only have Rows as children");
      },

      template: strap.generateSimpleTemplate("table")
    },{
      klass: "Table"
    });

    //aliases
Table.prototype.add = Table.prototype.push;
/* Sprocket Manifest

 */

var TableCell = Panel.extend({
      template : strap.generateSimpleTemplate("td")
    },{
      klass: "TableCell"
    });
/* Sprocket Manifest

 */

var TableHeader = Panel.extend({
      template : strap.generateSimpleTemplate("th")
    },{
      klass: "TableHeader"
    });
/* Sprocket Manifest

 */

var TableRow = Panel.extend({
      initialize: function(args) {
        TableRow.__super__.initialize.call(this, args);

        _.each(this.children, this.throwUnlessCell); //make sure all children are table cells
      },

      push: function(component) {
        this.throwUnlessCell(component);
        TableRow.__super__.push.call(this, component);
      },

      unshift: function(component) {
        this.throwUnlessCell(component);
        TableRow.__super__.unshift.call(this, component);
      },

      insert: function(component, index) {
        this.throwUnlessCell(component);
        TableRow.__super__.insert.apply(this, arguments);
      },

      throwUnlessCell: function(cell) {
        if(cell instanceof TableCell || cell instanceof TableHeader) { return; }

        throw new TypeError("Rows can only have Cells as children");
      },

      template: strap.generateSimpleTemplate("tr")
    },{
      klass: "TableRow"
    });

// aliases
TableRow.prototype.add = TableRow.prototype.push;
/* Sprocket Manifest

 */

var Textarea = Panel.extend({
      initialize : function(args) {
        Textarea.__super__.initialize.call(this, args);

        this.setDefaultValue("", "placeholder");
      },

      template : strap.generateSimpleTemplate("textarea"),

      listAttributes : function() {
        return Textarea.__super__.listAttributes.call(this, "placeholder");
      }
    }, {
      klass : "Textarea"
    });
/* Sprocket Manifest

 */

var Viewport = Component.extend({
      initialize: function(args) {
        Viewport.__super__.initialize.call(this, args);
        this.setDefaultValue("body", "root");
      },

      flush : function() {
        Viewport.__super__.flush.call(this);
        this.render();
      },

      el : function() {
        return $(this.root);
      },

      render : function() {
        return $(this.root).html(this.renderChildren()).add(this).trigger("after-render", [this]);
      }
    },{
      klass: "Viewport"
    });
/* Sprocket Manifest

 */

var TooManyChildrenError  = Extend(Error, {message: "Too many children.", name: "TooManyChildrenError"}),

    WebsocketConnectError = Extend(Error, {message: "Unable to connect via websocket.", name: "WebsocketConnectError"});
/* Manifest file for compiling assets with Sprockets
 *


 */
;
