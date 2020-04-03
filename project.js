var player1=prompt("Player One: Enter your Name, you will be Blue");
var player1Color= 'rgb(86,151,255)';

var player2=prompt("Player Two: Enter your Name, you will be Red");
var player2Color= 'rgb(237,45,73)';

var game_on=true;
var table=$('table tr');

function reportWin(rowNum, colNum){
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

//Change the colour of the button
function changeColor(rowIndex, colIndex, color){
  //Grab a particulat cell and change the color
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

//Report back to current colour of the button
function returnColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex){
  var colorReport=returnColor(5,colIndex);
  console.log(colorReport);
  for (var row = 5; row > -1; row--) {
    colorReport=returnColor(row,colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row
    }
  }
}

//Chcek to see if 4 inpts are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
}

//Check for horizontal wins
function horizontalWinCheck(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
        console.log('horiz');
        reportWin(row,col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

//Check for vertical wins
function verticalWinCheck(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        console.log('vertical');
        reportWin(row,col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

//Check for diagonal wins
function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
        console.log('diag');
        reportWin(row,col);
        return true;
      }
      else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
        console.log('diag');
        reportWin(row,col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}


//Game end
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}

//Start with player one
var currentPlayer=1;
var currentName=player1;
var currentColor=player1Color;


//Start with player one
$('h3').text(player1+" it is your turn, pick a column to drop in!")


$('.board button').on('click',function(){

  //Recognize what column was chosen
  var col= $(this).closest("td").index();

//Get back bottom available row to change
  var bottomAvail = checkBottom(col);
  console.log(bottomAvail)

  //Drop the chip in that column at the bottolAvail Row
  changeColor(bottomAvail,col,currentColor);

//Check for a win or a tie
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    gameEnd(currentName);
  }

  //If no win or tie, continue to next player
  currentPlayer=currentPlayer * -1;

  //Re-check who the next player is.
  if(currentPlayer===1){
    currentName=player1;
    $('h3').text(currentName+" it is your turn, please pick a column to drop your blue chip.")
    currentColor=player1Color;
  }
  else{
    currentName=player2;
    $('h3').text(currentName+" it is your turn, please pick a column to drop your red chip.")
    currentColor=player2Color;
  }
})
