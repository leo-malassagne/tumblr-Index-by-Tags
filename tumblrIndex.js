function generateIndex (blogURL, posts, options) {
	
	function createSortMenu (options) {
		var menu = $.createElement("DIV"),
			current,
			elmt,
			index;
		
		current = $.createElement("SPAN");
		current.className = "pad5";
		current.appendChild($.createTextNode('Trier par :'));
		menu.appendChild(current);
		
		current = $.createElement("SELECT");
		for	(index in options.methods) {
			elmt = $.createElement("OPTION");
			elmt.innerHTML = index;
			if (index === data.sortedBy) {
				elmt.setAttribute('selected', 'selected');
			}
			current.appendChild(elmt);
		}
		current.onchange = function(){
			var newGal;
			data.sortedBy = this.value;
			data.entries.sort(options.methods[data.sortedBy](options.order[data.order]));
			newGal = createGallery(data)
			root.replaceChild(newGal, gallery);
			gallery = newGal;
		};
		menu.appendChild(current);
		
		current = $.createElement("SPAN");
		current.className = "pad5";
		current.appendChild($.createTextNode('Ordre :'));
		menu.appendChild(current);
		
		current = $.createElement("SELECT");
		for	(index in options.order) {
			elmt = $.createElement("OPTION");
			elmt.innerHTML = index;
			if (index === data.order) {
				elmt.setAttribute('selected', 'selected');
			}
			current.appendChild(elmt);
		}
		current.onchange = function(){
			var newGal;
			data.order = this.value;
			data.entries.sort(options.methods[data.sortedBy](options.order[data.order]));
			newGal = createGallery(data)
			root.replaceChild(newGal, gallery);
			gallery = newGal;
		};
		menu.appendChild(current);
		menu.className = "sortMenu";
		return menu;
	}

	function createGallery(data) {
		var gal = $.createElement("DIV"),
			current,
			elmt,
			index,
			entry;
		for (index in data.entries) {
			entry = data.entries[index];
			
			current = $.createElement("A");
			current.setAttribute("href", blogURL + "/tagged/" + entry.title + "/page/" + entry.nbPages);
			current.setAttribute("title", entry.title);
			gal.appendChild(current);
			
			elmt = $.createElement("DIV");
			elmt.className = "entry";
			current.appendChild(elmt);
			current = elmt;
			
			elmt = $.createElement("IMG");
			elmt.className = 'entry-thumbnail';
			elmt.setAttribute("src", entry.pic);
			current.appendChild(elmt);
			
			elmt = $.createElement("DIV");
			elmt.className = "entry-title";
			current.appendChild(elmt);
			current = elmt;
			
			elmt = $.createElement("H2");
			elmt.appendChild($.createTextNode(entry.title));
			current.appendChild(elmt);
		}
		gal.className = "gallery";
		return gal;
	}
	
	var $ = document,
		root = $.createElement("DIV"),
		data;
	
	if (typeof extractData === "undefined") {
		root.className = "error";
		root.innerHTML = "<strong>Impossible d'afficher l'index :</strong> <em>Extracteur de données indisponible.</em>";
	}
	else {
		data = {
			entries: extractData(posts, {
				filter: 'id:',
				dataSet: {
					date: function(post){return Date.parse(post.date);},
					pic: "photo-url-500"
				},
				overwrite: true
			}),
			sortedBy: 'date',
			order: "decroissant"
		}
		if (!data || !data.entries) {
			root.className = "error";
			root.innerHTML = "<strong>Impossible d'afficher l'index :</strong> <em>Données manquantes.</em>";
		}
		else {
			sortMenu = createSortMenu(sortOptions);
			gallery = createGallery(data);
			root.id = "index";
			root.appendChild(sortMenu);
			root.appendChild(gallery);
		}
	}
	return root;
}