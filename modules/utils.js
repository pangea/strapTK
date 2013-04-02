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
 * @param component [Component] the Component to be decorated
 * @param options   [Object]    Optional.  The settings for this typed Component
 *
 * @throws TypeError if component is not an instance or subclass of Component
 */
function Typify(component, options) {
  if(!(component instanceof Component)) {
    throw TypeError("Typify can only operate on Components");
  }

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

/**
 * Source adds data sources to Components.
 * This allows them to gather data from a remote API via AJAX or Websockets
 *
 * Specifying a source URL with the websocket protocol (ws:// or wss://) will force
 *  the source to always be gathered via websocket.  If a websocket connection is not
 *  available, a WebsocketConnectError will be thrown.  Of note, this process will
 *  fall back to HTTP protocol before throwing an error.
 *
 * Sourced Components MUST specify a callback to handle the data returned by the server
 *  before calling the sync() method.  Failure to do so will result in an error.
 *
 * @param component [Component] the Component to add sourcing to
 * @param options   [Object]    Optional.  The settings for this Sourced Component
 *
 * @throws TypeError if component is not an instance or subclass of Component
 */
function Source(component, options) {
  if(!(component instanceof Component)) {
    throw TypeError("Source can only operate on Components");
  }

  options || (options = {});

  component.sync = function() {
    //at the end of the sync
    var event = $.Event("component.update");
    event.target = this;
    event.relatedTarget = this;
    $(this).trigger(event);
  }

  //set up data sourcing options

  component.fetcher = new Fetcher();
}

/**
 * Handles data transfer to and from (mostly from) an API
 *   Can also connect one component to another component
 *
 * @param options [Object] the settings to apply to this Fetcher
 *
 * @throws SyntaxError
 *  if options is not defined
 *  if no source is given
 *  if websocket is forced but no command is given
 *  if the source is not valid (must be a String or Component)
 *
 * @throws WebsocketConnectError if websocket is forced but no connection is possible
 */
function Fetcher(options) {
  if(!options) { throw new SyntaxError("You must define options for a Fetcher"); }
  if(!options.source) { throw new SyntaxError("You must supply a source."); }
  if(options.websocket && !options.command) { throw new SyntaxError("You must define a command when forcing WebSockets."); }

  var websocket,
      opened            = false,
      id                = _.uniqueID("fetcher_"),
      source            = options.source,
      method            = options.method || "GET",
      forceWebsocket    = options.websocket || false,
      command           = options.command,
      pollInterval      = options.pollInterval,
      messageCallback   = options.callback || $.noop;

  if(typeof(source) == "string") {
    if(websockCommand) {
      // auto executing function to create our websocket
      // also creates a few closures, but that shouldn't be a problem
      (function() {
        opened = false;

        websocket = new WebSocket(source);

        // this is only used to determine if the websocket opened successfully
        websocket.addEventListener("open", function() {
          opened = true;
        });

        // used to properly perform fallbacks in the event of connection failure
        websocket.addEventListener("close", function() {
          if(!opened) {
            if(source.match(/^ws/)) {
              forceWebsocket = true;
              source.replace(/^ws/, "http");
              arguments.callee();
            } else if(forceWebsocket) {
              throw WebsocketConnectError("Unable to connect to "+source+" via WebSocket.");
            } else {
              websocket = false;
            }
          }
        });

        websocket.addEventListener("message", ,messageCallback);

      })();
    }

  // Sourced Components are also valid data sources
  } else if(source instanceof Component && source.data)  {
    // subscribe to the source's update event
    $(source).on("component.update."+id, messageCallback);

  } else {
    throw new SyntaxError("Invalid source type.");
  }

  /**
   * Transfers data to or requests data from the source
   */
  this.sync = function(data) {
    data || (data = command);
    if(websocket) {
      websocket.send(data);
    } else if(typeof(source) == "string") {
      $.ajax({
        url: source,
        data: data,
        type: method,
        success: messageCallback
      });
    } else {
      messageCallback(null, source.data);
    }
  };

  this.then = function(callback) {
    if(!callback) { throw SyntaxError("You must supply a callback to Fetcher.then"); }
    messageCallback = callback;

    if(source instanceof Component) {

      // reset update callback on sourced component
      $(source).off("component.update."+id).on("component.update."+id, messageCallback);

    } else if(websocket) {
      websocket.removeEventListener("message");
      websocket.addEventListener("message", messageCallback);
    }
  }
}