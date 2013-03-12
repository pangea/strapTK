var Alert = Panel.extend({
      initialize : function(args) {
        Alert.__super__.initialize.call(this, args);
        this.base = "alert";
        this.types =["error", "success", "info"]
        Typify(this);
      },

    	template : _.template("<div id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>>" +
    													"<% if(closable) { %>" +
                                "<button class='close' data-dismiss='alert' type='button'>&times;</button>" +
                              "<% } %>" +
    													"<strong><%= title %></strong>" +
    													"<%= yield %>" +
    												"</div>"),

      render : function() {
        var markup = this.body + this.renderChildren();
        return this.template({
          "yield": markup,
          "title": this.title,
          "closable": this.closable,
          "rootID": this.id,
          "rootClasses": this.listClasses(),
          "rootAttrs": this.listAttributes()
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