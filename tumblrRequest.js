function dataLoader (options, callback) {

	var settings = {
			numPosts: 50, 
			maxPosts: 400,
			// if somesite.tumblr.com is your blog, then 'somesite' will be the username
			username: false,
			// this is _NOT_ your login password, but the password you specified in your
			// blog settings!
			password: false
		},
		entries = [],
		data = {},
		postsTotal = 0,
		postsCount = 0,
		tag = '', 
		i = 0;
		
	this.selectData = function (response) {
		var selected = undefined,
			length = 0,
			name = '',
			title = '',
			index = -1,
			tempCount = 0,
			i;
		response.posts.forEach (function (post) {
			if (post.tags && post.tags.length) {
				var selected = post.tags.filter(function(tag){
					return tag.startsWith(settings.filter);
				});
				length = selected.length
				for (i = 0; i < length; i++) {
					title = selected[i].slice(settings.filter.length);
					tempCount = 1;
					index = entries.findIndex(function(post){
						return post.title === title;
					});
					if (index === -1) {
						index = entries.length;
						entries.push({
							title: title,
							nbPages: 0
						});
					}
					if (settings.overwrite || entries[index].nbPages === 0) {
						for (name in settings.dataSet){
							if (typeof settings.dataSet[name] == 'function') {
								entries[index][name] = settings.dataSet[name](post);
							} else {
								entries[index][name] = post[settings.dataSet[name]];
							}
						}
					}
					entries[index].nbPages++;
				}
			}
		});

		// test if we need to fire up another request..
		postsTotal = response.posts.length || 0;
		if (postsCount < Math.min(postsTotal,  settings.maxPosts)) {
			postsCount += 50;
			this.requestPosts();
		}
		else {
			data = {
				filter: settings.filter,
				blog: settings.url,
				entries: entries,
			};
			console.log(JSON.stringify(data));
			callback(data);
		}
	}

	this.requestPosts = function() {
		var uid = (new Date()).getTime(),
        
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = settings.url + "/api/read/json/?num=" + settings.numPosts + "&start=" + postsCount + "&callback=dLoader.selectData";
		document.head.appendChild(script);
	}
	
	for (opt in options) {
		settings[opt] = options[opt];
	}
}
