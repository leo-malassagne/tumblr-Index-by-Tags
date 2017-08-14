function extractData(posts, settings) {
	var selected = undefined,
		entries = [],
		length = 0,
		name = '',
		title = '',
		index = -1,
		i;
			

	posts.forEach (function (post) {
		if (post.tags && post.tags.length) {
			var selected = post.tags.filter(function(tag){
				return tag.startsWith(settings.filter);
			});
			length = selected.length
			for (i = 0; i < length; i++) {
				title = selected[i].slice(settings.filter.length);
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
	return entries;
	
}