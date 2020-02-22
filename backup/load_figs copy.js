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
function loadPolygon(jsonPath){
	var http = new XMLHttpRequest();

	http.open('GET', jsonPath, true);
	http.send();

	http.onload = function() {
		var ourData = JSON.parse(http.responseText);
		for (var data of ourData.features){
			var coords = data.geometry.coordinates;
			var polygon = L.polygon(coords).addTo(mymap);
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



