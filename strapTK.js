/*
 * Strap'd ToolKit v 0.1.0 Copyright 2013 to Chris Hall
 * Under a Creative Commons Attribution-ShareAlike 3.0 Unported License
 */
;
/**
 * The strap object contains a set of global functions that apply to the
 *  entire page (e.g. setting all elements as draggable)
 */

var strap = new (function() {
      /**
       * @WIP
       */
      this.allDraggable = function(draggable) {
        if(draggable === true) {
          $("body").find("*").attr("draggable", "true")
        } else if(draggable === false) {
          $("body").find("*").removeAttr("draggable")
        }
      }

      // Constructs Strap'd Objects from JSON
      this.build = function(json) {

        function parse(json) {
          var obj,
              name = json.klass,
              children = json.children;

          delete json.klass;
          delete json.children;

          obj = new window[name](json);

          if(children && _.isArray(children) && children.length) {
            _(children).each(function(child) {
              obj.add(parse(child));
            });
          }

          return obj;
        }

        if(typeof(json) === "string") {
          json = JSON.parse(json);
        }

        if(_.isArray(json)) {
          var _ret = [];
          _(json).each(function(obj) {
            _ret.push(parse(obj));
          });
          return _ret;
        } else {
          return parse(json);
        }
      }
    })();

/**
 * Global Extend function for creating subclasses
 * Unceremoniously ripped out of Backbone.js.  Those guys are way smarter than I am.
 * You should go check out their work too: http://backbonejs.org
 *
 * The only modification made to this function is to add 'parent' as an argument instead
 *  of having the function be added to an object.
 *
 * @param parent [Object] the object to be extended
 * @param protoProps [Object] the properties to add to the new object's prototype
 * @param staticProps [Object] the properties to add to the new object's constructor
 *
 * @return the extended object
 */
// Function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
function Extend(parent, protoProps, staticProps) {
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
}

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
  component.base  || (component.base  = options.base);
  component.type  || (component.type  = options.type);

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
;
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

        _.each(this.children, function(child) {
          this.checkIfRenderable(child);
        }, this);

        this.setDefaultValue("", "childPrefix", "childSuffix");
          // used for deserialization from JSON
        this.klass = this.constructor.klass;
      },

      setDefaultValue: function(value) {
        var args = Array.prototype.slice.call(arguments, 1),      // get the list of attributes to apply the value to
            method = _.isArray(value) ? "apply" : "call";         // determine which Function prototype method to call

        _.each(args, function(attr) {
          if(!this.hasOwnProperty(attr)) {                        // set value only if it's not already set
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

      // Gets the child at the selected index
      get : function(index) {
        switch(typeof(index)) {
          case "string":
            return this[index];

          case "number":
            return this.children[index];
        }

        throw TypeError("index must be a string or number.");
      },

      //Removes the child at index
      remove : function(index) {
        if(index) {
          return this.children.splice(index, 1)[0];
        }
        return this.pop();
      },

      checkIfRenderable : function(renderable) {
        if(typeof(renderable.render) === "function") {
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

    },{
      klass : "Component"
    });

//aliases
Component.prototype.add = Component.prototype.push;
var Viewport = Component.extend({
      initialize: function(args) {
        Viewport.__super__.initialize.call(this, args);
        this.setDefaultValue("body", "root");
      },
      render : function() {
        return $(this.root).empty().append(this.renderChildren());
      }
    },{
      klass: "Viewport"
    });
var Panel = Component.extend({
      constructor: function(attributes, options) {
        if(typeof(attributes) == "string") {
          attributes = {body: attributes};
        }

        Panel.__super__.constructor.apply(this, arguments);
      },

      initialize: function(args) {
        Panel.__super__.initialize.call(this, args);

        this.setDefaultValue([], "classes", "attributes");
        this.setDefaultValue("", "id", "body");
      },

      addClass : function() {
        // gather up the classes to be added
        var newClasses = Array.prototype.slice.call(arguments, 0);
        // combine the current class list with the new class list, ignoring duplicates
        this.classes = _.union(this.classes, newClasses);
        return this;
      },

      removeClass : function() {
        // gather up the classes to be removed, and add them to an array
        // the final result is [[list, of, current, classes], list, of, classes, to, be, removed]
        var args = [this.classes].concat(Array.prototype.slice.call(arguments, 0));
        // apply the arguments to _.without
        // this is equivalent to _.without(this.classes, list, of, classes, to, be, removed);
        this.classes = _.without.apply(this, args);
        return this;
      },

      toggleClass : function() {
        var theClasses = Array.prototype.slice.call(arguments, 0);
        _.each(theClasses, function(theClass) {
          if(_.include(this.classes, theClass)) {
            this.removeClass(theClass);
          } else {
            this.addClass(theClass);
          }
        }, this);
        return this;
      },

      listClasses : function() {
        return this.classes.join(" ");
      },

      // this function can be called with a list of additional attributes that will be included in the output
      listAttributes : function() {
        // convert arguments into an actual array and map the values to the ones attached to this Panel
        var addAttrs = _.map(Array.prototype.slice.call(arguments, 0), function(val) {
          // remove empty values
          if(this[val] === "") {
            return false;
          }

          return val + "='" + this[val] + "'";
        }, this);

        // return the combined list
        return this.attributes.join(" ") + " " + _.compact(addAttrs).join(" ");
      },

      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs" : this.listAttributes()
        });
      }
    },{
      klass: "Panel"
    }),
    Div = Panel;
var AbstractBadge = Panel.extend({
      initialize : function(args) {
        AbstractBadge.__super__.initialize.call(this, args);
        this.types = ["success", "warning", "important", "info", "inverse"];
        Typify(this);
      },
      template : _.template("<span id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
                              "<%= yield %>"+
                            "</span>")
    },{
      klass: "AbstractBadge"
    });
var Link = Panel.extend({
      initialize : function(args) {
        Link.__super__.initialize.call(this, args);

        this.setDefaultValue("#", "href");
      },

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "href");
      },

      template : _.template("<a id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></a>")
    },{
      klass: "Link"
    });
var List = Panel.extend({
      initialize: function(args) {
        List.__super__.initialize.call(this, args);

        this.childPrefix || (this.childPrefix = "<li>");
        this.childSuffix || (this.childSuffix = "</li>");
      },

      template: _.template( "<ul id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
                              "<%= yield %>"+
                            "</ul>")
    },{
      klass: "List"
    });
var Accordion = Panel.extend({
      initialize: function(args) {
        Accordion.__super__.initialize.call(this, args);

        this.addClass("accordion");
      },

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          var childPanelID = this.id + "-" + i;
          markup += "<div class='accordion-group'>" +
                      "<div class='accordion-heading'>" +
                        "<a class='accordion-toggle' data-parent='#" + this.id + "' data-toggle='collapse' href='#" + childPanelID +"'>" +
                          child.heading +
                        "</a>" +
                      "</div>" +
                      "<div class='accordion-body collapse" + (child.open ? " in" : "") + "' id='" + childPanelID +"'>" +
                        "<div class='accordion-inner'>" +
                          child.render() +
                        "</div>" +
                      "</div>" +
                    "</div>";
        }, this);

        return markup;
      }
    },{
      klass: "Accordion"
    });
