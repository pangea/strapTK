var home = new Viewport({
      root: "#home",
      children: [
        new Panel({
          classes: ["main"],
          children: [
            new Panel({
              classes: ["content", "well"],
              children: [
                new PageHeader({
                  header: "Getting Strap'd In",
                  level: 2,
                  body: "or Why you should use Strap'd"
                }),
                new P("Do you write a lot of JavaScript but hate writing HTML?  Do you like Bootstrap?  Do you want your job as a Web Developer to be easier?<br/>If you answered 'Yes' to most of those, chances are, you'll <em>love</em> getting Strap'd in."),
                new HR(),
                new P("Strap'd ToolKit was designed by a JS and Ruby developer with the goals to make a rapid prototyping framework.  The slowest thing, in my experience, when prototyping, is writing the markup and styling.  By using Bootstrap, you remove 80-90% of the style overhead.  Using jQuery and Lo-Dash removes 30-60% of your front end JavaScript overhead.  Before Strap'd, nothing really set out to remove markup overhead for the developer."),
                new P("A quick look at the source for this page will show that the entire thing was built with Strap'd.  Compare the written source (it's all in the head) with the compiled markup.  Try writing all that by hand!  It takes a while."),
                new HR(),
                new PageHeader({
                  header: "Asset Pipeline",
                  level: 2,
                  body: "or Things soon to be Strap'd in"
                }),
                new List({
                  id: "todo-list",
                  children: [
                    new Icon({
                      type: "double-angle-right",
                      body: "<strong>Helpers for all basic HTML markup!</strong> (Not just Bootstrap components)"
                    }),
                    new Icon({
                      type: "double-angle-right",
                      body: "<strong>Sourcable components.</strong>  Attach API driven data sources to your components and watch them update in real time!"
                    }),
                    new Icon({
                      type: "double-angle-right",
                      body: "<strong>Graphing and Plotting!</strong>  Everyone loves a little statistics."
                    }),
                    new Icon({
                      type: "double-angle-right",
                      body: "<strong>Drag and Drop Components.</strong>  Don't like where that header is?  Move it!"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });