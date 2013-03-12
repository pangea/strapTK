var api = new Viewport({
      root: "#api",
      children: [
        new Panel({
          classes: ["main", "well"],
          children: [
            new PageHeader({
              header: "API Docs",
              level: 2,
              body: "or How does this thing work, anyways?"
            }),
            new P("I've tried my best throughout this documentation to not assume your level of competency with JavaScript.  Because of this, you may encounter warnings or other errata that seem obvious to you.  Speaking of, you will see the following alerts:"),
            new Alert("<strong>Danger, Will Robinson!</strong><br/>These alerts indicate potential pitfalls or other behavior that might not seem obvious."),
            new Alert({
              body: "<strong>Heads Up</strong><br/>These alerts indicate interesting or potentially useful bits of information.",
              type: "info"
            }),
            new P("Furthermore, the declaration of object methods has this format:"),
            new P({
              body: "<strong>Name of Method</strong> arguments: type_expected (list|of|types), [optional_argument] <small>alias: <em>list, of, aliases</em></small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Now that you know what you're looking at a bit better than you did before, let's get on with it!"),
            new HR(),
            new PageHeader({
              id: "component",
              header: "Component",
              level: 3,
              body: "One object to rule them all!"
            }),
            new P("Component is the base class for Strap'd.  Nearly all<sup>*</sup> other objects extend it or something else that extends it.  It provides all the base functionality required for an object to manage and render its children and defines the interface for nearly everything.  Components have no templates and only know how to render their children."),
            new Raw("<small>*The exceptions to the 'nearly all' being the <code>Raw</code> and <code>HorizontalRule</code> objects.</small>"),
            new HR(),
            new P({
              id: "component-constructor",
              body: "<strong>Constructor</strong> arguments: attributes (Object|Array), [options]",
              classes: ["lead", "function-declaration"]
            }),
            new P("All keys passed into the Component constructor in the <code>attributes</code> object are applied to the created component.  This allows a great deal of flexability to Components, but also a bit of danger <small class='muted'>(see below)</small>.  If passed an array, it will be used as the list of children for the created Component."),
            new P("The <code>options</code> argument is passed directly to the <code>initialize</code> function of the component."),
            new Table([
              new TableRow([
                new TableHeader("Attribute"),
                new TableHeader("Type"),
                new TableHeader("Default"),
                new TableHeader("Description")
              ]),
              new TableRow([
                new TableCell("<code>children</code>"),
                new TableCell("<strong>Array<(#render)></strong>"),
                new TableCell("<strong>[]</strong>"),
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
            ]),
            new Alert("<strong>Be Aware</strong><br/>Because the constructor for Components applies all keys supplied in the attributes object directly to the created Component, you can accidentally overwrite exiting Object or Component methods that can cause your Components to behave erratically."),
            new Alert({
              body: "<strong>Of Note</strong><br/>No current subclass of Component uses the supplied <code>options</code> argument.",
              type: "info"
            }),
            new HR(),
            new P({
              id: "component-push",
              body: "<strong>push</strong> arguments: component <small>alias: <em>add</em></small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Adds a child to the end of the list of children."),
            new Alert("<strong>IMPORTANT</strong><br/>This function does not check if the added component already exists in the list of children.")
          ]
        })
      ]
    });