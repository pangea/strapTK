/* Sprocket Manifest
 *= require Extend
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