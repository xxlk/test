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
    }
  }
}
  