var Alert = Panel.extend({
      initialize : function(args) {
        Alert.__super__.initialize.call(this, args);
        this.base = "alert";
        this.types =["error", "success", "info"]
        Typify(this);
      },

      isBlock : function(blocked) {
        var isBlocked = _.include(this.classes, "alert-block");
        if(blocked === true) {
          if(!isBlocked) {
            this.addClass("alert-block");
          }
        } else if(blocked === false) {
          if(isBlocked) {
            this.removeClass("alert-block");
          }
        } else {
          return isBlocked;
        }
      },
      /**
       * Sets the closability of this alert.
       * Calling setClosable without specifying the closability sets closable to true
       *
       * @param closable [Boolean|null] Sets the closability of the alert.
       */
      setClosable : function(closable) {
        var hasCloseButton = false,
            closeButtonIndex = -1;
        _.each(this.children, function(child, i) {
          if(child instanceof CloseButton) {
            hasCloseButton = true;
            closeButtonIndex = i;
            return false;
          }
        });
        if(closable === true || typeof(closable) != "boolean") {
          if(hasCloseButton === false) {
            this.unshift(new CloseButton({
              attributes: ["data-dismiss='alert'"]
            }));
          }
          this.closable = true;
        } else {
          if(hasCloseButton) {
            this.remove(closeButtonIndex);
          }
        }
      }
    },{
      klass: "Alert"
    });
var Badge = AbstractBadge.extend({
      initialize : function(args) {
        this.base = "badge";
        Badge.__super__.initialize.call(this, args);
      }
    },{
      name: "Badge"
    });
var Breadcrumbs = Panel.extend({
      initialize : function(args) {
        Breadcrumbs.__super__.initialize.call(this, args);
        this.childPrefix || (this.childPrefix = "<li>");
        this.childSuffix || (this.childSuffix = "<span class='divider'>/</span></li>");
        this.addClass("breadcrumb");
      },

      template : _.template("<ul id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
                              "<%= yield %>"+
                            "</ul>"),
      render : function() {
        var markup = Breadcrumbs.__super__.render.call(this).split(this.childSuffix),
            last = markup.pop();
        return markup.join(this.childSuffix) + last;
      }
    },{
      name: "Breadcrumbs"
    });
var Button = Link.extend({
      initialize : function(args) {
        Button.__super__.initialize.call(this, args);

        this.attributes.unshift("type='button'");

        this.base = "btn";
        this.types = ["primary", "info", "success", "warning", "danger", "inverse", "link"];

        Typify(this);
      }
    },{
      name: "Button"
    });
var ButtonGroup = Panel.extend({
      initialize: function(args) {
        ButtonGroup.__super__.initialize.call(this, args);
        this.addClass("btn-group");
      }
    },{
      name: "ButtonGroup"
    });
var ButtonToolbar = Panel.extend({
      initialize: function(args) {
        ButtonToolbar.__super__.initialize.call(this, args);
        this.addClass("btn-toolbar");
      }
    },{
      name: "ButtonToolbar"
    });
var Carousel = Panel.extend({
      initialize: function(args) {
        Carousel.__super__.initialize.call(this, args);

        this.setDefaultValue(true, "controls");
        this.setDefaultValue("&lsaquo;", "prevSymbol");
        this.setDefaultValue("&rsaquo;", "nextSymbol");

        this.addClass("carousel", "slide");
      },

      //Gunna have to come back to this one
      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>" +
                              "<% if(controls) { %>" +
                                "<ol class='carousel-indicators'>" +
                                  "<% _(slides).times(function(i){ %>" +
                                    "<li data-slide-to='<%= i %>' data-target='#<%= rootID %>' <%= i == 0 ? \"classes='active'\" : '' %>></li>" +
                                  "<% }); %>" +
                                "</ol>" +
                              "<% } %>" +
                              "<div class='carousel-inner'>" +
                                "<%= yield %>" +
                              "</div>" +
                              "<% if(controls) { %>" +
                                "<a class='carousel-control left' data-slide='prev' href='#<%= rootID %>'><%= prevSymbol %></a>" +
                                "<a class='carousel-control right' data-slide='next' href='#<%= rootID %>'><%= nextSymbol %></a>" +
                              "<% } %>" +
                            "</div>"),

      renderChildren: function() {
        var markup = "";
        _.each(this.children, function(child, i) {
          markup += "<div class='item" + (i == 0 ? " active" : "") + "'>" +
                      child.render() +
                    "</div>";
        });
        return markup;
      },

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield"       : markup,
          "rootID"      : this.id,
          "rootClasses" : this.listClasses(),
          "rootAttrs"   : this.listAttributes(),
          "controls"    : this.controls,
          "slides"      : this.children.length,
          "prevSymbol"  : this.prevSymbol,
          "nextSymbol"  : this.nextSymbol
        });
      }

    },{
      name: "Carousel"
    });
var CloseButton = Link.extend({
      initialize : function(args) {
        CloseButton.__super__.initialize.call(this, args);
        this.addClass("close");
        this.body || (this.body = "&times;");
      }
    },{
      name: "CloseButton"
    });
var ContentRow = Panel.extend({
      initialize: function(args) {
        ContentRow.__super__.initialize.call(this, args);
        this.setDefaultValue(12, "maxChildren");
        this.ensureChildLimit();
        this.addClass("row-fluid");
      },
      push: function(component) {
        this.ensureChildLimit();
        ContentRow.__super__.push.call(this, component);
      },
      unshift: function(component) {
        this.ensureChildLimit();
        ContentRow.__super__.unshift.call(this, component);
      },
      insert: function(component, index) {
        this.ensureChildLimit();
        ContentRow.__super__.insert.call(this, component, index);
      },
      renderChildren: function(prefix, suffix) {
        prefix || (prefix = this.childPrefix); suffix || (suffix = this.childSuffix);
        var rowWidth = this.maxChildren,
            fluidChildren = this.children.length;

        _.each(this.children, function(child) {
          rowWidth -= (child.span || 0);
          fluidChildren -= (child.span ? 1 : 0);
        });

        var span = Math.floor(rowWidth/fluidChildren),
            markup = "";
        _.each(this.children, function(child) {
          markup += "<div class='span"+(child.span || span)+"'>" + prefix + child.render() + suffix + "</div>";
        });
        return markup;
      },
      ensureChildLimit: function() {
        if(this.children.length >= this.maxChildren) {
          throw TooManyChildrenError("This row can only have "+this.maxChildren+" children");
        }
      }
    },{
      klass: "ContentRow"
    });
var Dropdown = List.extend({
      initialize : function(args) {
        Dropdown.__super__.initialize.call(this, args);

        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("dropdown-menu");
      }
    },{
      klass: "Dropdown"
    });
var Form = Panel.extend({
      initialize : function(args) {
        Form.__super__.initialize.call(this, args);

        this.setDefaultValue("GET", "method");
        this.setDefaultValue("", "action");
      },

      template : _.template( "<form id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></form>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "method", "action");
      }
    },{
      klass: "Form"
    });
var FormInput = Panel.extend({
      initialize : function(args) {
        FormInput.__super__.initialize.call(this, args);

        this.types = [
                      "button", "checkbox", "color", "date", "datetime", "datetime-local", "email", "file", "hidden", "image", "month",
                      "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"
                    ];

        this.setDefaultValue("", "placeholder", "name", "value");
        this.setDefaultValue("text", "type");
        this.base = "input";
        Typify(this);
      },

      template : _.template("<input id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %> />"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "type", "placeholder", "name", "value");
      }
    });
var FormLabel = Panel.extend({
      template : _.template("<label id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></label>")
    },{
      klass : "FormLabel"
    });
var FormSelect = Panel.extend({
      template : _.template("<select id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>> <%= yield %> </select>")
    },{
      klass : "FormSelect"
    }),

    SelectOption = Panel.extend({
      initialize : function(args) {
        SelectOption.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "value");
      },

      template : _.template("<option <%= rootAttrs %>> <%= yield %> </option>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "value");
      }
    }, {
      klass : "SelectOption"
    }),

    OptGroup = Panel.extend({
      initialize : function(args) {
        OptGroup.__super__.initialize.call(this, args);

        this.setDefaultValue("", "label");
      },

      template : _.template("<optgroup <%= rootAttrs %>> <%= yield %> </optgroup>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "label");
      }
    });
