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
$('#tumblrTagCloud').tumblrTagCloud({url: 'http://username.tumblr.com'});
// or if jquery is set to noConflict
jQuery('#tumblrTagCloud').tumblrTagCloud({url: 'http://username.tumblr.com'});
```

You can also specify how many posts should be processed and in which chunks those should be gathered by invoking:

```js
jQuery('#tumblrTagCloud').tumblrTagCloud({
  url: 'http://username.tumblr.com',
  maxPosts: 200,
  numPosts: 20
});
```

If your Tumblr is password protected you might want to utilize username and password as well.

```js
jQuery('#tumblrTagCloud').tumblrTagCloud({
  url: 'http://username.tumblr.com',
  maxPosts: 200,
  numPosts: 20,
  username: 'somesite',
  password: 'thepassword'
});
```

To avoid any complaints, please checkout the documentation for username and password in the parameters
listing, just below this paragraph.

## Parameters ##

### url ###

Specifies the URL of your Tumblr site from which the tag cloud should be generated.

### maxPosts ###

__Default: 400__

Specifies the amount of posts that should be retrieved and processed to populate the tag cloud.

### numPosts ###

__Default: 50__

Specifies how many posts on each turn should be requested from the Tumblr API.

### password ###

__Default: false__

Specifies the password that should be used to query the posts from the Tumblr API.

__NOTE__:

This is __NOT__ your login password, but the password that you specified in your blog settings
(Password protect this blog) and should be treated as any other password; with utmost care or
in the words of the Dog Brothers: 'Protect yourself at all times'.

### username ###

__Default: false__

Specifies the username that should be used to query the posts from the Tumblr API. The username
to give here, might differ from your login username. If your password protected tumblr
is http://somesite.tumblr.com then username should be 'somesite'.

## Bugs ##

Report 'em here or fork the plugin and fix 'em.

## Copyright & License ##

Copyright (C) 2012 Sascha Rudolph <sascharenerudolph@gmail.com>

Licensed under the BSD 3-Clause License
