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