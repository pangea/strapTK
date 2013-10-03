/* Sprocket Manifest
 *= require Panel
 */
var Table = Panel.extend(
    /** @lends Table# */
    {
      initialize: function(args) {
        // Override devault value of body with an Array
        // If still set to a string, the render function
        // will fall back to older style of handling it
        this.setDefaultValue([], "head", "body", "foot");

        Table.__super__.initialize.call(this, args);

        this.addClass("table");
        this.attributes.unshift("style='color: inherit'");  //monkey patch for odd behavior in Webkit

        // make sure all children are table rows
        if(this.children.length || _.isString(this.body)) {
          this.legacy = true;
          _.each(this.children, this.throwUnlessRow);
        } else {
          _.each(this.head, this.throwUnlessRow);
          _.each(this.body, this.throwUnlessRow);
          _.each(this.foot, this.throwUnlessRow);
        }
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
        if(
            row instanceof TableRow ||
            row instanceof Source ||
            (row.tag && (row.tag == "thead" || row.tag == "tfoot" || row.tag == "tbody"))
          ) { return; }

        throw new TypeError("Invalid child type: " + row.klass + ".  Must be either TableRow or Source.");
      },

      renderHash : function() {
        return  {
                  yield: (this.legacy ? this.body : "") + this.renderChildren(),
                  rootAttrs : this.listAttributes()
                };
      },

      renderChildren: function(prefix, suffix) {
        if(this.legacy) { //older style table
          return Table.__super__.renderChildren();
        }

        // HTML5 style table
        return new Component([
          strap({
            tag: 'thead',
            children: this.head
          }),
          strap({
            tag: 'tfoot',
            children: this.foot
          }),
          strap({
            tag: 'tbody',
            children: this.body
          })
        ]).render();
      },

      template: strap.generateSimpleTemplate("table")
    },
    /** @lends Table */
    {
      klass: "Table"
    });

    //aliases
Table.prototype.add = Table.prototype.push;
