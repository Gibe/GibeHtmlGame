var mapSquares = [
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
];

var imagesLoaded = 0;

var squareImage = new Image();
squareImage.onload = function () { imagesLoaded++ };
squareImage.src = "images/square.png";
var wallImage = new Image();
wallImage.onload = function () { imagesLoaded++ };
wallImage.src = "images/wall.png";
var playerImage = new Image();
playerImage.onload = function () { imagesLoaded++ };
playerImage.src = "images/player.png";

function Square() {
  this.type = "";
  this.imageReady = false;
  this.x = 0;
  this.y = 0;
  this.init = function (squareType) {
    switch (squareType) {
      case "square":
        this.image = squareImage;
        this.isAccessible = true;
        break;
      case "wall":
        this.image = wallImage;
        this.isAccessible = false;
        break;
    }
    this.type = squareType
    this.imageReady = true;
  };
}

function Map() {
  this.squares = [];
  this.load = function (sqs) {
    for (var i = 0; i < sqs.length; i++) {
      this.squares[i] = [];
      for (var j = 0; j < sqs[i].length; j++) {
        this.squares[i][j] = new Square();
        this.squares[i][j].init(sqs[i][j]);
        this.squares[i][j].x = i;
        this.squares[i][j].y = j;
      }
    }
  }
  this.isReady = function () {
    var ready = true;
    for (var i = 0; i < this.squares.length; i++) {
      for (var j = 0; j < this.squares[i].length; j++) {
        ready = ready && this.squares[i][j].imageReady;
        console.log("ready " + i + " " + j + " " + this.squares[i][j].imageReady);
      }
    }
    return ready;
  }
  this.squareAccessible = function (x, y) {
    return this.squares[x][y].isAccessible;
  }
  this.needsRefresh = true;
}

function Player() {
  this.image = null;
  this.square = null;
  this.x = -1;
  this.y = -1;
  this.init = function () {
    this.image = playerImage;
  }
}

function Game() {
  this.map = null;
  this.playerCanvas = null;
  this.playerContext = null;
  this.mapCanvas = null;
  this.mapContext = null;
  this.ready = false;
  this.player = null;

  this.init = function () {
    this.map = new Map();
    this.map.load(mapSquares);

    this.player = new Player();
    this.player.init();
    this.player.x = 5;
    this.player.y = 5;
    
    this.mapCanvas = document.createElement('canvas');
    this.mapCanvas.width = 48 * this.map.squares[0].length;
    this.mapCanvas.height = 48 * this.map.squares.length;
    this.mapContext = this.mapCanvas.getContext('2d');

    this.playerCanvas = document.createElement('canvas');
    this.playerCanvas.width = 48 * this.map.squares[0].length;
    this.playerCanvas.height = 48 * this.map.squares.length;
    this.playerContext = this.playerCanvas.getContext('2d');

    this.ready = true;
  };
  this.loop = function () {
    if (!this.ready || !this.map.isReady()) {
      return;
    }
    if (this.map.needsRefresh) {
      this.drawMap();
    }
    
    // Clear the canvas    
    this.playerContext.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);

    this.playerContext.drawImage(this.player.image, (this.player.x) * 48, (this.player.y) * 48);
  };
  this.drawMap = function () {
    for (var i = 0; i < this.map.squares.length; i++) {
      for (var j = 0; j < this.map.squares[i].length; j++) {
        this.mapContext.drawImage(this.map.squares[i][j].image, j * 48, i * 48);
      }
    }
    this.map.needsRefresh = false;
  }
}

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


var game = new Game();
function init() {
  game.init();
  if (document.body != null) {
    document.body.appendChild(game.mapCanvas);
    document.body.appendChild(game.playerCanvas);
  }
}

function animate() {
  requestAnimFrame(animate);
  if (imagesLoaded == 3) {
    game.loop();
  }
}

function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 38:  /* Up arrow was pressed */
      if (game.map.squareAccessible(game.player.x, game.player.y-1)) {
        game.player.y--;
      }
      break;
    case 40:  /* Down arrow was pressed */
      if (game.map.squareAccessible(game.player.x, game.player.y+1)) {
        game.player.y++;
      }
      break;
    case 37:  /* Left arrow was pressed */
      if (game.map.squareAccessible(game.player.x-1, game.player.y)) {
        game.player.x--;
      }
      break;
    case 39:  /* Right arrow was pressed */
      if (game.map.squareAccessible(game.player.x+1, game.player.y)) {
      game.player.x++;
      }
      break;
  }
}

window.addEventListener('keydown', doKeyDown, true);



init();
animate();


