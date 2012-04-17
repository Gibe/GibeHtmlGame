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
