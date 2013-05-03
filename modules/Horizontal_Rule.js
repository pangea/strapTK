/**
 * @author Chris Hall (chall8908@gmail.com)
 * @class Provides a simple wrapper around a hroizontal rule tag that can be used as the child to a Component.  Aliased as HR.
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

/** @ignore */
var HR = HorizontalRule;