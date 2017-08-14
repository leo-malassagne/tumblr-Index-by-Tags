function tumblrLoader (blogURL, callback, step, max) {

	var numPosts = step || 50, 
		maxPosts = max,
		data = [],
		postsCount = 0,
		post;
		
	this.agregate = function(response) {
		for (post of response.posts) {
			data.push(post);
		}
		postsCount += numPosts;
		if ((response.posts.length == numPosts) && (!maxPosts || (postsCount < maxPosts))) {
			console.log("postsCount: ", postsCount);
			this.load();
		}
		else {
			callback(data);
		}
	};
	
	this.load = function() {
		var uid = (new Date()).getTime(),
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = blogURL + "/api/read/json/?num=" + numPosts + "&start=" + postsCount + "&callback=tLoader.agregate";
		document.head.appendChild(script);
	};

}