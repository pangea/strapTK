var FormSelect = Panel.extend({
      template : _.template("<select id='<%= rootID %>' class='<%= rootClasses %>' <%= rootAttrs %>> <%= yield %> </select>")
    },{
      klass : "FormSelect"
    }),

    SelectOption = Panel.extend({
      initialize : function(args) {
        SelectOption.__super__.initialize.call(this, args);

        this.setDefaultValue(this.body, "value");
      },

      template : _.template("<option <%= rootAttrs %>> <%= yield %> </option>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "value");
      }
    }, {
      klass : "SelectOption"
    }),

    OptGroup = Panel.extend({
      initialize : function(args) {
        OptGroup.__super__.initialize.call(this, args);

        this.setDefaultValue("", "label");
      },

      template : _.template("<optgroup <%= rootAttrs %>> <%= yield %> </optgroup>"),

      listAttributes : function() {
        return FormSelect.__super__.listAttributes.call(this, "label");
      }
    });