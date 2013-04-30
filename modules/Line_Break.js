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