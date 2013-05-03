/* Sprocket Manifest
 *= require Panel
 */
var Modal = Panel.extend(
    /** @lends Modal# */
    {
      initialize : function(args) {
        Modal.__super__.initialize.call(this, args);

        this.setDefaultValue([], "actions");
        this.setDefaultValue("", "header");
        this.setDefaultValue(false, "closable");
        this.addClass("modal");
      },

      template : _.template("<div <%= rootAttrs %>>"+
                              "<% if(closable || header) { %>" +
                                "<div class='modal-header'>"+
                                  "<% if(closable) { %>" +
                                    "<button aria-hidden='true' class='close' data-dismiss='modal' type='button'>&times;</button>"+
                                  "<% } %>" +
                                  "<%= header %>"+
                                "</div>"+
                              "<% } %>" +
                              "<div class='modal-body'><%= yield%></div>"+
                              "<% if(actions) { %>" +
                                "<div class='modal-footer'><%= actions %></div>"+
                              "<% } %>" +
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

      renderActions : function() {
        var markup = "";
        _.each(this.actions, function(action) {
          markup += action.render();
        });

        return markup;
      },

      renderHash : function() {
        return  _.extend(
                  Modal.__super__.renderHash.call(this),
                  {
                    header  : this.header,
                    actions : this.renderActions(),
                    closable: this.closable
                  }
                );
      }
    },
    /** @lends Modal */
    {
      klass: "Modal"
    });

//aliases
Modal.prototype.addAction = Modal.prototype.pushAction;