# Strap'd ToolKit

Strap'd ToolKit is a JavaScript framework for building sites with Bootstrap.  It handles construction and insertion of HTML as well as providing some easy methods of using Bootstrap's built-in element styling for typed elements (like buttons).  In the future, it will provide the means to attach data sources to objects that will affect the display of the object and will update with the data source.

## Using StrapTK
### Requirements
In order to use StrapTK, you'll need a few other libraries.
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/index.html) - While Strap'd doesn't directly interact with Bootstrap, it was built entirely for working with Bootstrap.
* [FontAwesome](https://github.com/FortAwesome/Font-Awesome) - For additional icons.  FontAwesome can be omitted at the expense of a number of icons provided by the Icon class.
* [jQuery](http://jquery.com/) - If you're not already using jQuery, I strongly recommend it.
* [Lo-Dash](http://lodash.com/) - This _can_ be substituted for Underscore, but you will encounter a errors when Lo-Dash's chaining syntax is used.

Once you have all those, you're ready to use Strap'd.

### Coding it up
Strap'd was designed for use by JavaScript developers that are sick of writing HTML (like me).  Strap'd requires some very minimal boilerplate to get set up and you can be up and running with a site using Strap'd in minutes.  <small>If you're a fan of Ruby, you'll find some handy HAML compilation code in the Rakefile that will trim your boilerplate down even farther!</small>

So, let's write some code!  We'll start with a simple example:
````javascript
new P("Look!  A paragraph with some text in it!");

// Renders to <p>Look! A paragraph with some text in it!</p>
````
It can be that simple.

Strap'd supports nesting via the ````children```` attribute.  Allowing you to make more complex objects and markup.
````javascript
new Panel({
  classes: "well",
  children: [
    new Header("Look here!"),
    new P("We could nest this further, but who wants to read that?")
  ]
});

/*  Renders to:
 *    <div class='well'>
 *      <h1>Look here!</h1>
 *      <p>We could nest this further but who wants to read that?</p>
 *    </div>
 */
````

This is all well and good, but you may have noticed that the last example had a bit more code to it than the resulting markup and didn't really make it that much easier to write.  Which is true, Strap'd isn't meant to make creating HTML shorter, per se, just easier to manage.  A good example of something with complex markup is Bootstrap's Carousel.
````javascript
new Carousel({
  id: "carousel",
  children: [
    new Img("http://placehold.it/350x150&text=Placeholder+Image"),
    new Img("http://placehold.it/350x150&text=Placeholder+Image"),
    new Img("http://placehold.it/350x150&text=Placeholder+Image"),
    new Img("http://placehold.it/350x150&text=Placeholder+Image")
  ]
});

/* Renders to:
 *  <div id='carousel' class='carousel slide'>
 *    <ol class='carousel-indicators'>
 *      <li data-slide-to='0' data-target='#carousel' classes='active'></li>
 *      <li data-slide-to='1' data-target='#carousel' ></li>
 *      <li data-slide-to='2' data-target='#carousel' ></li>
 *      <li data-slide-to='3' data-target='#carousel' ></li>
 *    </ol>
 *    <div class='carousel-inner'>
 *      <img src='http://placehold.it/350x150&text=Placeholder+Image' class='item active' />
 *      <img src='http://placehold.it/350x150&text=Placeholder+Image' class='item' />
 *      <img src='http://placehold.it/350x150&text=Placeholder+Image' class='item' />
 *      <img src='http://placehold.it/350x150&text=Placeholder+Image' class='item' />
 *    </div>
 *    <a class='carousel-control left' data-slide='prev' href='#carousel'>&lsaquo;</a>
 *    <a class='carousel-control right' data-slide='next' href='#carousel'>&rsaquo;</a>
 *  </div>
 */
````

## Attributions
* [Pangea Real Estate](http://www.pangeare.com) for letting me work on Strap'd on their dime and providing an all around great place to work.
* [Bryan Zettler](https://github.com/BryIsAZombie) for his work on the original HAML/HTML templates used to create the Lo-Dash templates.
* [Chris Rankin](https://github.com/rankin) for the original idea and kicking my ass into actually doing it.
* [The jQuery team](http://jquery.com/) for making, arguably, the best DOM manipulation library ever.
* [The Lo-Dash team](http://lodash.com/) for their work on a nice API for manipulating JavaScript objects in a way that makes sense.
* [The Bootstrap team](http://twitter.github.com/bootstrap/index.html) for building an awesome framework to build on.
* [The FontAwesome team](https://github.com/FortAwesome/Font-Awesome) for making a damn cool icon pack that just works.
* [The Backbone team](http://backbonejs.org/) for being way smarter than I am and writing a pretty damn perfect <code>extend</code> function
* [Me (Chris Hall)](https://github.com/chall8908) for getting shit done.

Speaking of attributions to myself, if you're using Strap'd, let me know!  I'd love to hear from you.  While you're letting me know, you should let everyone ELSE know too.  A little blurb somewhere out of the way is all I ask.  If you're feeling especially generous, a link back here would be awesome!

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Strap'd ToolKit</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Pangea Real Estate</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.