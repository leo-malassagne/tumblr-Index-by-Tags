var by = function (method, order) {
	
	var factor = 1,
		methods;
	if (order === 'incresing') {
		factor = -1;
	}
	methods = {
		alpha: function (a, b){
			return factor * b.title.localeCompare(a.title);
		},
		nbPages: function (a, b){
			return factor * (b.nbPages - a.nbPages);
		},
		date: function (a, b){
			return factor * (b.date - a.date);
		}
	};
	return methods[method];
}

function getData (options, data, callback) {
	
	var ready = false;
	var settings = jQuery.extend({
			numPosts: 50, 
			maxPosts: 400,
			// if somesite.tumblr.com is your blog, then 'somesite' will be the username
			username: false,
			// this is _NOT_ your login password, but the password you specified in your
			// blog settings!
			password: false
		}, options),
		postsList = [],
		tagsSeen = {},
		postsTotal = 0,
		postsCount = 0,
		tag = '', 
		i = 0;

	function requestPosts() {
		jQuery.ajax({
			url: settings.url + '/api/read/json/?num=' + settings.numPosts + '&start=' + postsCount + '&callback=?',
			dataType: 'JSON',
			username: settings.username || false,
			password: settings.password || false,
			success: selectData,
			error: function() {console.log('unable to query tag list.'); }
		});
	}
	
	function selectData(response) {
		var selected = undefined,
			name = '',
			title = '',
			doc = {},
			index = -1,
			tempCount = 0,
			i;
		response.posts.forEach (function (post) {
			if (post.tags && post.tags.length) {
				var selected = post.tags.filter(function(tag){
					return tag.startsWith(settings.filter);
				});
				for (i = 0; i < selected.length; i++) {
					title = selected[i].slice(settings.filter.length);
					tempCount = 1;
					index = postsList.findIndex(function(post){
						return post.title === title;
					});
					if (index === -1) {
						index = postsList.length;
						postsList.push({
							title: title,
							nbPages: 0
						});
					}
					if (settings.overwrite || postsList[index].nbPages === 0) {
						for (name in settings.dataSet){
							if (typeof settings.dataSet[name] == 'function') {
								postsList[index][name] = settings.dataSet[name](post);
							} else {
								postsList[index][name] = post[settings.dataSet[name]];
							}
						}
					}
					postsList[index].nbPages++;
				}
			}
		});

		// test if we need to fire up another request..
		postsTotal = response.posts.length || 0;
		if (postsCount < Math.min(postsTotal,  settings.maxPosts)) {
			postsCount += 50;
			requestPosts();
		}
		else {
			if (settings.sortBy){
				postsList.sort(by(settings.sortBy,settings.sortingOrder));
			}
			data = {
				filter: settings.filter,
				blog: settings.url,
				posts: postsList,
				sortedBy: settings.sortBy || 'date',
				order: settings.sortingOrder || 'decresing'
			};
			callback(data);
		}
	}
	requestPosts();
}