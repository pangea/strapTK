var api = new Viewport({
      root: "#api",
      children: [
        new Panel({
          classes: ["main", "well"],
          children: [
            //
            //                                                       Main Header
            //
            new PageHeader({
              header: "API Docs",
              level: 2,
              body: "or How does this thing work, anyways?"
            }),
            new HR(),
            //
            //                                                    Formatting Header
            //
            new PageHeader({
              header: "Formatting",
              level: 3,
              body: "or How do I read this thing?"
            }),
            new P("In order to facilitate the readability of this documentation, let's go over the formatting you'll encounter."),
            new P("Firstly, method declarations look like this:"),
            new P({
              body: "<strong>Name of Method</strong> arguments: type_expected (list|of|types), [optional_argument] <small><strong>Returns:</strong> typeOfReturn | Alias: <em>list, of, aliases</em> | <span>Throws:</span> potential, errors, thrown</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("After the method declaration will be a description of the method's action and any other relevant information.  After the description, you may see one or more alerts.  These alerts take the following forms:"),
            new Alert("<strong>Be Aware</strong><br/>These alerts indicate potential pitfalls or other behavior that might not seem obvious.  You should read these."),
            new Alert({
              body: "<strong>Of Note</strong><br/>These alerts indicate interesting or potentially useful bits of information.  You can usually ignore them.",
              type: "info"
            }),
            new Alert({
              body: "<strong>Under The Hood</strong><br/>These alerts contain tidbits about the code's function or implementation.  You can always ignore them.",
              type: "success"
            }),
            new P("I've tried my best throughout this documentation to not assume your level of competency with JavaScript.  Because of this, you may encounter warnings or other errata that seem obvious to you.  That said, a basic level of understanding is assumed."),
            new P("One last thing before we get started.  So that we're all on the same page, a bit of vocabulary:"),
            new Raw("<dl>"),
              new Raw("<dt>DOM</dt><dd>DOM stands for Document Object Model and is what is used to interact with a web page programmically.</dd>"),
              new Raw("<dt>Template</dt><dd>a template defines the base markup for a Component.</dd>"),
              new Raw("<dt>Render</dt><dd>In most contexts, the act of rendering refers to the compilation of markup.  Viewports go a step further by then inserting said markup into the DOM.</dd>"),
              new Raw("<dt>Chainable</dt><dd>a method that's 'chainable' is one that returns its parent object.  E.G. <code>Component.add(com1).add(com2)</code></dd>"),
            new Raw("</dl>"),
            new P("Now that you know what you're looking at a bit better than you did before, let's get on with it!"),
            new HR(),
            //
            //                                                  Component Documentation
            //
            new PageHeader({
              id: "component",
              header: "Component",
              level: 3,
              body: "One object to rule them all!"
            }),
            new P("Component is the base class for Strap'd.  Nearly all<sup>*</sup> other objects extend it or something else that extends it.  It provides all the base functionality required for an object to manage and render its children and defines the interface for nearly everything.  Components have no templates and only know how to render their children."),
            new Raw("<small>*The exceptions to the 'nearly all' being the <code>Raw</code> and <code>HorizontalRule</code> objects.</small>"),
            new HR(),
            //                                                        Constructor
            new P({
              id: "component-constructor",
              body: "<strong>Constructor</strong> arguments: attributes (Object|Array), [options]",
              classes: ["lead", "function-declaration"]
            }),
            new P("All keys passed into the Component constructor in the <code>attributes</code> object are applied to the created Component.  This allows a great deal of flexability to Components, but also a bit of danger <small class='muted'>(see below)</small>.  If passed an array, it will be used as the list of children for the created Component.  See the table below for a list of attributes defined and used by Components."),
            new P("The <code>options</code> argument is passed directly to the <code>initialize</code> function of the component."),
            new Table({
              body: "<caption>Defined Attributes</caption>",
              children: [
                new TableRow([
                  new TableHeader("Attribute"),
                  new TableHeader("Type"),
                  new TableHeader("Default"),
                  new TableHeader("Description")
                ]),
                new TableRow([
                  new TableCell("<code>children</code>"),
                  new TableCell("<strong>Array&lt;(#render)&gt;</strong>"),
                  new TableCell("<strong>[ ]</strong>"),
                  new TableCell("this component's children.  Any object that responds to render can be the child of a Component.")
                ]),
                new TableRow([
                  new TableCell("<code>childPrefix</code>"),
                  new TableCell("<strong>String</strong>"),
                  new TableCell('<strong>""</strong>'),
                  new TableCell("a string to prepend to the render of each child")
                ]),
                new TableRow([
                  new TableCell("<code>childSuffix</code>"),
                  new TableCell("<strong>String</strong>"),
                  new TableCell('<strong>""</strong>'),
                  new TableCell(" a string to append to the render of each child")
                ])
              ]
            }),
            new Alert("<strong>Be Aware</strong><br/>Because the constructor for Components applies all keys supplied in the attributes object directly to the created Component, you can accidentally overwrite existing Object or Component methods that can cause your Components to behave erratically."),
            new Alert({
              body: "<strong>Of Note</strong><br/>No current subclass of Component uses the supplied <code>options</code> argument.",
              type: "info"
            }),
            new HR(),
            //                                                       setDefaultValue
            new P({
              id: "component-setDefaultValue",
              body: "<strong>setDefaultValue</strong> arguments: value, attr1 (String)[, attr2 (String)[, attr3 (String)[, ...]]]",
              classes: ["lead", "function-declaration"]
            }),
            new P("Sets each of the given attribute's values to <code>value</code>, if no value has already been set.  Used internally by the <code>initialize</code> function to set values."),
            new Alert({
              body: "<strong>Under The Hood</strong><br/>Some logical gymnastics went into the creation of this function to ensure that each attribute has a unique value.  Have a look at the source to see how it works.  It's pretty cool.",
              type: "success"
            }),
            //                                                            Push
            new P({
              id: "component-push",
              body: "<strong>push</strong> arguments: component (#render) <small><strong>Returns:</strong> Component | Alias: <em>add</em></small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Adds a child to the end of the list of children.  This function is chainable."),
            new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
            new HR(),
            //                                                             Pop
            new P({
              id: "component-pop",
              body:"<strong>pop</strong><small><strong>Returns:</strong> Component | undefined</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Removes the last child from the list of children and returns it."),
            new HR(),
            //                                                           Unshift
            new P({
              id: "component-unshift",
              body: "<strong>unshift</strong> arguments: component (#render) <small><strong>Returns:</strong> Component</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Adds a child to the beginning of the list of children.  This function is chainable."),
            new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
            new HR(),
            //                                                            Shift
            new P({
              id: "component-shift",
              body:"<strong>shift</strong><small><strong>Returns:</strong> Component | undefined</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Removes the first child from the list of children and returns it."),
            new HR(),
            //                                                            Insert
            new P({
              id: "component-insert",
              body:"<strong>insert</strong> arguments: component (#render), [index (Integer)]<small><strong>Returns:</strong> Component</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Inserts <code>component</code> into the list of children at <code>index</code>.  If no index is supplied, <code>component</code> is added to the end of the list of children.  This function is chainable."),
            new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
            new HR(),
            //                                                            Remove
            new P({
              id: "component-remove",
              body:"<strong>remove</strong> arguments: [index (Integer)]<small><strong>Returns:</strong> Component | undefined</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Removes and returns the component at <code>index</code> from the list of children.  If no index is supplied, removes the last child."),
            new HR(),
            //                                                           Template
            new P({
              id: "component-template",
              body:"<strong>template</strong> arguments: data (Object)<small><strong>Returns:</strong> String</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("For Components, the <code>template</code> function just returns the <code>yield</code> property of <code>data</code>.  It's overridden by most subclasses to actually provide markup."),
            //                                                            Render
            new P({
              id: "component-render",
              body:"<strong>render</strong><small><strong>Returns:</strong> String</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Compiles the markup for this component.  By default, Components only know how to render their children and have no markup of their own."),
            new HR(),
            //
            // Viewport Documentation
            //
            new PageHeader({
              id: "viewport",
              header: "Viewport",
              level: 3,
              body: "extends Component"
            }),
            new P("The Viewport class provides the means to render Components to the screen.  This is the only class that interacts directly with the DOM."),
            new HR(),
            //                                                         Constructor
            new P({
              id: "viewport-constructor",
              body: "<strong>Constructor</strong> arguments: attributes (Object|Array), [options]",
              classes: ["lead", "function-declaration"]
            }),
            new P("In addition to the functionality of Component, Viewport defines an additional default attribute, root.  A Viewport's root can be any valid CSS selector or path."),
            new Table({
              body: "<caption>Defined Attributes</caption>",
              children: [
                new TableRow([
                  new TableHeader("Attribute"),
                  new TableHeader("Type"),
                  new TableHeader("Default"),
                  new TableHeader("Description")
                ]),
                new TableRow([
                  new TableCell("<code>root</code>"),
                  new TableCell("<strong>CSS Selector</strong>"),
                  new TableCell('<strong>"body"</strong>'),
                  new TableCell("The Viewport's root element.  Child markup is inserted into this element.")
                ])
              ]
            }),
            new HR(),
            //                                                            Render
            new P({
              id: "viewport-render",
              body: "<strong>render</strong>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Inserts the Viewport's children into the DOM."),
            new Alert({
              body: "<strong>Of Note</strong><br/>If the Viewport's root does not exist in the DOM, no action will be taken and no errors will be thrown.",
              type: "info"
            }),
            new HR(),
            //
            // Panel Documentation
            //
            new PageHeader({
              id: "panel",
              header: "Panel",
              level: 3,
              body: "extends Component.  AKA Div"
            }),
            new P("Panels are the default HTML element in Strap'd and nearly all markup generating classes extend it or something that extends it.  Panels provide methods and attributes unique to the DOM and should be your go-to when making your own objects.  Panels can render themselves and provide the most basic wrapper around content."),
            new HR(),
            //                                                          Constructor
            new P({
              id: "panel-constructor",
              body: "<strong>Constructor</strong> arguments: attributes (Object|Array|String), [options]",
              classes: ["lead", "function-declaration"]
            }),
            new P("On top of the attributes defined by Component, Panel defines some additional default attributes for use with the DOM <small class='muted'>(see below)</small>.  Further, the Panel constructor provides an additional method of creating objects.  If passed a string, it is used as the body of the new Panel."),
            new Table({
              body: "<caption>Defined Attributes</caption>",
              children: [
                new TableRow([
                  new TableHeader("Attribute"),
                  new TableHeader("Type"),
                  new TableHeader("Default"),
                  new TableHeader("Description")
                ]),
                new TableRow([
                  new TableCell("<code>id</code>"),
                  new TableCell("<strong>String</strong>"),
                  new TableCell('<strong>""</strong>'),
                  new TableCell("The CSS ID of this Panel.")
                ]),
                new TableRow([
                  new TableCell("<code>body</code>"),
                  new TableCell("<strong>String</strong>"),
                  new TableCell('<strong>""</strong>'),
                  new TableCell("A Panel's body is rendered before its children.")
                ]),
                new TableRow([
                  new TableCell("<code>classes</code>"),
                  new TableCell("<strong>Array&lt;String&gt;</strong>"),
                  new TableCell('<strong>[ ]</strong>'),
                  new TableCell("The CSS classes for this Panel")
                ]),
                new TableRow([
                  new TableCell("<code>attributes</code>"),
                  new TableCell("<strong>Array&lt;String&gt;</strong>"),
                  new TableCell('<strong>[ ]</strong>'),
                  new TableCell("The HTML Attributes of this Panel.")
                ])
              ]
            }),
            new Alert({
              body: "<strong>Of Note</strong><br/>A Panel's attributes can be used to set any valid HTML attribute.  Some subclasses of Panel add required information this way.",
              type: "info"
            }),
            new HR(),
            //                                                              Render
            new P({
              id: "panel-addClass",
              body: "<strong>addClass</strong> arguments: newClass (String), [newClass2 (String), [newClass3 (String), ...]]<small><strong>Returns:</strong> Panel</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Adds <the classes given to the list of classes, if they aren't already.  This method is chainable."),
            new HR(),
            //                                                            removeClass
            new P({
              id: "panel-removeClass",
              body: "<strong>removeClass</strong> arguments: oldClass (String), [oldClass2 (String), [oldClass3 (String), ...]]<small><strong>Returns:</strong> Panel</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Removes the classes given from the list of classes.  This method is chainable."),
            new HR(),
            //                                                             addClass
            new P({
              id: "panel-toggleClass",
              body: "<strong>toggleClass</strong> arguments: theClass, [theClass2 (String), [theClass3 (String), ...]] (String)<small><strong>Returns:</strong> Panel</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Adds or removes the classes given from the list of classes.  This method is chainable."),
            new HR(),
            //                                                            listClasses
            new P({
              id: "panel-listClasses",
              body: "<strong>listClasses</strong><small><strong>Returns:</strong> String</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Outputs the list of classes in a way that can be inserted into the DOM."),
            new HR(),
            //                                                           listAttributes
            new P({
              id: "panel-listAttributes",
              body: "<strong>listAttributes</strong><small><strong>Returns:</strong> String</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Outputs the list of attributes in a way that can be inserted into the DOM."),
            new HR()
          ]
        })
      ]
    });