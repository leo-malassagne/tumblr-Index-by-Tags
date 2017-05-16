function tumblrMap (container) {
	var $ = document;
	container.id = "map";
	container.style.height = "480px";
	return function (data) {
		container.innerHTML = "";
		var map = L.map(
			"map",
			{
				center: [0, 0],
				zoom: 1,
				minZoom: 1
			})
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
			),
			entry,
			coords = [];
		
		for (index in data.entries) {
			console.log(data.entries);
			entry = data.entries[index];
			coords = entry.title.split(';').map(function(elt){
				return elt/100;
			});
			console.log(coords);
			current = $.createElement("A");
			current.setAttribute("href", data.blog + "/tagged/" + entry.location);
			current.setAttribute("title", entry.title);
			L.marker(coords)
			.bindPopup(
				L.popup()
				.setContent(current)
			)
			.addTo(map);
			
			elmt = $.createElement("DIV");
			elmt.className = "entry";
			current.appendChild(elmt);
			current = elmt;
			
			elmt = $.createElement("IMG");
			elmt.className = 'entry-thumbnail';
			elmt.setAttribute("src", entry.pic);
			elmt.style.width = '200px';
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