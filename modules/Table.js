/* Sprocket Manifest
 *= require Panel
 */
var Table = Panel.extend(
    /** @lends Table# */
    {
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
        if(
            row instanceof TableRow ||
            row instanceof Source ||
            (row.tag && (row.tag == "thead" || row.tag == "tfoot"))
          ) { return; }

        throw new TypeError("Invalid child type: " + row.klass + ".  Must be either TableRow or Source.");
      },

      template: strap.generateSimpleTemplate("table")
    },
    /** @lends Table */
    {
      klass: "Table"
    });

    //aliases
Table.prototype.add = Table.prototype.push;
