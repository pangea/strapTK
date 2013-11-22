/* Sprocket Manifest
 *= require Panel
 */
var TableRow = Panel.extend(
    /** @lends TableRow# */
    {
      initialize: function(args) {
        TableRow.__super__.initialize.call(this, args);

        this.children = _.map(this.children, this.throwUnlessCell, this); //make sure all children are table cells
      },

      push: function(component) {
        component = this.throwUnlessCell(component);
        TableRow.__super__.push.call(this, component);
      },

      unshift: function(component) {
        component = this.throwUnlessCell(component);
        TableRow.__super__.unshift.call(this, component);
      },

      insert: function(component, index) {
        component = this.throwUnlessCell(component);
        TableRow.__super__.insert.apply(this, arguments);
      },

      throwUnlessCell: function(cell) {
        cell = this.checkIfRenderable(cell);
        if(cell instanceof TableCell || cell instanceof TableHeader) { return cell; }

        throw new TypeError("Rows can only have Cells as children");
      },

      template: strap.generateSimpleTemplate("tr")
    },
    /** @lends TableRow */
    {
      klass: "TableRow"
    });

// aliases
TableRow.prototype.add = TableRow.prototype.push;
