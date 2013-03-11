var api = new Viewport({
      root: "#api",
      children: [
        new Panel({
          classes: ["main"],
          children: [
            new Panel({
              classes: ["content", "well"],
              children: [
                new PageHeader({
                  header: "API Docs",
                  level: 2,
                  body: "or How does this thing work, anyways?"
                }),
                new HR(),
                new PageHeader({
                  header: "Component",
                  level: 3,
                  body: "One object to rule them all!"
                }),
                new P("Component is the base class for Strap'd.  Nearly all other objects extend it or something else that extends it.  It provides all the base functionality required for an object to manage and render its children and defines the interface for nearly everything.  Components have no templates and only know how to render their children."),
                new Raw("<small>The exceptions to the 'nearly all' being the <code>Raw</code> and <code>HorizontalRule</code> objects."),
                new HR(),
                new P({
                  body: "<strong>Constructor</strong> arguments: attributes, options",
                  classes: ["lead"]
                }),
                new Table({
                  children: [
                    new Row({
                      children: [
                        new TableHeader("Attribute"),
                        new TableHeader("Type"),
                        new TableHeader("Default"),
                        new TableHeader("Description")
                      ]
                    }),
                    new Row({
                      children: [
                        new TableCell("<code>children</code>"),
                        new TableCell("<strong>[Array<(#render)>]</strong>"),
                        new TableCell("<strong>[]</strong>"),
                        new TableCell("this component's children.  Any object that responds to render can be the child of a Component.")
                      ]
                    }),
                    new Row({
                      children: [
                        new TableCell("<code>childPrefix</code>"),
                        new TableCell("<strong>[String]</strong>"),
                        new TableCell('<strong>""</strong>'),
                        new TableCell("a string to prepend to the render of each child")
                      ]
                    }),
                    new Row({
                      children: [
                        new TableCell("<code>childSuffix</code>"),
                        new TableCell("<strong>[String]</strong>"),
                        new TableCell('<strong>""</strong>'),
                        new TableCell(" a string to append to the render of each child")
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });