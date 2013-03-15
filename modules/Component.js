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


Component.extend = function(protoProps, staticProps) {
  return Extend(this, protoProps, staticProps);
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
        this.checkIfRenderable(component);
        this.children.push(component);
        return this;
      },

      //Remove the last child
      pop : function() {
        return this.children.pop();
      },

      //Prepend a child
      unshift : function(component) {
        this.checkIfRenderable(component);
        this.children.unshift(component);
        return this;
      },

      //Remove the first child
      shift : function() {
        return this.children.shift();
      },

      //Add a child at the specified index (or the last index)
      insert : function(component, index) {
        this.checkIfRenderable(component);
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

      checkIfRenderable : function(renderable) {
        if(typeof(renderable.render) == "function") {
          return;
        }

        throw TypeError("Object does not respond to render.")
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

      toString : function() {
        return this.render();
      }
    });

//aliases
Component.prototype.add = Component.prototype.push;