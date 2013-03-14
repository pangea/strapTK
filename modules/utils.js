/**
 * The strap object contains a set of global functions that apply to the
 *  entire page (e.g. setting all elements as draggable)
 */
var strap = (function() {
      this.allDraggable = function(draggable) {
        if(draggable === true) {
          $("body").find("*").attr("draggable", "true")
        } else if(draggable === false) {
          $("body").find("*").removeAttr("draggable")
        }
      }
    })();

/**
 * Decorates the given component with the necessary variables and methods to handle being typed
 *  A typed object is one that has a "base" and is then further modified with a "type".
 *  E.G. An alert can be an "error" message (and have a "type" of "error")
 *
 * This method does not overwrite any variables set on the decorated component unless it
 *  already has a setType property (which it shouldn't >:[)
 *
 * @param component [Component] the component to be decorated
 */
function Typify(component, options) {
  options = _.extend({}, Typify.defaults, options);

  component.setType = function(type) {
    if(this.type) {
      this.removeClass(this.base+"-"+this.type);
      delete this.type;
    }
    if(type) {
      if(!_.include(this.types, type)) {
        throw new RangeError("Invalid type - "+type);
      }
      this.type = type;
      this.addClass(this.base+"-"+type);
    }
  };

  component.types || (component.types = options.types);
  component.base || (component.base = options.base);
  component.type || (component.type = options.type);

  if(component.base) {
    component.addClass(component.base);
  }

  if(component.type) {
    component.setType(component.type);
  }
}

Typify.defaults = {
  types: [],
  base: "",
  type: ""
}