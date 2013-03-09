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
                new Panel({
                  body: "<strong>Constructor</strong> arguments: attributes, options",
                  children: [
                    new Table({
                      children: [
                        new Row({
                          classes: ["table-header"],
                          children: [
                            new Panel({
                              body: "Attribute",
                              span: 2
                            }),
                            new Panel({
                              body: "Type",
                              span: 2
                            }),
                            new Raw("Description")
                          ]
                        }),
                        new Row({
                          children: [
                            new Panel({
                              body: "<code>children</code>",
                              span: 2
                            }),
                            new Panel({
                              body: "<strong>[Array<(#render)>]</strong>",
                              span: 2
                            }),
                            new Raw("this component's children.  Any object that responds to render can be the child of a Component.  Default: []")
                          ]
                        }),
                        new Row({
                          children: [
                            new Panel({
                              body: "<code>childPrefix</code>",
                              span: 2
                            }),
                            new Panel({
                              body: "<strong>[String]</strong>",
                              span: 2
                            }),
                            new Raw("a string to prepend to the render of each child")
                          ]
                        }),
                        new Row({
                          children: [
                            new Panel({
                              body: "<code>childSuffix</code>",
                              span: 2
                            }),
                            new Panel({
                              body: "<strong>[String]</strong>",
                              span: 2
                            }),
                            new Raw(" a string to append to the render of each child")
                          ]
                        })
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