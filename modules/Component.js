/*
  Component - Base Class
    Components are generic objects that can add and remove children and render themselves
*/
function Component(attributes, options)  {
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

/*
 * Unceremoniously ripped out of Backbone.js.  Those guys are way smarter than I am.
 * You should go check out their work too: http://backbonejs.org
 */
// Function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
Component.extend = function(protoProps, staticProps) {
  var parent = this;
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
};

Component = Component.extend({

      initialize : function(args) {
        this.setDefaultValue([], "children");
        this.setDefaultValue("", "childPrefix", "childSuffix");
      },

      setDefaultValue: function(value) {
        var args = Array.prototype.slice.call(arguments, 1),      // get the list of attributes to apply the value to
            method = _.isArray(value) ? "apply" : "call";         // determine which Function prototype method to call

        _.each(args, function(attr) {
          if(!this.hasOwnProperty(attr)) {
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
        this.children.push(component);
        return this;
      },

      //Remove the last child
      pop : function() {
        return this.children.pop();
      },

      //Prepend a child
      unshift : function(component) {
        this.children.unshift(component);
        return this;
      },

      //Remove the first child
      shift : function() {
        return this.children.shift();
      },

      //Add a child at the specified index (or the last index)
      insert : function(component, index) {
        if(index) {
          this.children.splice(index, 0, component);
        } else {
          this.children.push(component);
        }

        return this;
      },

      //Removes the child at index
      remove : function(index) {
        if(index) {
          return this.children.splice(index, 1)[0];
        }
        return this.pop();
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
    });

//aliases
Component.prototype.add = Component.prototype.push;