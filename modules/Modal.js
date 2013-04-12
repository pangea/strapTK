var Modal = Panel.extend({
      initialize : function(args) {
        Modal.__super__.initialize.call(this, args);

        this.setDefaultValue([], "actions");
        this.setDefaultValue("", "header");
        this.setDefaultValue(false, "closable");
        this.addClass("modal");
      },

      template : _.template("<div <%= rootAttrs %>>"+
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
          "closable": this.closable,
          "rootAttrs": this.listAttributes()
        });
      }
    },{
      klass: "Modal"
    });

//aliases
Modal.prototype.addAction = Modal.prototype.pushAction;