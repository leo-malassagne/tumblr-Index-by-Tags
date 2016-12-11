function tumblrIndex (container) {
	return function(postsList){
		jQuery(container).empty();
		var sortSelect = jQuery('<select>')
			.change(function(){
				postsList.posts.sort(by(jQuery(this).val(),postsList.order));
				postsList.sortedBy = jQuery(this).val();
				tumblrIndex(container)(postsList);
			})
			.append(
				jQuery('<option>')
				.attr('value', 'alpha')
				.html('ordre alphabétique')
			)
			.append(
				jQuery('<option>')
				.attr('value', 'date')
				.html('date')
			)
			.append(
				jQuery('<option>')
				.attr('value', 'nbPages')
				.html('nombre de pages')
			);
			
			orderSelect = jQuery('<select>')
			.change(function(){
				postsList.posts.sort(by(postsList.sortedBy,jQuery(this).val()));
				postsList.order = jQuery(this).val();
				tumblrIndex(container)(postsList);
			})
			.append(
				jQuery('<option>')
				.attr('value', 'incresing')
				.html('croissant')
			)
			.append(
				jQuery('<option>')
				.attr('value', 'decresing')
				.html('decroissant')
			);
			
		sortSelect.children("[value='" + postsList.sortedBy + "']").attr('selected', 'selected');
		orderSelect.children("[value='" + postsList.order + "']").attr('selected', 'selected');

		jQuery(container)
		.append(
			jQuery('<form>')
			.append(
				jQuery('<span>')
				.html('Trier par:')
			)
			.append(sortSelect)
			.append(
				jQuery('<span>')
				.html('Par ordre:')
			)
			.append(orderSelect)
		);
		jQuery.each(postsList.posts, function(idx, t) {
			jQuery(container)
			.append(
				jQuery('<a>')
				.attr({
					href: postsList.blog + '/tagged/' + postsList.filter + t.title,
					title: t.title
				})
				.append(
					jQuery('<div>')
					.attr({
						class: 'gallery-wrapper'
						
					})
					.append(
						jQuery('<img/>')
						.attr({
							src: t.pic,
							class: 'gallery-pic'
						})
						.css('top', Math.max(0,159-t.ratio*100)+'px')
					)
					.append(
						jQuery('<div>')
						.attr({
							class: 'gallery-title',
						})
						.append(
							jQuery('<h2>')
								.html(t.title)
						)
					)
				)
			)
		});
	}
}