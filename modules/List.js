var List = Panel.extend({
  initialize : function(args) {
    List.__super__.initialize.call(this, args);

    if(this.childPrefix === "") {
      this.childPrefix = "<li>";
    }
    if(this.childSuffix === "") {
      this.childSuffix = "</li>";
    }
  },

  template: _.template( "<ul id='{{= rootID }}' class='{{= rootClasses }}' {{= rootAttrs }}>"+
                          "{{= yield }}"+
                        "</ul>")
});