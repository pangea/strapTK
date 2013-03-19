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
      template: _.template("<table id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></table>")
    }),
    TableRow = Panel.extend({
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
      template: _.template("<tr id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></tr>")
    }),
    TableCell = Panel.extend({ template : _.template("<td id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></td>") }),
    TableHeader = Panel.extend({ template : _.template("<th id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>><%= yield %></th>") });

    //aliases
Table.prototype.add = Table.prototype.push;
TableRow.prototype.add = TableRow.prototype.push;
