function tumblrMap (container) {
	return function (postsList) {
		var map = L.map(container).setView([51.505, -0.09], 13);
		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVrbm8iLCJhIjoiY2l3NTY0czBsMDBtcjJ0czUzYWxwM3QwdyJ9.K3NGw5w8p_FbeEhRepBL1w', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA, Imagery © <a href="http://mapbox.com">Mapbox',
			maxZoom: 18,
			id: 'lekno',
			accessToken: 'pk.eyJ1IjoibGVrbm8iLCJhIjoiY2l3NTY0czBsMDBtcjJ0czUzYWxwM3QwdyJ9.K3NGw5w8p_FbeEhRepBL1w'
		}).addTo(map);
		jQuery.each(postsList.posts, function(idx, t) {
			L.marker(idx.split(';'))
			.bindPopup(
				L.popup()
				.setContent(
					jQuery('<a>')
					.attr({
						href: postsList.blog + '/tagged/' + postsList.filter + idx,
						title: idx
					})
					.append(
						jQuery('<div>')
						.attr({
							class: 'gallery-wrapper'
							
						})
						.css('width', '200px')
						.append(
							jQuery('<img/>')
							.attr({
								src: t.pic,
								class: 'gallery-pic'
							})
							.css('width', '200px')
						)
						.append(
							jQuery('<div>')
							.attr({
								class: 'gallery-title',
							})
							.append(
								jQuery('<h2>')
									.html(idx)
							)
						)
					)[0]
				)
			)
			.addTo(map)
		});
	}
}