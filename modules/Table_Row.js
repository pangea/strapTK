/* Sprocket Manifest
 *= require Panel
 */
var TableRow = Panel.extend({
      initialize: function(args) {
        TableRow.__super__.initialize.call(this, args);

        _.each(this.children, this.throwUnlessCell); //make sure all children are table cells
      },

      push: function(component) {
        this.throwUnlessCell(component);
        TableRow.__super__.push.call(this, component);
      },

      unshift: function(component) {
        this.throwUnlessCell(component);
        TableRow.__super__.unshift.call(this, component);
      },

      insert: function(component, index) {
        this.throwUnlessCell(component);
        TableRow.__super__.insert.apply(this, arguments);
      },

      throwUnlessCell: function(cell) {
        if(cell instanceof TableCell || cell instanceof TableHeader) { return; }

        throw new TypeError("Rows can only have Cells as children");
      },

      template: strap.generateSimpleTemplate("tr")
    },{
      klass: "TableRow"
    });

// aliases
TableRow.prototype.add = TableRow.prototype.push;