_.templateSettings = {
    'evaluate': /\{\{([\s\S]+?)\}\}/g,      // {{ [code] }}
    'interpolate': /\{\{\=([\s\S]+?)\}\}/g  // {{= [code] }}
  };

/**
 * Decorates the given component with the necessary variables and methods to handle being typed
 *  A typed object is one that has a "base" and is then further modified with a "type".
 *  E.G. An alert can be an "error" message (and have a "type" of "error")
 *
 * This method does not overwrite any variables set on the decorated component unless it already has a setType property (which it shouldn't >:[)
 *
 * @param component [Component] the component to be decorated
 */
function Typify(component) {
  component.setType = function(type) {
    if(this.type) {
      this.classes = _.without(this.classes, this.base+"-"+this.type);
      delete this.type;
    }
    if(type) {
      if(!_.include(this.types, type)) {
        throw new RangeError("Invalid type");
      }
      this.type = type;
      this.classes.push(this.base+"-"+type);
    }
  };

  if(!component.hasOwnProperty("types")) {
    component.types = [];
  }

  _.each(["base", "type"], function(attr) {
    if(!this.hasOwnProperty(attr)) {
      this[attr] = "";
    }
  }, component);

  if(component.base) {
    component.classes.unshift(component.base);
  }

  if(component.type) {
    component.setType(component.type);
  }
}