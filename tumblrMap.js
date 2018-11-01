function generateMap (blogURL, posts, options) {
	
	var $ = document,
		root = $.getElementById("map"),
		data,
		map,
		entry,
		coords = [];
		
	if (typeof extractData === "undefined") {
		root.className = "error";
		root.innerHTML = "<strong>Impossible d'afficher la carte :</strong> <em>Extracteur de données indisponible.</em>";
	}
	else if (typeof L === "undefined") {
		root.className = "error";
		root.innerHTML = "<strong>Impossible d'afficher la carte :</strong> <em>Leaflet indisponible.</em>";
	}
	else {
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
		});
		if (!data || !data.entries) {
			root.className = "error";
			root.innerHTML = "<strong>Impossible d'afficher la carte :</strong> <em>Données manquantes.</em>";
		}
		else {
			var leaf = L.icon(options.marker);
			map = L.map("map", options.map)
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
			for (entry of data) {
				coords = entry.title.split(';');
				console.log(entry);
				if (coords.length !== 2 || isNaN(parseInt(coords[0])) || isNaN(parseInt(coords[1]))) {
					console.error("Invalid coordinate format.");
				}
				else {
					console.log( coords);
					current = $.createElement("A");
					current.setAttribute("href", blogURL + "/tagged/" + entry.location + "/page/" + entry.nbPages);
					current.setAttribute("title", entry.title);
					L.marker(coords, {icon: leaf})
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
			}
		}
	}
}
	