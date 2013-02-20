var x,y,z = [];
var ws;

// Support both the WebSocket and MozWebSocket objects
if ((typeof(WebSocket) == 'undefined') &&
    (typeof(MozWebSocket) != 'undefined')) {
  WebSocket = MozWebSocket;
}

init();

// Create the socket with event handlers
function init() {
  //Create and open the socket
  ws = new WebSocket("ws://localhost:6437/");
  
  // On successful connection
  ws.onopen = function(event) {
    //document.getElementById("main").style.visibility = "visible";
    //document.getElementById("connection").innerHTML = "WebSocket connection open!";
  };
  
  // On message received
  ws.onmessage = function(event) {
    var obj = JSON.parse(event.data);
    //var str = JSON.stringify(obj, undefined, 2);
    //document.getElementById("output").innerHTML = '<pre>' + str + '</pre>';
    //console.log(obj);
    var i;
    for (i = 0; i < obj.pointables.length; i++) {
      obj.pointables[i].tipPosition // array of 3 elements
    }
  };
  
  // On socket close
  ws.onclose = function(event) {
    ws = null;
    //document.getElementById("main").style.visibility = "hidden";
    //document.getElementById("connection").innerHTML = "WebSocket connection closed";
  }
  
  //On socket error
  ws.onerror = function(event) {
    alert("Received Leap error");
  };
}