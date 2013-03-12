var ViewportSwitcher = Component.extend({
  initialize: function(args) {
    ViewportSwitcher.__super__.initialize.call(this, args);
    this.active = 0;

    var children = this.children;
    this.children = [];
    //prep children
    _.each(children, function(child) {
      this.push(child);
    }, this);
  },
  push: function(port, addClassses) {
    addClassses || (addClassses = "");
    port = this.prepViewport(port);

    this.children.push(port);
    $(function() {
      $(this.root).append("<div id='"+port.root.replace(/^[#|\.]/, '')+"' class='hide " + addClassses + "'></div>");
    });
  },
  unshift: function(port, addClassses) {
    port = this.prepViewport(port);

    this.children.unshift(port);
    $(function() {
      $(this.root).prepend("<div id='"+port.root.replace(/^[#|\.]/, '')+"' class='hide " + addClassses + "'></div>");
    });
  },
  insert: function() {
    throw new ReferenceError("ViewportSwitcher does not implement insert");
  },
  switchTo: function(index) {
    if(typeof(index) == "number") {
      if(index < 0 || index >= this.children.length) {
        throw new RangeError("index out of bounds");
      }
    } else if(typeof(index) == "string") {
      _.each(this.children, function(child, i) {
        if(child.id == index) {
          index = i;
        }
      }, this);

      if(isNaN(index)) {
        throw new RangeError("invalid child ID");
      }
    }

    this.active = index;
    this.render();
  },
  render : function() {
    $(this).trigger("show")
    this.children[this.active].render().removeClass("hide").siblings("[id*="+this.root+"]").addClass("hide");
    $(this).trigger("shown")
  },
  prepViewport: function(port) {
    if(!port instanceof Viewport) {
      throw SyntaxError("Only Viewports can be added to ViewportSwitchers");
    }

    var id = _.uniqueId(this.root);
    port.root = id;
    return port;
  }
});

ViewportSwitcher.prototype.add = ViewportSwitcher.prototype.push;