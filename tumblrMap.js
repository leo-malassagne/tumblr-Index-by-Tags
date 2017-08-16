function generateMap (blogURL, posts, options) {
	
	var $ = document,
		root = $.createElement("DIV"),
		data =  extractData(posts, {
			filter: 'coords:',
			dataSet:{
				location: function(post){
					var loc;
					for (tag of post.tags) {
						if (tag.startsWith("location:")) {
							loc = tag.substr(9);
						}
					}
					return loc;
				},
				date: function(post){return Date.parse(post.date);},
				pic: "photo-url-500"
			},
			overwrite: true
		}),
		map,
		entry,
		coords = [];
	map = L.map("map", options)
	.addLayer(
		L.tileLayer(
			'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVrbm8iLCJhIjoiY2l3NTY0czBsMDBtcjJ0czUzYWxwM3QwdyJ9.K3NGw5w8p_FbeEhRepBL1w',
			{
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA, Imagery © <a href="http://mapbox.com">Mapbox',
				maxZoom: 18,
				id: 'lekno',
				accessToken: 'pk.eyJ1IjoibGVrbm8iLCJhIjoiY2l3NTY0czBsMDBtcjJ0czUzYWxwM3QwdyJ9.K3NGw5w8p_FbeEhRepBL1w'
			}
		)
	);
	
	for (index in data) {
		console.log(data);
		entry = data[index];
		coords = entry.title.split(';');
		console.log(coords);
		current = $.createElement("A");
		current.setAttribute("href", blogURL + "/tagged/" + entry.location + "/page/" + entry.nbPages);
		current.setAttribute("title", entry.title);
		L.marker(coords)
		.bindPopup(
			L.popup()
			.setContent(current)
		)
		.addTo(map);
		
		elmt = $.createElement("IMG");
		elmt.className = 'entry-thumbnail';
		elmt.setAttribute("src", entry.pic);
		current.appendChild(elmt);
		
		elmt = $.createElement("DIV");
		elmt.className = "entry-title";
		current.appendChild(elmt);
		current = elmt;
		
		elmt = $.createElement("H2");
		elmt.appendChild($.createTextNode(entry.location));
		current.appendChild(elmt);
	}
	return root;
}
	