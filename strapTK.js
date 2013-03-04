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
;
/*
  Component - Base Class
    Components are generic objects that can add and remove children and render themselves
*/

function Base(attributes, options)  {
  var attrs = attributes || {},
      opts = options || {};

  for(attr in attrs) {
    this[attr] = attrs[attr];
  }

  this.initialize(opts);
};

/*
 * Unceremoniously ripped out of Backbone.js.  Those guys are way smarter than I am.
 * You should go check out their work too: http://backbonejs.org
 */
// Function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
Base.extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function(){ this.constructor = child; };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate;

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) _.extend(child.prototype, protoProps);

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

var Component = Base.extend({

  initialize : function(args) {
    if(!this.hasOwnProperty("children")) {
      this.children = [];
    }
    _.each(["childPrefix", "childSuffix"], function(attr) {
      if(!this.hasOwnProperty(attr)) {
        this[attr] = "";
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
    this.children.push(component);
    return this;
  },

  //Remove the last child
  pop : function() {
    return this.children.pop();
  },

  //Prepend a child
  unshift : function(component) {
    this.children.unshift(component);
    return this;
  },

  //Remove the first child
  shift : function() {
    return this.children.shift();
  },

  //Add a child at the specified index (or the last index)
  insert : function(component, index) {
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
      this.children.splice(index, 1);
    } else {
      this.pop();
    }
  },

  addClass : function(newClass) {
    if(!_.include(this.classes, newClass)) {
      this.classes.push(newClass);
    }
  },

  removeClass : function(oldClass) {
    this.classes = _.without(this.classes, oldClass);
  },

  toggleClass : function(theClass) {
    if(_.include(this.classes, theClass)) {
      this.removeClass(theClass);
    } else {
      this.addClass(theClass);
    }
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
});

//aliases
Component.prototype.add = Component.prototype.push;
var Viewport = Component.extend({
  initialize : function(args) {
    Viewport.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("root")) {
      this.root = "body";
    }
  },

  render : function() {
    $(this.root).empty().append(this.renderChildren());
  }
});
var Panel = Component.extend({
  initialize : function(args) {
    Panel.__super__.initialize.call(this, args);
    //classes and attributes (i of 0 & 1) are arrays
    _.each(["classes", "attributes", "id", "body"], function(attr, i) {
      if(!this.hasOwnProperty(attr)) {
        this[attr] = (i < 2 ? [] : "");
      }
    }, this);
  },

  template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>{{= yield }}</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();

    return this.template({
      "yield": markup,
      "rootAttrs" : this.attributes.join(" "),
      "rootClasses": this.classes.join(" "),
      "rootID": this.id
    });
  },

  wellify : function() {
    if(!_.include(this.classes, "well")) {
      this.classes.push("well");
    }
  },

  dewellify : function() {
    this.classes = _.without(this.classes, "well");
  },

  welled : function(isWelled) {
    if(!isWelled && isWelled !== false) {
      return _.include(this.classes, "well");
    }

    isWelled ? this.wellify() : this.dewellify();
  },
  /**
   * Sets the closability of this alert.
   * Calling setClosable without specifying the closability sets closable to true
   *
   * @param closable [Boolean|null] Sets the closability of the alert.
   */
  setClosable : function(closable) {
    this.closable = typeof(closable) === "boolean" ? closable : true;
  }
});
var AbstractBadge = Panel.extend({
  initialize : function(args) {
    AbstractBadge.__super__.initialize.call(this, args);
    this.types = ["success", "warning", "important", "info", "inverse"];
    Typify(this);
  },
  template : _.template("<span id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</span>")
});
var Link = Panel.extend({
  initialize : function(args) {
    Link.__super__.initialize.call(this, args);
    var hasHREF = false;
    _.each(this.attributes, function(attr) {
      if(attr.match(/^href/)) {
        hasHREF = true;
        return false;
      }
    });
    if(!hasHREF) {
      this.attributes.push("href='#'");
    }
  },

  template : _.template("<a id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>{{= yield }}</a>")
});
var Alert = Panel.extend({
  types: ["error", "success", "info"],

  initialize : function(args) {
    Alert.__super__.initialize.call(this, args);
    this.base = "alert";
    Typify(this);
  },

	template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>" +
													"{{ if(closable) { }}" +
                            "<button class='close' data-dismiss='alert' type='button'>&times;</button>" +
                          "{{ } }}" +
													"<strong>{{= title}}</strong>" +
													"{{= yield}}" +
												"</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "title": this.title,
      "closable": this.closable,
      "rootID": this.id,
      "rootClasses": this.classes.join(" "),
      "rootAttrs": this.attributes.join(" ")
    });
  },

  isBlock : function(blocked) {
    var isBlocked = _.include(this.classes, "alert-block");
    if(blocked) {
      if(!isBlocked) {
        this.classes.push("alert-block");
      }
    } else if(blocked === false) {
      if(isBlocked) {
        this.classes = _.without(this.classes, "alert-block");
      }
    } else {
      return isBlocked;
    }
  }
});
var Badge = AbstractBadge.extend({
  initialize : function(args) {
    this.base = "badge";
    Badge.__super__.initialize.call(this, args);
  }
});
var Breadcrumbs = Panel.extend({
	initialize : function(args) {
		Breadcrumbs.__super__.initialize.call(this, args);
		this.childPrefix || (this.childPrefix = "<li>");
		this.childSuffix || (this.childSuffix = "<span class='divider'>/</span></li>");
		this.classes.unshift("breadcrumb");
	},

	template : _.template("<ul id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
													"{{= yield }}"+
												"</ul>"),
	render : function() {
		var markup = Breadcrumbs.__super__.render.call(this).split("<span class='divider'>/</span>"),
				last = markup.pop();
		return markup.join("<span class='divider'>/</span>") + last;
	}
});
var Button = Link.extend({
  types : ["primary", "info", "success", "warning", "danger", "inverse", "link"],

  initialize : function(args) {
    Button.__super__.initialize.call(this, args);
    var hasType = false;
    _.each(this.attributes, function(attr) {
      if(attr.match(/^type/)) {
        hasType = true;
        return false;
      }
    });
    if(!hasType) {
      this.attributes.push("type='button");
    }

    this.base = "btn";

    Typify(this);
  }
});
var ButtonGroup = Panel.extend({
  initialize: function(args) {
    this.__super__.initialize.call(this, args);
    this.classes.unshift("btn-group");
  }
});
var ButtonToolbar = Panel.extend({
  initialize: function(args) {
    this.__super__.initialize.call(this, args);
    this.classes.unshift("btn-toolbar");
  }
});
var CloseButton = Link.extend({
  initialize : function(args) {
    this.__super__.initialize.call(this, args);
    this.classes.unshift("close");
    if(!this.hasOwnProperty("body")) {
      this.body = "&times;"
    }
  }
});
var Dropdown = Panel.extend({
	initialize : function(args) {
		this.__super__.initialize.call(this, args);
		this.childPrefix || (this.childPrefix = "<li><a>");
		this.childSuffix || (this.childSuffix = "</a></li>");
	},

	template : _.template("<ul id='{{= rootID }}' class='dropdown-menu {{= rootClasses }}' {{= rootAttrs }}>"+
													"{{= yield }}"+
												"</ul>")
});
var HeroUnit = Component.extend({
  initialize : function(args) {
    this.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("title")) {
      this.title = "";
    }
    this.classes.unshift("hero-unit");
  },
  template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "<h1>{{= title}}</h1>"+
                          "{{= yield}}"+
                        "</div>"),
  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "title": this.title,
      "rootID": this.id,
      "rootClasses": this.classes.join(" "),
      "rootAttrs": this.attributes.join(" ")
    });
  }
});
var Label = AbstractBadge.extend({
  initialize : function(args) {
    this.base = "label";
    Label.__super__.initialize.call(this, args);
  }
});
var Modal = Panel.extend({
	initialize : function(args) {
		Modal.__super__.initialize.call(this, args);
		if(!this.hasOwnProperty("actions")) {
			this.actions = [];
		}
		if(!this.hasOwnProperty("header")) {
			this.header = "";
		}
	},

	template : _.template("<div id='{{= rootID }}' class='modal hide fade {{= rootClasses }}'>"+
													"<div class='modal-header'>"+
														"{{ if(closable) { }}" +
															"<button aria-hidden='true' class='close' data-dismiss='modal' type='button'>&times;</button>"+
														"{{ } }}" +
														"<h3>{{= header }}</h3>"+
													"</div>"+
													"<div class='modal-body'>"+
														"{{= yield}}"+
													"</div>"+
													"<div class='modal-footer'>"+
														"{{= actions }}"+
													"</div>"+
												"</div>"),

	pushAction : function(action) {
		this.actions.push(action);
		return this;
	},
	popAction : function() {
		return this.actions.pop();
	},
	shiftAction : function(action) {
		return this.actions.shift();
	},
	unshiftAction : function(action) {
		this.actions.unshift(action);
		return this;
	},
	render : function() {
		var markup = this.body,
				actionMarkup = "";
		_.each(this.children, function(child) {
			markup += child.render();
		});
		_.each(this.actions, function(action) {
			actionMarkup += action.render();
		});

		return this.template({
			"yield": markup,
			"header":this.header,
			"actions": actionMarkup,
			"rootID": this.id,
			"rootClasses": this.classes.join(" ")
		});
	}
});

