function tumblrIndex (container, sortOptions) {
	
	var $ = document,
		root = container;
		
	return function(data){
		var sortMenu,
			gallery,
			current,
			elmt,
			index = 0;
		
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
				elmt.appendChild($.createTextNode(index));
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
				elmt.appendChild($.createTextNode(index));
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
				current.setAttribute("href", data.blog + "/tagged/" + data.filter + entry.title);
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
			return gal
			;
		}
		
		data.sortedBy = 'date';
		data.order = "décroissant";
		sortMenu = createSortMenu(sortOptions);
		gallery = createGallery(data);
		root.innerHTML = "";
		root.appendChild(sortMenu);
		root.appendChild(gallery);
	}
}
