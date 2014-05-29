/* Sprockets Manifest
 *= require Strap
 */

(function(){
  "use strict";

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
  };

  strap.Typify = Typify;
}());
