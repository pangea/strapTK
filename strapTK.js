/*
 * Strap'd ToolKit v 0.1.0 Copyright 2013 to Chris Hall
 * Under a Creative Commons Attribution-ShareAlike 3.0 Unported License
 */
;
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
        throw new RangeError("Invalid type - "+type);
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
var List = Panel.extend({
  initialize : function(args) {
    List.__super__.initialize.call(this, args);

    if(this.childPrefix === "") {
      this.childPrefix = "<li>";
    }
    if(this.childSuffix === "") {
      this.childSuffix = "</li>";
    }
  },

  template: _.template( "<ul id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</ul>")
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
      this.attributes.push("type='button'");
    }

    this.base = "btn";
    this.types = ["primary", "info", "success", "warning", "danger", "inverse", "link"];

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
var HeroUnit = Panel.extend({
  initialize : function(args) {
    HeroUnit.__super__.initialize.call(this, args);
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
function HorizontalRule(args) {}
HorizontalRule.prototype.render = function() {
  return "<hr/>";
}

var HR = HorizontalRule;
var Icon = Panel.extend({
  initialize : function(args) {
    Icon.__super__.initialize.call(this, args);

    // hopefully, this will keep memory down since I'm passing around a reference object
    this.types = ICONLIST;
    this.base = "icon";

    Typify(this);
  },

  template : _.template("<i id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}></i> {{= yield }}")
});

var ICONLIST = [
    "cloud-download", "cloud-upload", "lightbulb", "exchange", "bell-alt", "file-alt", "beer", "coffee", "food", "fighter-jet", "user-md", "stethoscope",
    "suitcase", "building", "hospital", "ambulance", "medkit", "h-sign", "plus-sign-alt", "spinner", "angle-left", "angle-right", "angle-up", "angle-down",
    "double-angle-left", "double-angle-right", "double-angle-up", "double-angle-down", "circle-blank", "circle", "desktop", "laptop", "tablet", "mobile-phone",
    "quote-left", "quote-right", "reply", "github-alt", "folder-close-alt", "folder-open-alt", "adjust", "asterisk", "ban-circle", "bar-chart", "barcode",
    "beaker", "beer", "bell", "bell-alt", "bolt", "book", "bookmark", "bookmark-empty", "briefcase", "bullhorn", "calendar", "camera", "camera-retro",
    "certificate", "check", "check-empty", "circle", "circle-blank", "cloud", "cloud-download", "cloud-upload", "coffee", "cog", "cogs", "comment", "comment-alt",
    "comments", "comments-alt", "credit-card", "dashboard", "desktop", "download", "download-alt", "edit", "envelope", "envelope-alt", "exchange",
    "exclamation-sign", "external-link", "eye-close", "eye-open", "facetime-video", "fighter-jet", "film", "filter", "fire", "flag", "folder-close",
    "folder-open", "folder-close-alt", "folder-open-alt", "food", "gift", "glass", "globe", "group", "hdd", "headphones", "heart", "heart-empty", "home",
    "inbox", "info-sign", "key", "leaf", "laptop", "legal", "lemon", "lightbulb", "lock", "unlock", "magic", "magnet", "map-marker", "minus", "minus-sign",
    "mobile-phone", "money", "move", "music", "off", "ok", "ok-circle", "ok-sign", "pencil", "picture", "plane", "plus", "plus-sign", "print", "pushpin",
    "qrcode", "question-sign", "quote-left", "quote-right", "random", "refresh", "remove", "remove-circle", "remove-sign", "reorder", "reply",
    "resize-horizontal", "resize-vertical", "retweet", "road", "rss", "screenshot", "search", "share", "share-alt", "shopping-cart", "signal", "signin",
    "signout", "sitemap", "sort", "sort-down", "sort-up", "spinner", "star", "star-empty", "star-half", "tablet", "tag", "tags", "tasks", "thumbs-down",
    "thumbs-up", "time", "tint", "trash", "trophy", "truck", "umbrella", "upload", "upload-alt", "user", "user-md", "volume-off", "volume-down", "volume-up",
    "warning-sign", "wrench", "zoom-in", "zoom-out", "file", "file-alt", "cut", "copy", "paste", "save", "undo", "repeat", "text-height", "text-width",
    "align-left", "align-center", "align-right", "align-justify", "indent-left", "indent-right", "font", "bold", "italic", "strikethrough", "underline", "link",
    "paper-clip", "columns", "table", "th-large", "th", "th-list", "list", "list-ol", "list-ul", "list-alt", "angle-left", "angle-right", "angle-up",
    "angle-down", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "caret-down", "caret-left", "caret-right", "caret-up", "chevron-down", "chevron-left",
    "chevron-right", "chevron-up", "circle-arrow-down", "circle-arrow-left", "circle-arrow-right", "circle-arrow-up", "double-angle-left", "double-angle-right",
    "double-angle-up", "double-angle-down", "hand-down", "hand-left", "hand-right", "hand-up", "circle", "circle-blank", "play-circle", "play", "pause", "stop",
    "step-backward", "fast-backward", "backward", "forward", "fast-forward", "step-forward", "eject", "fullscreen", "resize-full", "resize-small", "phone",
    "phone-sign", "facebook", "facebook-sign", "twitter", "twitter-sign", "github", "github-alt", "github-sign", "linkedin", "linkedin-sign", "pinterest",
    "pinterest-sign", "google-plus", "google-plus-sign", "sign-blank", "ambulance", "beaker", "h-sign", "hospital", "medkit", "plus-sign-alt", "stethoscope",
    "user-md"
  ];
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
var Nav = List.extend({
  initialize: function(args) {
    Nav.__super__.initialize.call(this, args);

    if(!this.hasOwnProperty("divided")) {
      this.divided = false;
    }

    this.childPrefix = "<li>";
    this.childSuffix = "</li>";
    this.types = ["tabs", "pills", "list"];
    this.base = "nav";
    Typify(this);
  },

  renderChildren : function(prefix, suffix) {
    prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);

    var markup = "";
    _.each(this.children, function(child) {
      markup += (child.active ? prefix.replace(/>$/," class='active'>") : prefix) + child.render() + suffix;
    });
    return markup;
  },

  render : function() {
    var markup = Nav.__super__.render.call(this);
    if(this.divided) {
      markup = markup.split("</li><li").join("</li><li class='divider-vertical'></li><li");
    }
    return markup
  },

  divide : function(divided) {
    if(divided) {
      this.divided = true;
    } else if(divided === false) {
      this.divided = false;
    }

    return this.divided;
  }
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
    if(!this.hasOwnProperty("level")) {
      this.level = 1;
    }
  },

	template : _.template("<div id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
													"<h{{= level }}>"+
														"{{= header}} "+
														"<small>{{= yield}}</small>"+
													"</h{{= level }}>"+
												"</div>"),

  render : function() {
    var markup = this.body + this.renderChildren();
    return this.template({
      "yield": markup,
      "header": this.header,
      "level": this.level,
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
var Paragraph = Panel.extend({
  template : _.template("<p id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>{{= yield }}</p>")
});

var P = Paragraph;
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
var ViewportSwitcher = Viewport.extend({
  initialize: function(args) {
    ViewportSwitcher.__super__.initialize.call(this, args);
  },
  add: function(port) {
    if(!port instanceof Viewport) {
      throw SyntaxError("Only Viewports can be added to ViewportSwitchers");
    }

    var id = _.uniqueID(this.root);
  }
});
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
