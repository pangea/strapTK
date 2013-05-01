/* Sprocket Manifest
 *= require Panel
 */
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

      template: strap.generateSimpleTemplate("table")
    },{
      klass: "Table"
    });

    //aliases
Table.prototype.add = Table.prototype.push;
