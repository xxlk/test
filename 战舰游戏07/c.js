var view = {
  displayMessage:function(msg){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit:function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class","hit");
  },
  displayMiss:function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class","miss");
  }
};

view.displayMessage("Tap tap, is this thing on");

var model = {
  boardSize:7,
  numShips:3,
  shipLength:3,
  shipSunk:0,
  ships:[
    {locations:[0,0,0], hits:["","",""]},
    {locations:[0,0,0], hits:["","",""]},
    {locations:[0,0,0], hits:["","",""]}],
  fire: function (guess) {
    for (var i = 0;this.numShips;i++) {
      var ship = this.ships[i];
      locations = ship.locations;
      var index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.shipSunk(ship)){
          view.displayMessage("You sank my battleship!");
          this.shipSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  isSunk:function(ship0){
    for (var i = 0;i < this.shipLength; i++){
      if (ship.hits[i] !=="hit"){
        return false
      }
    }
    return true;
  },
  generateShipLocations: function () {
    var locations;
    for (var i = 0; i < this.numShips; i++){
      do {
        locations = this.generateship();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip: function() {
    var direction = Math.floor(Math.random()*2);
    var row,col;
    if (direction === 1) {
      row = Math.floor(Math.random()*this.boardSize);
      col = Math.floor(Math.random()*(this.boardSize - this.shipLength))
    } else {
      row = Math.floor(Math.random()*(this.boardSize-this.shipLength));
      col = Math.floor(Math.random()*this.boardSize);
    }
    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1){
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
  },
  collision: function(locations){
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >=0) {
          return true;
        }
      }
    }
    return false;
  }
};

function parseGuess(guess) {
  var alphabet = ["A","B","C","D","E","F","G"];
  if (guess === null ||guess.length !== 2) {
    alert ("Oops,please enter a letter and a number on the board.");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);
    if(isNaN(row) || isNaN (column)){
      alert ("Oops,that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize){
      alert("Oops,that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
};

var controller = {
  guess = 0,
  processGuess: function (guess) {
    var locations = parseGuess(guess);
    if (location){
      this.guesses++;
      var hit = model.fire (location);
      if (hit && model.shipSunk ===model.numShips){
        view.displayMessage("You sank all my bottleships, in"+this.guess + "guesses");
      }
    }
  }
};

function handleFireBotton(){
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value="";
};

function init(){
  var fireButton = document.getElementById("fireButton");
  handleFireBotton.onclick = handleFireBotton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleFirePress;
  model.generateShipLocations();
};

function handleFirePress(e){
  var fireButton = document.getElementById ("fireBotton");
  if (e.keyCode === 13){
    fireButton.click();
    return false;
  }
};
