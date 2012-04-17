function Square(type) {
  switch (type) {
    case "square":
      
      this.imageReady = false;
      this.image = new Image();
      this.image.onload = function () {
          this.imageReady = true;
      };
      this.image.src = "images/square.png";
      this.isAccessible = true;
    break;
    case "wall":
      this.imageReady = false;
      this.image = new Image();
      this.image.onload = function () {
          this.imageReady = true;
      };
      this.image.src = "images/wall.png";      
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

/*var Map = {
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
}*/

function Map() {
  this.squares = [];
  this.load = function (sqs) {

    for (var i = 0; i < sqs.length; i++) {
      this.squares[i] = [];
      for (var j = 0; j < sqs[i].length; j++) {
        this.squares[i][j] = new Square(sqs[i][j]);
        this.squares[i][j].x = i;
        this.squares[i][j].y = j;
      }
    }
    
  }
  
  this.needsRefresh = true;
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
var boardDrawReady = 0;

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

}

function animate() {
  requestAnimFrame( animate );
  draw();
}


function draw() {
/*
  if(!boardDrawReady){
    var map = new Map();
    map.load(mapSquares);
  
    var i, j;
    for(i=0; i<map.squares.length; i++){
  
      for(j=0; j<map.squares[i].length; j++){
        context.drawImage(map.squares[i][j].image, j*48, i*48);
      }
    }
  
    boardDrawReady = 1;
  }
*/
}