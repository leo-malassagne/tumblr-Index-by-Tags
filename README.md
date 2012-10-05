## About ##

A simple jQuery plugin to generate a Tag Cloud based on your Tumblr posts.

## Installation ##

Just include the Javascript file in your Tumblr theme after you've included jQuery.

## Basic Usage ##

Create a placeholder div to put the tag cloud in (can be also on a separate page):

```html
<div id="tumblrTagCloud"></div>
```

Then when the div is ready in the DOM, which is usually on document ready, run the tumblrTagCloud function:

```js
$('#tumblrTagCloud').tumblrTagCloud();
// or if jquery is set to noConflict
jQuery('#tumblrTagCloud').tumblrTagCloud();
```

You can also specify how many posts should be processed and in which chunks those should be gathered by invoking:

```js
jQuery('#tumblrTagCloud').tumblrTagCloud({
  maxPosts: 200,
  numPosts: 20
});
```

## Parameters ##

### maxPosts ###

Specifies the amount of posts that should be retrieved and processed to populate the tag cloud.

### numPosts ###

Specifies the how many posts on each turn should be requested from the Tumblr API.

## Known Issues ##

* currently the plugin does not work with password protected tumblr sites.

## Bugs ##

Report 'em here or fork the plugin and fix 'em.

## Copyright & License ##

Copyright (C) 2012 Sascha Rudolph <sascharenerudolph@gmail.com>
Licensed under the BSD 3-Clause License
