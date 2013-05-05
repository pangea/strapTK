/* Sprocket Manifest
 *= require Panel
 */

/**
 * @class Sources are Components that know how to gather and use data gathered from a 3rd party API
 * @extends Panel
 *
 * @property {String} src   The URL to the data source of this component
 * @property {Object} data  The data for this Source
 */
var Source = Panel.extend(
    /** @lends Source# */
    {
      /** @see Component#initialize */
      initialize : function(args) {
        Source.__super__.initialize.call(this, args);

        this.setDefaultValue("", "src");
        this.setDefaultValue({}, "data");

        // convert template from string to function
        if(typeof(this.template) === "string") {
          this.template = _.template(this.template);
        }

        //set up Fetching here, if src is not blank
      },

      /**
       * Source objects must define their templates at instantiation.
       *
       * @throws Not Defined
       */
      template : function() { throw "Not Defined"; },

      /**
       * Overrides render to pass in the Source#data field
       *
       * @see Panel#render
       */
      render : function(intoDOM) {
            // if data is a function, use the return from that function, else data
        var markup,
            _data = (data.call ? data.call(this) : data),
            innerHTML = this.body + this.renderChildren();

        // make data an array to make this easier
        if(!_.isArray(_data)) {
          _data = [_data];
        }

        // iterate over the contents of data and produce the templates
        markup = _.each(_data, function(entry) {
          return this.template({
            "yield": innerHTML,
            "data" : entry,
            "rootAttrs" : this.listAttributes()
          });
        }, this).join("");

        if(intoDOM && this.id) {
          $("#"+this.id).html(markup);
        }

        return markup;
      }
    },
    /** @lends Source */
    {
      klass: "Source"
    });

// function Source(component, options) {
//   if(!(component instanceof Component)) {
//     throw TypeError("Source can only operate on Components");
//   }

//   options || (options = {});

//   component.sync = function() {
//     //at the end of the sync
//     var event = $.Event("component.update");
//     event.target = this;
//     event.relatedTarget = this;
//     $(this).trigger(event);
//   }

//   //set up data sourcing options

//   component.fetcher = new Fetcher();
// }

// /**
//  * Handles data transfer to and from (mostly from) an API
//  *   Can also connect one component to another component
//  *
//  * @param options [Object] the settings to apply to this Fetcher
//  *
//  * @throws SyntaxError
//  *  if options is not defined
//  *  if no source is given
//  *  if websocket is forced but no command is given
//  *  if the source is not valid (must be a String or Component)
//  *
//  * @throws WebsocketConnectError if websocket is forced but no connection is possible
//  */
// function Fetcher(options) {
//   if(!options) { throw new SyntaxError("You must define options for a Fetcher"); }
//   if(!options.source) { throw new SyntaxError("You must supply a source."); }
//   if(options.websocket && !options.command) { throw new SyntaxError("You must define a command when forcing WebSockets."); }

//   var websocket,
//       opened            = false,
//       id                = _.uniqueID("fetcher_"),
//       source            = options.source,
//       method            = options.method || "GET",
//       forceWebsocket    = options.websocket || false,
//       command           = options.command,
//       pollInterval      = options.pollInterval,
//       messageCallback   = options.callback || $.noop;

//   if(typeof(source) == "string") {
//     if(websockCommand) {
//       // auto executing function to create our websocket
//       // also creates a few closures, but that shouldn't be a problem
//       (function() {
//         opened = false;

//         websocket = new WebSocket(source);

//         // this is only used to determine if the websocket opened successfully
//         websocket.addEventListener("open", function() {
//           opened = true;
//         });

//         // used to properly perform fallbacks in the event of connection failure
//         websocket.addEventListener("close", function() {
//           if(!opened) {
//             if(source.match(/^ws/)) {
//               forceWebsocket = true;
//               source.replace(/^ws/, "http");
//               arguments.callee();
//             } else if(forceWebsocket) {
//               throw WebsocketConnectError("Unable to connect to "+source+" via WebSocket.");
//             } else {
//               websocket = false;
//             }
//           }
//         });

//         websocket.addEventListener("message", ,messageCallback);

//       })();
//     }

//   // Sourced Components are also valid data sources
//   } else if(source instanceof Component && source.data)  {
//     // subscribe to the source's update event
//     $(source).on("component.update."+id, messageCallback);

//   } else {
//     throw new SyntaxError("Invalid source type.");
//   }

//   /**
//    * Transfers data to or requests data from the source
//    */
//   this.sync = function(data) {
//     data || (data = command);
//     if(websocket) {
//       websocket.send(data);
//     } else if(typeof(source) == "string") {
//       $.ajax({
//         url: source,
//         data: data,
//         type: method,
//         success: messageCallback
//       });
//     } else {
//       messageCallback(null, source.data);
//     }
//   };

//   this.then = function(callback) {
//     if(!callback) { throw SyntaxError("You must supply a callback to Fetcher.then"); }
//     messageCallback = callback;

//     if(source instanceof Component) {

//       // reset update callback on sourced component
//       $(source).off("component.update."+id).on("component.update."+id, messageCallback);

//     } else if(websocket) {
//       websocket.removeEventListener("message");
//       websocket.addEventListener("message", messageCallback);
//     }
//   }
