var abstractBadgeHeader = new PageHeader({
                            id: "abstractBadge",
                            header: "AbstractBadge",
                            level: 3,
                            body: "extends Panel"
                          }).render(),

    accordionHeader = new PageHeader({
                        id: "accordion",
                        header: "Accordion",
                        level: 3,
                        body: "extends Panel"
                      }).render(),

    alertHeader = new PageHeader({
                    id: "alert",
                    header: "Alert",
                    level: 3,
                    body: "extends Panel"
                  }).render(),

    badgeHeader = new PageHeader({
                    id: "badge",
                    header: "Badge",
                    level: 3,
                    body: "extends AbstractBadge"
                  }).render(),

    breadcrumbsHeader = new PageHeader({
                          id: "breadcrumbs",
                          header: "Breadcrumbs",
                          level: 3,
                          body: "extends Panel"
                        }).render(),

    buttonHeader = new PageHeader({
                          id: "button",
                          header: "Button",
                          level: 3,
                          body: "extends Link"
                        }).render(),

    buttonGroupHeader = new PageHeader({
                          id: "buttonGroup",
                          header: "ButtonGroup",
                          level: 3,
                          body: "extends Panel"
                        }).render(),

    buttonToolbarHeader = new PageHeader({
                            id: "buttonToolbar",
                            header: "ButtonToolbar",
                            level: 3,
                            body: "extends Panel"
                          }).render(),

    carouselHeader = new PageHeader({
                            id: "carousel",
                            header: "Carousel",
                            level: 3,
                            body: "extends Panel"
                          }).render(),

    contentRowHeader = new PageHeader({
                        id: "contentRow",
                        header: "ContentRow",
                        level: 3,
                        body: "extends Panel"
                      }).render(),

    componentHeader = new PageHeader({
                        id: "component",
                        header: "Component",
                        level: 3,
                        body: "One object to rule them all!"
                      }).render(),

    extendHeader = new PageHeader({
                        id: "extend",
                        header: "Extend",
                        level: 3,
                        body: "create new objects from old ones"
                      }).render(),

    panelHeader = new PageHeader({
                    id: "panel",
                    header: "Panel",
                    level: 3,
                    body: "extends Component."
                  }).render(),

    typifyHeader = new PageHeader({
                      id: "typify",
                      header: "Typify",
                      level: 3,
                      body: "adds Type awareness"
                    }).render(),

    viewportHeader = new PageHeader({
                        id: "viewport",
                        header: "Viewport",
                        level: 3,
                        body: "extends Component"
                      }).render(),

    api = new Viewport({
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
              body: "<strong>Name of Method</strong> arguments: typeExpected (list|of|types), [optionalArgument] <small><strong>Returns:</strong> typeOfReturn | Alias: <em>list, of, aliases</em> | <span>Throws:</span> potential, errors, thrown</small>",
              classes: ["lead", "function-declaration"]
            }),
            new P("Further, you may see the following syntax for types: #functionName.  This indicates that the passed object must have a method called <code>functionName</code>."),
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
              new Raw("<dt>DRY</dt><dd>DRY stands for Don't Repeat Yourself.  It's a good metric to code by.  It's usually used as an adjective (e.g. this code is DRY)."),
              new Raw("<dt>DOM</dt><dd>DOM stands for Document Object Model and is what is used to interact with a web page programmically.</dd>"),
              new Raw("<dt>Template</dt><dd>a template defines the base markup for a Component.</dd>"),
              new Raw("<dt>Render</dt><dd>In most contexts, the act of rendering refers to the compilation of markup.  Viewports go a step further by then inserting said markup into the DOM.</dd>"),
              new Raw("<dt>Chainable</dt><dd>a method that's 'chainable' is one that returns its parent object.  E.G. <code>Component.add(com1).add(com2)</code></dd>"),
            new Raw("</dl>"),
            new P("Now that you know what you're looking at a bit better than you did before, let's get on with it!"),
            new HR(),
            new PageHeader({
              header: "Class List",
              level: 2,
              body: "really, it's more of an Object List."
            }),
            //
            //                                                       Class List
            //
            new Accordion({
              id: "object-list",
              children: [
                //
                //                                            AbstractBadge Documentation
                //
                new Panel({
                  id: "abstractBadge-wrapper",
                  heading: abstractBadgeHeader,
                  children: [
                    new P("AbstractBadge is, as its name suggests, an abstract class.  It's extended by Badge and Label and only exists to keep the code DRY.  AbstractBadge is a type aware Component."),
                    new Raw("AbstractBadge defines the following types:"),
                    new List([
                      new Raw("success"),
                      new Raw("warning"),
                      new Raw("important"),
                      new Raw("info"),
                      new Raw("inverse")
                    ])
                  ]
                }),
                //
                //                                              Accordion Documentation
                //
                new Panel({
                  id: "accordion-wrapper",
                  heading: accordionHeader,
                  children: [
                    new P("Accordions '[display] collapsible content panels for presenting information in a limited amount of space.'  They're excelent for grouping content logically and displaying information in a controlled manner.  Properly constructed accordions keep information overload to a minimum while still providing easy access to all the data they contain.  All of the documentation for Strap'd is contained in Accordions."),
                    new HR(),
                    new P({
                      id: "accordion-renderChildren",
                      body: "<strong>renderChildren</strong>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Accordions overload renderChildren to properly construct the markup needed for each 'accordion group'.  Accordions do not respond to or use the <code>childPrefix</code> or <code>childSuffix</code> attributes.")
                  ]
                }),
                //
                //                                                Alert Documentation
                //
                new Panel({
                  id: "alert-wrapper",
                  heading: alertHeader,
                  children: [
                    new P("Alerts are used to bring attention to pieces of information.  You can see examples of Alerts sprinkled throughout this documentation.  Alerts are type aware Components."),
                    new Raw("Alerts can have the following types:"),
                    new List([
                      new Raw("error"),
                      new Raw("success"),
                      new Raw("info")
                    ]),
                    new P({
                      id: "alert-isBlock",
                      body: "<strong>isBlock</strong> arguments: [blocked (boolean)]<small><strong>Returns:</strong> Boolean</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("This method is used to set or unset the Alert as a 'block' which increases the padding and makes the Alert a little more prominent. If the optional <code>blocked</code> argument is ommitted, <code>isBlock</code> returns a boolean indicating if the Alert is blocked or not."),
                    new HR(),
                    new P({
                      id: "alert-setClosable",
                      body: "<strong>setClosable</strong> arguments: closable",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Provides an easy means of making an Alert closable.  If <code>closable</code> is true, this method adds a properly formatted CloseButton to the beginning of the list of children.  If <code>closable</code> is false, this method removes the first CloseButton found, if any."),
                    new Alert({
                      type: "success",
                      body: "<strong>Under the Hood</strong><br/>This method is, ultimately, just some syntatic sugar.  You can just as easily supply a child CloseButton when making the Alert and give it the attribute \"data-dismiss='alert'\"."
                    })
                  ]
                }),
                //
                //                                                Badge Documentation
                //
                new Panel({
                  id: "badge-wrapper",
                  heading: badgeHeader,
                  children: [
                    new P("Implementation of AbstractBadge.  Supplies the <code>base</code> 'badge', for use in typing.  This is a type aware Component."),
                    new P({
                      body: "Example: ",
                      children: [
                        new Badge({
                          body: ">:[",
                          type: "important"
                        })
                      ]
                    })
                  ]
                }),
                //
              //                                               Breadcrumbs Documentation
                //
                new Panel({
                  id: "breadcrumbs-wrapper",
                  heading: breadcrumbsHeader,
                  children: [
                    new P("Breadcrumbs provide a handy navigation interface when dealing with nested content.  The last element of a breadcrumb is normally the 'active' 'crumb'.  Each child of a breadcrumb is separated by a slash (/)."),
                    new P({
                      body: "Example: ",
                      children: [
                        new Breadcrumbs([
                          new Link("road"),
                          new Link("to"),
                          new Link("nowhere")
                        ])
                      ]
                    }),
                    new HR(),
                    //                                                    Render
                    new P({
                      id: "carousel-render",
                      body:"<strong>render</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Breadcrumbs define their own render fucntion to properly format their output.  Some additional processing goes into ensuring the correct placement of dividers.")
                  ]
                }),
                //
                //                                               Button Documentation
                //
                new Panel({
                  id: "button-wrapper",
                  heading: buttonHeader,
                  children: [
                    new P("A staple GUI element.  Buttons are a type aware Component."),
                    new P({
                      body: "Example: ",
                      children: [
                        new Button({
                          body: "Foo",
                          attributes: ["onclick='return false;'"]
                        })
                      ]
                    }),
                    new Raw("Buttons can have the following types:"),
                    new List([
                      new Raw("primary"),
                      new Raw("info"),
                      new Raw("success"),
                      new Raw("warning"),
                      new Raw("danger"),
                      new Raw("inverse"),
                      new Raw("link")
                    ])
                  ]
                }),
                //
                //                                             ButtonGroup Documentation
                //
                new Panel({
                  id: "buttonGroup-wrapper",
                  heading: buttonGroupHeader,
                  children: [
                    new P("ButtonGroups are a wrapper around buttons to group them logically and structurally.  They allow you to build simple menu bars or provide multiple choice options."),
                    new P({
                      body: "Example:",
                      children: [
                        new ButtonGroup([
                          new Button({
                            body: "Look",
                            attributes: ["onclick='return false;'", "data-toggle='buttons-radio'"]
                          }),
                          new Button({
                            body: "We're",
                            attributes: ["onclick='return false;'", "data-toggle='buttons-radio'"]
                          }),
                          new Button({
                            body: "Radio",
                            attributes: ["onclick='return false;'", "data-toggle='buttons-radio'"]
                          }),
                          new Button({
                            body: "Buttons",
                            attributes: ["onclick='return false;'", "data-toggle='buttons-radio'"]
                          })
                        ])
                      ]
                    })
                  ]
                }),
                //
                //                                            ButtonToolbar Documentation
                //
                new Panel({
                  id: "buttonToolbar-wrapper",
                  heading: buttonToolbarHeader,
                  children: [
                    new P("ButtonToolbars are a wrapper around ButtonGroups to group them logically and structurally.  They group ButtonGroups on a single line and allow for more complex grouping of options."),
                    new P({
                      body: "Example:",
                      children: [
                        new ButtonToolbar([
                          new ButtonGroup([
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "align-left"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "align-center"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "align-right"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "align-justify"
                                })
                              ]
                            })
                          ]),
                          new ButtonGroup([
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "indent-left"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "indent-right"
                                })
                              ]
                            })
                          ]),
                          new ButtonGroup([
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "font"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "bold"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "italic"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "strikethrough"
                                })
                              ]
                            }),
                            new Button({
                              attributes: ["onclick='return false;'"],
                              children: [
                                new Icon({
                                  type: "underline"
                                })
                              ]
                            })
                          ])
                        ])
                      ]
                    })
                  ]
                }),
                //
                //                                              Carousel Documentation
                //
                new Panel({
                  id: "carousel-wrapper",
                  heading: carouselHeader,
                  children: [
                    new P("Carousels provide a compact way of displaying graphical content.  Carousels are one of the more complicated elements, markup-wise."),
                    new P({
                      body: "Example:",
                      children: [
                        new Carousel({
                          id: "example-carousel",
                          children :[
                            new Panel([
                              new Image({src: "http://placehold.it/350x250&text=Content"}),
                              new Panel({
                                body: "<h4>Look ma!</h4>",
                                classes: ["carousel-caption"],
                                children: [
                                  new P("We've got a caption over this image.")
                                ]
                              })
                            ]),
                            new Panel([
                              new Image({src: "http://placehold.it/350x250&text=Content"}),
                              new Panel({
                                body: "<h4>Look ma!</h4>",
                                classes: ["carousel-caption"],
                                children: [
                                  new P("We've got a caption over this image.")
                                ]
                              })
                            ])
                          ]
                        })
                      ]
                    }),
                    new HR(),
                    //                                                Constructor
                    new P({
                      id: "carousel-constructor",
                      body: "<strong>Constructor</strong> arguments: [attributes (Object|Array), options]",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Carousel's define some additional default attributes used to generate its controls."),
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
                          new TableCell("<code>controls</code>"),
                          new TableCell("<strong>Boolean</strong>"),
                          new TableCell("<strong>true</strong>"),
                          new TableCell("Determines if the Carousel should render its controls.")
                        ]),
                        new TableRow([
                          new TableCell("<code>prevSymbol</code>"),
                          new TableCell("<strong>String</strong>"),
                          new TableCell("<strong>\"&amp;lsaquo;\"</strong>"),
                          new TableCell("This is the symbol to show on the 'previous' control button.")
                        ]),
                        new TableRow([
                          new TableCell("<code>nextSymbol</code>"),
                          new TableCell("<strong>String</strong>"),
                          new TableCell("<strong>\"&amp;rsaquo;\"</strong>"),
                          new TableCell("This is the symbol to show on the 'next' control button.")
                        ])
                      ]
                    }),
                    new HR(),
                    //                                                RenderChildren
                    new P({
                      id: "carousel-renderChildren",
                      body:"<strong>renderChildren</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Because of the slightly complex markup required for carousels, the <code>renderChildren</code> function is overridden to prevent the use of <code>childPrefix</code> and <code>childSuffix</code>."),
                    new HR(),
                    //                                                    Render
                    new P({
                      id: "carousel-render",
                      body:"<strong>render</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Carousels define their own render function to pass additional parameters to their templates.")
                  ]
                }),
                //
                //                                              ContentRow Documentation
                //
                new Panel({
                  id: "contentRow-wrapper",
                  heading: contentRowHeader,
                  children: [
                    new P("ContentRow provides an easy means to create Bootstrap's 'fluid-row'.  It overloads the child adding methods to ensure that no more than 12 children are active and correctly formats the wrapping elements to have the correct 'span' class.  It goes further by allowing child elements to specify their span width and fluidly assigns the remaining space to the other children."),
                    new HR(),
                    //                                                Constructor
                    new P({
                      id: "contentRow-constructor",
                      body: "<strong>Constructor</strong> arguments: [attributes (Object|Array), options]",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("ContentRow defines a new attribute, <code>maxChildren</code>, to help with child management."),
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
                        new TableCell("<code>maxChildren</code>"),
                        new TableCell("<strong>Integer</strong>"),
                        new TableCell("<strong>12</strong>"),
                        new TableCell("The maximum number of children the ContentRow can contain."),
                      ])
                    ]}),
                    new HR(),
                    //                                                    Push
                    new P({
                      id: "contentRow-push",
                      body: "<strong>push</strong> arguments: component (#render) <small><strong>Returns:</strong> Component | Alias: <em>add</em> | <span>Throws:</span> TooManyChildrenError, TypeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Extends Component.push to enforce the <code>maxChildren</code> limit.  Throws a TooManyChildrenError if you attempt to add a child to a ContentRow that is already at its maximum.  Throws TypeError if <code>component</code> doesn't have a member function called <code>render</code>.  This function is chainable."),
                    new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
                    new HR(),
                    //                                                   Unshift
                    new P({
                      id: "contentRow-unshift",
                      body: "<strong>unshift</strong> arguments: component (#render) <small><strong>Returns:</strong> Component | <span>Throws:</span> TooManyChildrenError, TypeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Extends Component.unshift to enforce the <code>maxChildren</code> limit.  Throws a TooManyChildrenError if you attempt to add a child to a ContentRow that is already at its maximum.  Throws TypeError if <code>component</code> doesn't have a member function called <code>render</code>.  This function is chainable."),
                    new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
                    new HR(),
                    //                                                    Insert
                    new P({
                      id: "contentRow-insert",
                      body:"<strong>insert</strong> arguments: component (#render), [index (Integer)]<small><strong>Returns:</strong> Component | <span>Throws:</span> TooManyChildrenError, TypeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Extends Component.insert to enforce the <code>maxChildren</code> limit.  Throws a TooManyChildrenError if you attempt to add a child to a ContentRow that is already at its maximum.  Throws TypeError if <code>component</code> doesn't have a member function called <code>render</code>.  This function is chainable."),
                    new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
                    new HR(),
                    //                                                RenderChildren
                    new P({
                      id: "contentRow-renderChildren",
                      body:"<strong>renderChildren</strong> arguments: [prefix (String), suffix (String)]<small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Calls the <code>render</code> method of each of this component's children and wraps the output with <code>prefix</code> and <code>suffix</code>.  If <code>prefix</code> or <code>suffix</code> are not supplied, <code>childPrefix</code> and <code>childSuffix</code> are used for the unsupplied value.  Additionally, this function processes the correct span of each child element and wraps the rendered output accordingly.  From the outside, you would first encounter this added wrapping, then the prefix/suffix markup, then the rendered child.")
                  ]
                }),
                //
                //                                              Component Documentation
                //
                new Panel({
                  id: "component-wrapper",
                  heading: componentHeader,
                  open: true,
                  children: [
                    new P("Component is the base class for Strap'd.  Nearly all<sup>*</sup> other objects extend it or something else that extends it.  It provides all the base functionality required for an object to manage and render its children and defines the interface for nearly everything.  Components have no templates and only know how to render their children."),
                    new Raw("<small>*The exceptions to the 'nearly all' being the <code>Raw</code> and <code>HorizontalRule</code> objects.</small>"),
                    new HR(),
                    //                                                Constructor
                    new P({
                      id: "component-constructor",
                      body: "<strong>Constructor</strong> arguments: [attributes (Object|Array), options]",
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
                      body: "<strong>Under The Hood</strong><br/>Although all attributes are applied in Component constructors, the default values for those constructors are defined in the <code>initialize</code> function <small class='muted'>(not listed)</small>."
                    }),
                    new Alert({
                      body: "<strong>Of Note</strong><br/>No current subclass of Component uses the supplied <code>options</code> argument.",
                      type: "info"
                    }),
                    new HR(),
                    //                                               setDefaultValue
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
                    new HR(),
                    //                                                    Push
                    new P({
                      id: "component-push",
                      body: "<strong>push</strong> arguments: component (#render) <small><strong>Returns:</strong> Component | Alias: <em>add</em> | <span>Throws:</span> TypeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Adds a child to the end of the list of children.  Throws TypeError if <code>component</code> doesn't have a member function called <code>render</code>.  This function is chainable."),
                    new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
                    new HR(),
                    //                                                     Pop
                    new P({
                      id: "component-pop",
                      body:"<strong>pop</strong><small><strong>Returns:</strong> Component | undefined</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Removes the last child from the list of children and returns it."),
                    new HR(),
                    //                                                   Unshift
                    new P({
                      id: "component-unshift",
                      body: "<strong>unshift</strong> arguments: component (#render) <small><strong>Returns:</strong> Component | <span>Throws:</span> TypeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Adds a child to the beginning of the list of children.  Throws TypeError if <code>component</code> doesn't have a member function called <code>render</code>.  This function is chainable."),
                    new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
                    new HR(),
                    //                                                    Shift
                    new P({
                      id: "component-shift",
                      body:"<strong>shift</strong><small><strong>Returns:</strong> Component | undefined</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Removes the first child from the list of children and returns it."),
                    new HR(),
                    //                                                    Insert
                    new P({
                      id: "component-insert",
                      body:"<strong>insert</strong> arguments: component (#render), [index (Integer)]<small><strong>Returns:</strong> Component | <span>Throws:</span> TypeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Inserts <code>component</code> into the list of children at <code>index</code>.  If no index is supplied, <code>component</code> is added to the end of the list of children.  Throws TypeError if <code>component</code> doesn't have a member function called <code>render</code>.  This function is chainable."),
                    new Alert("<strong>Be Aware</strong><br/>This function does not check if the added component already exists in the list of children."),
                    new HR(),
                    //                                                    Remove
                    new P({
                      id: "component-remove",
                      body:"<strong>remove</strong> arguments: [index (Integer)]<small><strong>Returns:</strong> Component | undefined</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Removes and returns the component at <code>index</code> from the list of children.  If no index is supplied, removes the last child."),
                    new HR(),
                    //                                                   Template
                    new P({
                      id: "component-template",
                      body:"<strong>template</strong> arguments: data (Object)<small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("For Components, the <code>template</code> function just returns the <code>yield</code> property of <code>data</code>.  It's overridden by most subclasses to actually provide markup."),
                    new HR(),
                    //                                                RenderChildren
                    new P({
                      id: "component-renderChildren",
                      body:"<strong>renderChildren</strong> arguments: [prefix (String), suffix (String)]<small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Calls the <code>render</code> method of each of this component's children and wraps the output with <code>prefix</code> and <code>suffix</code>.  If <code>prefix</code> or <code>suffix</code> are not supplied, <code>childPrefix</code> and <code>childSuffix</code> are used for the unsupplied value."),
                    new HR(),
                    //                                                    Render
                    new P({
                      id: "component-render",
                      body:"<strong>render</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Compiles the markup for this component.  By default, Components only know how to render their children and have no markup of their own."),
                    new HR(),
                    //                                                   toString
                    new P({
                      id: "component-toString",
                      body:"<strong>toString</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Overloads Object.toString() to return ")
                  ]
                }),
                //
                //                                                  Panel Documentation
                //
                new Panel({
                  id: "panel-wrapper",
                  heading: panelHeader,
                  children: [
                    new PageHeader({
                      header: "Alias: Div",
                      level: 4
                    }),
                    new P("Panels are the default HTML element in Strap'd and nearly all markup generating classes extend it or something that extends it.  Panels provide methods and attributes unique to the DOM and should be your go-to when making your own objects.  Panels can render themselves and provide the most basic wrapper around content."),
                    new HR(),
                    //                                                  Constructor
                    new P({
                      id: "panel-constructor",
                      body: "<strong>Constructor</strong> arguments: [attributes (Object|Array|String), options]",
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
                    //                                                     addClass
                    new P({
                      id: "panel-addClass",
                      body: "<strong>addClass</strong> arguments: newClass (String), [newClass2 (String), [newClass3 (String), ...]]<small><strong>Returns:</strong> Panel</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Adds <the classes given to the list of classes, if they aren't already.  This method is chainable."),
                    new HR(),
                    //                                                    removeClass
                    new P({
                      id: "panel-removeClass",
                      body: "<strong>removeClass</strong> arguments: oldClass (String), [oldClass2 (String), [oldClass3 (String), ...]]<small><strong>Returns:</strong> Panel</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Removes the classes given from the list of classes.  This method is chainable."),
                    new HR(),
                    //                                                    toggleClass
                    new P({
                      id: "panel-toggleClass",
                      body: "<strong>toggleClass</strong> arguments: theClass, [theClass2 (String), [theClass3 (String), ...]] (String)<small><strong>Returns:</strong> Panel</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Adds or removes the classes given from the list of classes.  This method is chainable."),
                    new HR(),
                    //                                                    listClasses
                    new P({
                      id: "panel-listClasses",
                      body: "<strong>listClasses</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Outputs the list of classes in a way that can be inserted into the DOM."),
                    new HR(),
                    //                                                   listAttributes
                    new P({
                      id: "panel-listAttributes",
                      body: "<strong>listAttributes</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Outputs the list of attributes in a way that can be inserted into the DOM."),
                    new HR(),
                    //                                                      template
                    new P({
                      id: "panel-template",
                      body: "<strong>template</strong> attributes: data (Object)<small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Returns the full markup for this Panel.  Most subclasses of Panel provide their own markup for their template, but they all function in the same fashion."),
                    new HR(),
                    //                                                       render
                    new P({
                      id: "panel-render",
                      body: "<strong>render</strong><small><strong>Returns:</strong> String</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Compiles the markup of this panel's children and prepends its <code>body</code>, if any.")
                  ]
                }),
                //
                //                                                Viewport Documentation
                //
                new Panel({
                  id: "viewport-wrapper",
                  heading: viewportHeader,
                  children: [
                    new P("The Viewport class provides the means to render Components to the screen.  This is the only class that interacts directly with the DOM."),
                    new HR(),
                    //                                                 Constructor
                    new P({
                      id: "viewport-constructor",
                      body: "<strong>Constructor</strong> arguments: [attributes (Object|Array), options]",
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
                    //                                                    Render
                    new P({
                      id: "viewport-render",
                      body: "<strong>render</strong>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Inserts the Viewport's children into the DOM."),
                    new Alert("<strong>Be Aware</strong><br/>If the Viewport's root does not exist in the DOM, no action will be taken and no errors will be thrown.")
                  ]
                })
              ]
            }),
            //
            //                                                     Utility Documentation
            //
            new PageHeader({
              header: "Utilities",
              level: 2,
              body: "extensions, addons, and helpers"
            }),
            new Accordion({
              id: "utilities",
              children: [
                //
                //                                                  Extend Documentation
                //
                new Panel({
                  id: "extend-wrapper",
                  heading: extendHeader,
                  children: [
                    new P("Unceremoniously torn from the chest of Backbone.js, the Extend function provides, easily, half the functionality of Strap'd.  For my own uses, I converted it into a standalone function and I've used it to generate Component's extend method and make a few custom errors."),
                    new HR(),
                    //                                                    Decorator
                    new P({
                      id: "extend-decorator",
                      body: "<strong>Extend</strong> arguments: parent (Object), [protoParams (Object), [staticParams (Object)]]<small><strong>Returns:</strong> Function</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("Extends <code>parent</code>, attaching <code>protoParams</code> to the new object's prototype and <code>staticParams</code> to the new object's constructor.  Adds a <code>__super__</code> static attribute to directly access <code>parent</code>'s prototype.")
                  ]
                }),
                //
                //                                                  Typify Documentation
                //
                new Panel({
                  id: "typify-wrapper",
                  heading: typifyHeader,
                  children: [
                    new P("Typify is a Component Decorator.  It adds type awareness to Compnents in a non-destructive way.  Typify is used in a few standard Components (e.g. Alert) to allow one Component to have multiple defined display states."),
                    //                                                    Decorator
                    new P({
                      id: "typify-decorator",
                      body: "<strong>Typify</strong> arguments: component (Component), [options (Object)]",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("This function modifies the given Component to be type aware.  It adds two default attributes (<code>base</code> and <code>type</code>) and an additional method <small class='muted'>(see below)</small>.  It also relies on an array of <code>types</code> to hold the valid values of <code>type</code>.  Typed Components express their types through their CSS classes.  Ergo, a Component with a <code>base</code> of 'foo' and a <code>type</code> of 'bar' would have the classes 'foo foo-bar'."),
                    new P("The optional <code>options</code> object can be used to set the <code>types</code>, <code>base</code>, and <code>type</code> attributes of <code>component</code>.  Alternatively, you can define these attributes before calling Typify."),
                    new HR(),
                    //                                                     setType
                    new P({
                      id: "typify-setType",
                      body: "<strong>setType</strong> arguments: [type (String)]<small><span>Throws:</span> RangeError</small>",
                      classes: ["lead", "function-declaration"]
                    }),
                    new P("This method does all the work for typed Components.  When called, setType clears the currently set type and, if provided, sets it to <code>type</code>.  If <code>type</code> does not exist in the Component's list of <code>types</code>, throws RangeError.")
                  ]
                })
              ]
            })
          ]
        })
      ]
    });