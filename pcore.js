/*global pcore, _, $ */
/**
 *  Requires:
 *    pcore.js
 *    jQuery.js
 *    lodash.js
 */
var pcore = new (function() {
  //Adds submodules to the global namespace
  this.globalize = function() {
    _.extend(window, this);
    delete window.globalize;
  };
})();