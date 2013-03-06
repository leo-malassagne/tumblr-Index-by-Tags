/*
 * Copyright (C) 2012 Sascha Rudolph
 * Licensed under the BSD 3-Clause License
 * https://github.com/eremit/jquery-tumblr-tagcloud
 */
(function($) {
  $.fn.tumblrTagCloud = function(options) {
  
    var settings = $.extend({
      numPosts: 50, 
      maxPosts: 400,
      // alpha | random | bycount, anything else is intepreted as unsorted
      sortBy: false,
      // if somesite.tumblr.com is your blog, then 'somesite' will be the username
      username: false,
      // this is _NOT_ your login password, but the password you specified in your
      // blog settings!
      password: false
    }, options), 
      $this = null,
      tags = [],
      tagsList = [], 
      tagsSeen = {},
      tagsSorted = [],
      postsTotal = 0, 
      postsCount = 0,
      tag = '', 
      i;
  
    function requestTags() {
      $this.html('Loading... ');
      $.ajax({
        url: settings.url + '/api/read/json/?num=' + settings.numPosts + '&start=' + postsCount + '&callback=?',
        dataType: 'JSON',
        username: settings.username || false,
        password: settings.password || false,
        success: processResponse, 
        error: function() { $this.append('<span>unable to query tag list.</span>'); }
      });
    }

    function processResponse(data) {
      $this.empty();
      
      jQuery.each(data.posts, function(idx, post) {
        if (post.tags && post.tags.length) {
          for (i = 0; i < post.tags.length; i++) {
            tag = post.tags[i].replace(' ', '');
            if (tagsSeen[tag]) {
              tagsList[tagsSeen[tag]].count++;
            } else {
              tagsSeen[tag] = tagsList.length;
              tagsList.push({
                count: 1,
                normalized: tag,
                original: post.tags[i]
              });
            }
          }
        }
      });
            
      // test if we need to fire up another request..
      postsTotal = data.posts.length || 0;
      if (postsCount < Math.min(postsTotal,  settings.maxPosts)) {
        postsCount += 50;
        requestTags();
      
      // generate output
      } else {
        renderTags();
      }
    }

    function renderTags() {
    
      if (settings.sortBy === 'alpha') {
        tagsSorted = tagsList.sort(function(a, b) {
          return a.normalized.localeCompare(b.normalized);
        });
      } else if (settings.sortBy === 'bycount') {
        tagsSorted = tagsList.sort(function(a, b) {
          return b.count - a.count;
        });
      } else if (settings.sortBy === 'random') {
        tagsSorted = tagsList.sort(function(a, b) {
          return Math.round(Math.random()) - 0.5;
        });
      } else {
        $.extend(true, tagsSorted, tagsList);
      }
      
      $this.empty();
      jQuery.each(tagsSorted, function(idx, t) {
        $this.append(
          jQuery('<a>')
            .attr({
              href: settings.url + '/tagged/' + t.original,
              title: t.original + '[' + t.count + ']'
            })
            .css('font-size', 100 + t.count + '%')
            .html(t.original)
        );
      });
      
    }

    return this.each(function() {
      $this = $(this);
      requestTags();
    });
  };
})(jQuery);