//aliases
Modal.prototype.addAction = Modal.prototype.pushAction;
var Nav = Panel.extend({
  types : ["tabs", "pills", "list"],

  initialize: function(args) {
    Nav.__super__.initialize.call(this, args);
    if(this.childPrefix === "") {
      this.childPrefix = "<li>";
    }
    if(this.childSuffix === "") {
      this.childSuffix = "</li>";
    }
    this.base = "nav";
    Typify(this);
  },

  template: _.template( "<ul id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</ul>")
});
var NavBar = Panel.extend({
	initialize : function(args) {
		NavBar.__super__.initialize.call(this, args);
		this.classes.unshift("navbar");
	},

  renderChildren : function() {
    return "<div class='navbar-inner'>" + NavBar.__super__.renderChildren.call(this) + "</div>";
  }
});
var PageHeader = Panel.extend({
  initialize : function(args) {
    PageHeader.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("header")) {
      this.header = "";
    }
  },

	template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
													"<h1>"+
														"{{= header}} "+
														"<small>{{= yield}}</small>"+
													"</h1>"+
												"</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "header": this.header,
      "rootID": this.id,
      "rootClasses": this.classes.join(" "),
      "rootAttrs": this.attributes.join(" ")
    });
  }
});
var Pagination = Panel.extend({
	initialize: function(args) {
		Pagination.__super__.initialize.call(this, args);
		if(!this.hasOwnProperty("pages")) {
			this.pages = 0
		}
		if(this.childPrefix === "") {
			this.childPrefix = "<li>";
		}
		if(this.childSuffix === "") {
			this.childSuffix = "</li>";
		}
		this.classes.unshift("pagination");
		if(this.children.length === 0) {
			this.add(new Link({body: "&laquo;", classes: ["prev"]}));
			_(this.pages).times(function(i) {
				this.add(new Link({body: (i+1)}));
			}, this);
			this.add(new Link({body: "&raquo;", classes: ["next"]}));
		}
	},

	renderChildren: function() {
		return "<ul>" + Pagination.__super__.renderChildren.call(this) + "</ul>";
	}

});
var ProgressBar = Panel.extend({
  types: ["info", "success", "warning", "danger"],
  initialize: function(args) {
    ProgressBar.__super__.initialize.call(this, args);
    if(!this.hasOwnProperty("width")) {
      this.width = 100;
    }

    this.setWidth(this.width);

    this.base = "bar";
    Typify(this);
  },

  setWidth: function(newWidth) {
    if(newWidth > 100) {
      throw new RangeError("cannot set width greater than 100%");
    } else if(newWidth < 0) {
      throw new RangeError("cannot set width less than 0%");
    }

    //set width and style attributes
    var oldWidth = this.width;
    this.width = newWidth;
    this.attributes = _.reject(this.attributes, function(attr) {
      return attr.match(/style/i);
    }).concat(["style='width: "+newWidth+"'"]);

    //fire width-change event so that parent ProgressBarGroups can update accordingly
    if(oldWidth !== newWidth) {
      $(this).trigger("progressbar.width-change", newWidth, oldWidth);
    }
  }
});
function Raw(body) {
  this.text = body;
}

