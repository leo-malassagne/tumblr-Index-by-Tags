/*
 * Copyright (C) 2012 Sascha Rudolph
 * Licensed under the BSD 3-Clause License
 * https://github.com/eremit/jquery-tumblr-tagcloud
 */
(function($) {
  $.fn.tumblrTagCloud = function(options) {
  
    var settings = $.extend({
      numPosts: 50, 
      maxPosts: 400
    }, options), 
      $this = null,
      tags = [], 
      posts = [], 
      postsTotal = 0, 
      postsCount = 0,
      tagCounts = {}, 
      tagList = {},
      tag = '', 
      linkTag = null, 
      i;
  
    function requestTags() {
      $.ajax({
        url: settings.url + '/api/read?num=' + settings.numPosts + '&start=' + settings.postCount, 
        success: processResponse, 
        error: function() { $this.append('<span>Unable to query tag list.</span>>'); }, 
        dataType: 'xml'
      });
    }

    function processResponse(data) {
      tags = data.getElementsByTagName('tag');
      posts = data.getElementsByTagName('posts');
      postsTotal = posts[0].getAttribute('total') - 0;

      // extract and count tags
      for (i = 0; i < tags.length; i++) {
        tag = tags[i].textContent.replace(' ',  '');
        if (tagCounts[tag]) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
          tagList[tag] = tags[i].textContent;
        }
      }

      // test if we need to fire up another request..
      if (postsCount < Math.min(postsTotal,  settings.maxPosts)) {
        postsCount += 50;
        requestTags();
      
      // generate output
      } else {
        renderTags();
      }
    }

    function renderTags() {
      $.each(tagCounts, function(tag, count) {
        linkTag = $('<a>')
          .attr({
            href: '/tagged/' + tagList[tag], 
            title: tagList[tag] + ' [' + count + ']'
          })
          .css('font-size', (count+8) + 'pt').
          html(tagList[tag]);
        $this.append(linkTag);
      });
    }

    return this.each(function() {
      $this = $(this);
      requestTags();
    });
  };
})(jQuery);
