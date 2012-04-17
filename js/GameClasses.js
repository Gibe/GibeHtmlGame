function Square(type) {
  switch (type) {
    case "square":
      this.image = "/images/square.jpg";
      this.isAccessible = true;
      break;
    case "wall":
      this.image = "/images/wall.jpg";
      this.isAccessible = false;
      break;
  }
  this.type = type;
  this.x = 0;
  this.y = 0;
}

var mapSquares = [
  ['wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall']
];

var Map = {
  squares: new Array(),
  load: function (squares) {
    for (var i = 0; i < squares.length; i++) {
      for (var j = 0; j < squares[i].length; j++) {
        squares[i][j] = new Square(squares[i][j]);
        squares[i][j].x = i;
        squares[i][j].y = j;
      }
    }
  },
  needsRefresh: true
}

var game = {
  init: function() {

  },
  Square: {
    init: function() {

    }
  }
};

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas, context;

init();
animate();

function init() {

  canvas = document.createElement( 'canvas' );
  canvas.width = 256;
  canvas.height = 256;

  context = canvas.getContext( '2d' );

  if(document.body != null){
    document.body.appendChild( canvas );
  }
  else{
    alert('!');
  }

}

function animate() {
  requestAnimFrame( animate );
  draw();
}

function draw() {

  var time = new Date().getTime() * 0.002;
  var x = Math.sin( time ) * 96 + 128;
  var y = Math.cos( time * 0.9 ) * 96 + 128;

  context.fillStyle = 'rgb(245,245,245)';
  context.fillRect( 0, 0, 255, 255 );

  context.fillStyle = 'rgb(255,0,0)';
  context.beginPath();
  context.arc( x, y, 10, 0, Math.PI * 2, true );
  context.closePath();
  context.fill();

}