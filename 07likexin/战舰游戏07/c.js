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
}
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss ("25");
view.displayHit ("26");
view.displayMessage("Tap tap, is this thing on");
var model = {
  boardSize:7,
  numShips:3,
  shipLength:3,
  shipSunk:0,
  ships:[
    {locations:["06","16","26"], hits:["","",""]},
    {locations:["32","33","34"], hits:["","",""]},
    {locations:["10","11","12"], hits:["","",""]}],
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
  inSunk:function(ship0){
    for (var i = 0;i < this.shipLength; i++){
      if (ship.hits[i] !=="hit"){
        return false
      }
    }
    return true;
  }
};
function parseGuess(guess){
  var alphabet = ["A","B","C","D","E","F","G"];
  if (guess === null ||guess.length !== 2){
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
}
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
}
function init(){
  var fireButton = document.getElementById("fireButton");
  handleFireBotton.onclick = handleFireBotton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleFirePress;
}
  