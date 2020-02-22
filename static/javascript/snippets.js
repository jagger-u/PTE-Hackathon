// 1. Generate circle
var circle = L.circle([46.065113321255014, 18.235266933441162], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 0
}).addTo(mymap);

// 2. Key event listener
document.addEventListener("keydown", function(e){
  if(e.key == 'q') {	
    var r = 0;
    function expand() {
      r = r + 50;
      circle.setRadius(r);
      if( r < 1000 ){
        setTimeout(expand, 20);
      }
    }
    expand();
  }
  if(e.key == 'w') {	
    var r = circle.getRadius();
    function expand() {
      r = r - 50;
      circle.setRadius(r);
      if( r > 0 ){
        setTimeout(expand, 20);
      }
    }
    expand();
  }
});


// 3. Ajax call
function loadData(){
	var http = new XMLHttpRequest();

	http.open('GET', '/coordinates.json', true);
	http.send();

	http.onload = function() {
		var ourData = JSON.parse(http.responseText);
		L.geoJSON(ourData).addTo(mymap);
	};
}



// 4. Feature group
var circleMarkers2 = [];
var coordinates = [
  [46.067133321255014, 18.245266933441162],
  [46.065123321255014, 18.255266933441162],
  [46.065113321255014, 18.235266933441162]
]
coordinates.forEach(function(coords){
  var circle = L.circle(coords, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 300
  });
  circleMarkers2.push(circle);
});
document.addEventListener("keydown", function(e){
    if(e.key == 'm') {
      circleMarkers2.forEach(function(circle){
        var r = 0;
        function expand() {
          r = r + 50;
          circle.setRadius(r);
          if( r < 300 ){
            setTimeout(expand, 20);
          }
        }
        expand();
      });
    }
    if(e.key == 'n') {
      circleMarkers2.forEach(function(circle){
        var r = circle.getRadius();
        function expand() {
          r = r - 50;
          circle.setRadius(r);
          if( r > 0 ){
            setTimeout(expand, 20);
          }
        }
        expand();
      });
    }
});

var featureGroup = L.featureGroup(circleMarkers2).addTo(mymap);


// 5. Icon
var crowIcon = L.icon({
  iconUrl: 'crow2.png',
  iconAnchor: [32,74],
  popupAnchor: [0,-50]
});





// 6. Move. Translation.
document.addEventListener("keydown", function(e){
  var coordJumpDistance = 0.005;
  var coordJump = 0;
  var d = polygon.getLatLngs();
  if(e.key == 'a') {		
    function move() {
      if( coordJump < coordJumpDistance ){
        var newLatsLngs = [];
        coordJump = coordJump + 0.0003;
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
        coordJump = coordJump + 0.0003;
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
        coordJump = coordJump + 0.0003;
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
        coordJump = coordJump + 0.0003;
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

// 7. FAIL
document.addEventListener("keydown", function(e){

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  var coordJumpDistance = 40;
  var timer = 0;
  var X = 0, Y = 0;
  var d = polygon.getLatLngs();
  if(e.key == 'd') {
    var numDeltas = 100;
    var delay = 10;
    var i = 0;
    var deltaLat = [];
    var deltaLng = [];
    var result0 = [];
    var result1 = [];


    for (var i=0; i < d[0].length; i++) {
      result0.push((d[0][i].lat + 0.3)/numDeltas);
      result1.push((d[0][i].lng + 0.3)/numDeltas);
    }

    function transition(result0, result1) {
      for (var i=0; i < d[0].length; i++) {
        deltaLat.push((result0[i] - d[0][i].lat)/numDeltas);
        deltaLng.push((result1[i] - d[0][i].lng)/numDeltas);
      }
      moveMarker();
    }
    transition(result0, result1)
    function moveMarker(){
      newLatsLngs=[];
      for (var i=0; i < d[0].length; i++) {
        X = d[0][i].lat + deltaLat[i];
        Y = d[0][i].lng + deltaLng[i];
        console.log("Y:",Y);
        newLatsLngs.push([X, Y]);
      }
      polygon.setLatLngs(newLatsLngs);
      if (timer < 3){
        timer = timer + 1;
        console.log("SKD");
        setTimeout(moveMarker, 10);
      }
    }
    




    // var shiftX = getRndInteger(-1,1)*0.0001;		
    // var shiftY = getRndInteger(-1,1)*0.0001;		
    // function move() {
    //   if( timer < coordJumpDistance){
    // 		timer++;
    // 		var newLatsLngs = [];
    // 		X = X + shiftX;
    // 		Y = Y + shiftY;
    // 		for (var i=0; i < d[0].length; i++) {
    // 			newLatsLngs.push([d[0][i].lat + X, d[0][i].lng + Y]);
    // 		}
    //     polygon.setLatLngs(newLatsLngs);
    //     setTimeout(move, 20);
    //   }
    // }
    // move();
  }
  
});






	// city_pecs = [46.076133321255014,18.225266933441162];
	// mymap = setup(city_pecs,14);
	// jsonPath = 'static/data/pecs_coordinates.json';