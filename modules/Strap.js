var strap = (function() {
      /**
       * Attempts to generate a Component from a given hash
       *
       * @param {Object} obj        The object to strap
       * @param {String} [obj.tag]  The HTML tag the new Component should have
       *
       * @return {Component|Panel} A strap'd object
       *
       * @see Component
       * @see Panel
       */
      var strap = function(obj) {
        var tagged = typeof(obj.tag) != "undefined" && typeof(obj.tag) == "string",
            gen = tagged ? new Panel(obj) : new Component(obj);

        if(tagged) {
          gen.template = strap.generateSimpleTemplate(obj.tag);
        }

        return gen;
      };

      /**
       * Constructs Strap'd objects from JSON.
       * While it is possible to pass a Strap'd object into this function and receive a
       * fully functional object out, the original object will be altered.
       *
       * @param {String|Object|Array} json The JSON string or object to be converted
       *
       * @returns {Object|Object[]} The result of building the Strap'd objects
       */
      strap.build = function(json) {

        /**
         * Parses the JSON and produces Strap'd classes
         *
         * @private
         *
         * @param {Object} json The object to be parsed
         *
         * @returns {Object} A Strap'd object
         */
        function parse(json) {
          var obj,
              children = json.children;

          // delete json.klass;

          // Create the base strap'd class
          obj = new window[json.klass](json);

          // Check if the object was manually typified
          if(obj.type && !obj.setType) {
            Typify(obj);  // and typify it
          }

          // Parse the list of children
          // if(children && _.isArray(children) && children.length) {
          //   _(children).each(function(child) {
          //     obj.add(parse(child)); // Parse each child and add it to the main object's list of children
          //   });
          // }

          return obj;
        }

        // Check if the JSON needs parsing
        if(typeof(json) === "string") {
          json = JSON.parse(json);
        }

        if(_.isArray(json)) {
          // If we have an array of objects, we need to parse each of them
          var ret = [];
          _.each(json, function(obj) { ret.push(parse(obj)); });
          return ret;
        } else {
          // Otherwise, we just parse what we have
          return parse(json);
        }
      };

      /**
       * Generates a simple template with the given tag
       *
       * @param {String} tag The HTML tag to use
       *
       * @returns {Function} A function that can be used to compile the template
       */
      strap.generateSimpleTemplate = function(tag) {
        return _.template("<"+tag+" <%= rootAttrs %>><%= yield %></"+tag+">");
      };

      return strap;
    })();
