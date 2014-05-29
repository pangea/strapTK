/* Sprockets Manifest
 *= require Strap
 */

(function(){
  "use strict";

  /**
   * Global Extend function for creating subclasses
   * Unceremoniously ripped out of Backbone.js.  Those guys are way smarter than I am.
   * You should go check out their work too: <a href='http://backbonejs.org' target='_new'>http://backbonejs.org</a>
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

  strap.extend = Extend;
}());