Raw.prototype.render = function() {
  return this.text;
}
;
var Accordion = Panel.extend({
	//this one is going to take some thought....
	template : _.template(
												"<div class='accordion' id='{{= rootID }}' {{= rootAttrs }}>"+
													"{{ _(children).each(function(child){ }}"+
													"<div class='accordion-group'>"+
														"<div class='accordion-heading'>"+
															"<a class='accordion-toggle' data-parent='{{= rootID }}' data-toggle='collapse' href='#collapseOne'>"+
																"{{= child.heading}}"+
															"</a>"+
														"</div>"+
														"<div class='accordion-body collapse in' id='collapseOne'>"+
															"<div class='accordion-inner'>"+
																"{{= child.body}}"+
															"</div>"+
														"</div>"+
													"</div>"+
													"{{ }); }}"+
												"</div>"
												)

});
var Carousel = Component.extend({
	//Gunna have to come back to this one
	template : _.template(
												"<div class='carousel slide' id='{{= rootID }}' {{= rootAttrs }}>"+
													"<ol class='carousel-indicators'>"+
														"{{ _(slides).each(function(slide, i){ }}"+
														"<li data-slide-to='{{= i }}' data-target='#{{= rootID }}'></li>"+
														"{{= slide}}"+
														"{{ }); }}"+
													"</ol>"+
													"<div class='carousel-inner'>"+
														"{{ _(items).each(function(item){ }}"+
														"<div class='item'></div>"+
														"{{= item}}"+
														"{{ }); }}"+
													"</div>"+
													"<a class='carousel-control left' data-slide='prev' href='#{{= rootID }}'>&lsaquo;</a>"+
													"<a class='carousel-control right' data-slide='next' href='#{{= rootID }}'>&rsaquo;</a>"+
												"</div>"
												)

});
var Thumbnail = Component.extend({

	template : _.template(
												"<ul class='thumbnails'>"+
													"{{ _(children).each(function(child){ }}"+
													"<li class='span3'>"+
														"<img src='{{= child }}' />"+
													"</li>"+
													"{{ }); }}"+
												"</ul>"
												)

});
/* Manifest file for compiling assets with Sprockets
 *







 */
;
