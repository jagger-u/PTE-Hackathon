function loadCircles(jsonPath, jsonColor, jsonFill, jsonOpacity, jsonRadius){
	var http = new XMLHttpRequest();

	http.open('GET', jsonPath, true);
	http.send();

	http.onload = function() {
		var ourData = JSON.parse(http.responseText);
		jsonCircles = [];
		morphRate = jsonRadius/20;
		for (var data of ourData.features){
			var coords = data.geometry.coordinates;
			var circle = L.circle(coords,{
				color: jsonColor,
				fillColor: jsonFill,
				fillOpacity: jsonOpacity,
				radius: jsonRadius,
				weight: 0
			}).addTo(mymap);
			jsonCircles.push(circle);
		}
		var featureGroup = L.featureGroup(jsonCircles).addTo(mymap);
		document.addEventListener("keydown", function(e){
			if(e.key == 'k') {
				jsonCircles.forEach(function(circle){
					var r = circle.getRadius();
					function expand() {
						if( r < jsonRadius ){
							r = r + morphRate;
							circle.setRadius(r);
							setTimeout(expand, 20);
						}
					}
					expand();
				});
			}
			if(e.key == 'l') {
				jsonCircles.forEach(function(circle){
					var r = circle.getRadius();
					function expand() {
						if( r > 0 ){
							r = r - morphRate;
							circle.setRadius(r);
							setTimeout(expand, 20);
						}
					}
					expand();
				});
			}
		});
	};
}
function loadMarker(jsonPath){
	var http = new XMLHttpRequest();

	http.open('GET', jsonPath, true);
	http.send();

	http.onload = function() {
		var ourData = JSON.parse(http.responseText);		
		for (var data of ourData.features){
			var coords = data.geometry.coordinates;
			var marker = L.marker(coords).addTo(mymap);
			var pop_school = new L.Popup({ autoClose: false, closeOnClick: false })
			.setContent("\"ABC\" NGO");
			marker.bindPopup(pop_school).openPopup();
		}
	};
}
function loadCustom(jsonPath){
	var http = new XMLHttpRequest();

	http.open('GET', jsonPath, true);
	http.send();

	http.onload = function() {


		var greenIcon = L.icon({
			iconUrl: 'static/images/leaf.png',
			iconSize:     [50, 50], // size of the icon
			iconAnchor:   [22, 94], // poi	nt of the icon which will correspond to marker's location
			popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});


		var ourData = JSON.parse(http.responseText);
		for (var data of ourData.features){
			var coords = data.geometry.coordinates;
			var marker = L.marker(
				coords, 
				{icon: greenIcon}
				).addTo(mymap);
		}
	};
}
function loadHospital(jsonPath){
	var http = new XMLHttpRequest();

	http.open('GET', jsonPath, true);
	http.send();

	http.onload = function() {


		var hospitalIcon = L.icon({
			iconUrl: 'static/images/hospital.svg',
			iconSize:     [50, 50], // size of the icon
			iconAnchor:   [22, 94], // poi	nt of the icon which will correspond to marker's location
			popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});


		var ourData = JSON.parse(http.responseText);
		for (var data of ourData.features){
			var coords = data.geometry.coordinates;
			var marker = L.marker(
				coords.reverse(), 
				{icon: hospitalIcon}
				).addTo(mymap);
			var pop_school = new L.Popup({ autoClose: false, closeOnClick: false })
			.setContent('<img width="100px;" src="static/images/board.svg">');
			marker.bindPopup(pop_school);
		}
	};
}


function loadPolygon(jsonPath){
	var http = new XMLHttpRequest();

	http.open('GET', jsonPath, true);
	http.send();

	http.onload = function() {
		var ourData = JSON.parse(http.responseText);
		for (var data of ourData.features){
			var coords = data.geometry.coordinates;
			var polygon = L.polygon(coords).addTo(mymap)
			.bindPopup('<b>Riverside cleaning - By RiVeRa <br> 20 people<b>')
			.openPopup();
		}
		document.addEventListener("keydown", function(e){
			var coordJumpDistance = 0.005;
			var coordJump = 0;
			var rate = 0.001;
			var d = polygon.getLatLngs();
			if(e.key == 'a') {		
				function move() {
					if( coordJump < coordJumpDistance ){
						var newLatsLngs = [];
						coordJump = coordJump + rate;
						for (var i=0; i < d[0].length; i++) {
							newLatsLngs.push([d[0][i].lat, d[0][i].lng - coordJump]);
						}
						polygon.setLatLngs(newLatsLngs);
						setTimeout(move, 20);
					}
				}
				move();
			}
			if(e.key == 'w') {		
				function move() {
					if( coordJump < coordJumpDistance ){
						var newLatsLngs = [];
						coordJump = coordJump + rate;
						for (var i=0; i < d[0].length; i++) {
							newLatsLngs.push([d[0][i].lat + coordJump, d[0][i].lng]);
						}
						polygon.setLatLngs(newLatsLngs);
						setTimeout(move, 20);
					}
				}
				move();
			}
			if(e.key == 's') {		
				function move() {
					if( coordJump < coordJumpDistance ){
						var newLatsLngs = [];
						coordJump = coordJump + rate;
						for (var i=0; i < d[0].length; i++) {
							newLatsLngs.push([d[0][i].lat - coordJump, d[0][i].lng]);
						}
						polygon.setLatLngs(newLatsLngs);
						setTimeout(move, 20);
					}
				}
				move();
			}
			if(e.key == 'd') {		
				function move() {
					if( coordJump < coordJumpDistance ){
						var newLatsLngs = [];
						coordJump = coordJump + rate;
						for (var i=0; i < d[0].length; i++) {
							newLatsLngs.push([d[0][i].lat, d[0][i].lng + coordJump]);
						}
						polygon.setLatLngs(newLatsLngs);
						setTimeout(move, 20);
					}
				}
				move();
			}
		});
	};
}