var HeroUnit = Panel.extend({
      initialize : function(args) {
        HeroUnit.__super__.initialize.call(this, args);

        this.setDefaultValue("", "title");

        this.addClass("hero-unit");
      },
      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
                              "<h1><%= title %></h1>"+
                              "<%= yield %>"+
                            "</div>"),
      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "title": this.title,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "HeroUnit"
    });
function HorizontalRule() { this.klass = "HorizontalRule"; }
HorizontalRule.prototype.render = function() {
  return "<hr/>";
}

var HR = HorizontalRule;
var Icon = Panel.extend({
      initialize : function(args) {
        Icon.__super__.initialize.call(this, args);

        this.base = "icon";
        this.types = ICONLIST; // hopefully, this will keep memory down since I'm passing around a reference object

        Typify(this);
      },

      template : _.template("<i id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>></i> <%= yield %>")
    },{
      klass: "Icon"
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
var Image = Panel.extend({
      initialize : function(args) {
        Image.__super__.initialize.call(this, args);

        this.setDefaultValue("", "src");
      },

      template : _.template("<img id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %> />"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "src");
      }
    },{
      klass: "Image"
    })
;
var Label = AbstractBadge.extend({
      initialize : function(args) {
        this.base = "label";
        Label.__super__.initialize.call(this, args);
      }
    },{
      klass: "Label"
    });
function LineBreak() { this.klass = "LineBreak"; }
LineBreak.prototype.render = function() {
  return "<br/>";
}

var BR = LineBreak;
var Modal = Panel.extend({
      initialize : function(args) {
        Modal.__super__.initialize.call(this, args);

        this.setDefaultValue([], "actions");
        this.setDefaultValue("", "header");

        this.addClass("modal");
      },

      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
                              "<div class='modal-header'>"+
                                "<% if(closable) { %>" +
                                  "<button aria-hidden='true' class='close' data-dismiss='modal' type='button'>&times;</button>"+
                                "<% } %>" +
                                "<h3><%= header %></h3>"+
                              "</div>"+
                              "<div class='modal-body'><%= yield%></div>"+
                              "<div class='modal-footer'><%= actions %></div>"+
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
          "rootClasses": this.listClasses(),
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "Modal"
    });

//aliases
Modal.prototype.addAction = Modal.prototype.pushAction;
var Nav = List.extend({
      initialize: function(args) {
        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        Nav.__super__.initialize.call(this, args);

        this.setDefaultValue(false, "divided");

        this.base = "nav";
        this.types = ["tabs", "pills", "list"];
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
    },{
      klass: "Nav"
    });
var NavBar = Panel.extend({
      initialize : function(args) {
        NavBar.__super__.initialize.call(this, args);
        this.addClass("navbar");
      },

      renderChildren : function() {
        return "<div class='navbar-inner'>" + NavBar.__super__.renderChildren.call(this) + "</div>";
      }
    },{
      klass: "NavBar"
    });
var PageHeader = Panel.extend({
      initialize: function(args) {
        PageHeader.__super__.initialize.call(this, args);
        this.setDefaultValue("", "header");
        this.setDefaultValue(1, "level");
      },
      template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>"+
    													"<h<%= level %>>"+
    														"<%= header%> "+
    														"<small><%= yield%></small>"+
    													"</h<%= level %>>"+
    												"</div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "header": this.header,
          "level": this.level,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "PageHeader"
    });
var Pagination = Panel.extend({
      initialize: function(args) {
        if(this.children && this.pages) {
          throw new SyntaxError("Paginators cannot accept both children and pages");
        }
        Pagination.__super__.initialize.call(this, args);

        this.setDefaultValue(0, "pages");
        this.childPrefix = "<li>";
        this.childSuffix = "</li>";

        this.addClass("pagination");

        if(this.children.length === 0) {
          this.buildPages();
        }
      },

      renderChildren: function() {
        return "<ul>" + Pagination.__super__.renderChildren.call(this) + "</ul>";
      },

      setPages: function(pages) {
        this.pages = pages;
        this.buildPages();
      },

      buildPages: function() {
        this.children = [];
        if(this.pages < 1) {
          throw new SyntaxError("You must supply a number of pages greater than 0");
        } else if(this.pages > 1) {
          this.add(new Link({body: "&laquo;", classes: ["prev"]}));
          _.times(this.pages, function(i) {
            this.add(new Link((i+1).toString()));
          }, this);
          this.add(new Link({body: "&raquo;", classes: ["next"]}));
        } else {
          console.warn("Paginator instanciated with only 1 page."); //paginators with only 1 page don't display
        }
      }

    },{
      klass: "Pagination"
    });
var Paragraph = Panel.extend({
      template : _.template("<p id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></p>")
    },{
      klass: "Paragraph"
    }),
    P = Paragraph;
var ProgressBar = Panel.extend({
      initialize: function(args) {
        ProgressBar.__super__.initialize.call(this, args);
        this.setDefaultValue(100, "width");

        this.setWidth(this.width);

        this.base = "bar";
        this.types = ["info", "success", "warning", "danger"];
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
    },{
      klass: "ProgressBar"
    });
function Raw(body) {
  this.text = body;
  this.klass = "Raw"
}

Raw.prototype.render = function() {
  return this.text;
}
;
var Table = Panel.extend({
      initialize: function(args) {
        Table.__super__.initialize.call(this, args);
        this.addClass("table");
        this.attributes.unshift("style='color: inherit'");  //monkey patch for odd behavior in Webkit
        _.each(this.children, this.throwUnlessRow);         //make sure all children are table rows
      },
      push: function(row) {
        this.throwUnlessRow(row);
        Table.__super__.push.call(this, row);
      },
      unshift: function(row) {
        this.throwUnlessRow(row);
        Table.__super__.unshift.call(this, row);
      },
      insert: function(row, index) {
        this.throwUnlessRow(row);
        Table.__super__.insert.call(this, row, index);
      },
      throwUnlessRow: function(row) {
        if(row instanceof TableRow) { return; }

        throw new TypeError("Tables can only have Rows as children");
      },
      template: _.template("<table id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></table>")
    },{
      klass: "Table"
    }),

    TableRow = Panel.extend({
      initialize: function(args) {
        TableRow.__super__.initialize.call(this, args);

        _.each(this.children, this.throwUnlessCell); //make sure all children are table cells
      },
      push: function(component) {
        this.throwUnlessCell(component);
        TableRow.__super__.push.call(this, component);
      },
      unshift: function(component) {
        this.throwUnlessCell(component);
        TableRow.__super__.unshift.call(this, component);
      },
      insert: function(component, index) {
        this.throwUnlessCell(component);
        TableRow.__super__.insert.apply(this, arguments);
      },
      throwUnlessCell: function(cell) {
        if(cell instanceof TableCell || cell instanceof TableHeader) { return; }

        throw new TypeError("Rows can only have Cells as children");
      },
      template: _.template("<tr id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></tr>")
    },{
      klass: "TableRow"
    }),

    TableCell = Panel.extend({
      template : _.template("<td id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></td>")
    },{
      klass: "TableCell"
    }),

    TableHeader = Panel.extend({
      template : _.template("<th id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></th>")
    },{
      klass: "TableHeader"
    });

    //aliases
Table.prototype.add = Table.prototype.push;
TableRow.prototype.add = TableRow.prototype.push;
var Textarea = Panel.extend({
      template : _.template("<textarea id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></textarea>")
    }, {
      klass : "Textarea"
    });
var TooManyChildrenError  = Extend(Error, {message: "Too many children.", name: "TooManyChildrenError"}),

    WebsocketConnectError = Extend(Error, {message: "Unable to connect via websocket.", name: "WebsocketConnectError"});
/* Manifest file for compiling assets with Sprockets
 *









 */
;
