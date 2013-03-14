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
    });