var colors = ["blue", "green", "red", "yellow"];


function startGame() {
  closeConfirm();
  disCard = document.getElementById("discardPile");
  disCard.style.cursor = "default";
  disCard.onclick = null;
  disCard.style.backgroundColor = "#222222";
  disCard.innerHTML = "";
  disCard.style.backgroundImage = "url('images/start.gif')";
  
  var thisCard;
  for(var player = 1; player <= 2; player++){
    for(var card = 1; card <= 7; card++){
      thisCard = document.getElementById("p"+player+"Card"+card);
      thisCard.style.backgroundImage = "url(images/owl.jpg)";
      thisCard.innerHTML = "";
      thisCard.style.display = "flex"; 
    }
    while (document.getElementById("p"+player+"Card"+card)){
      console.log("p"+player+"Card"+card)
      document.getElementById("p"+player+"Hand").removeChild(document.getElementById("p"+player+"Card"+card));
      card++;
    }
  }
  
  setTimeout(function() { dealCard(1, 1); }, 500);
}

function dealCard(p, c){
  var thisCard, randNum, randColor;
  thisCard = document.getElementById("p"+p+"Card"+c);
  randNum = Math.floor(Math.random() * 10);
  randColor = Math.floor(Math.random() * 4);

  thisCard.style.backgroundImage = "none";
  thisCard.style.backgroundColor = colors[randColor];
  thisCard.innerHTML = "<span>"+randNum+"</span>";
  c++;
  if (c <= 7 && p <= 2){
    setTimeout(function() { dealCard(p, c); }, 250);
  } else if (p < 2){
    p++; c=1;
    setTimeout(function() { dealCard(p, c); }, 250);
  } else{
    setTimeout(function() { setupGame(); }, 250);
  }
}
function setupGame(){
  var disCard, randNum, randColor;
  disCard = document.getElementById("discardPile");
  randNum = Math.floor(Math.random() * 10);
  randColor = Math.floor(Math.random() * 4);

  disCard.style.backgroundImage = "none";
  disCard.style.backgroundColor = colors[randColor];
  disCard.innerHTML = "<span>"+randNum+"</span>";
  disCard.onclick = null;
  disCard.style.cursor = "default";

  document.getElementById("drawPile").onclick = function(){getCard()};
  document.getElementById("drawPile").style.cursor = "pointer";


  document.getElementById("p1ResetImg").style.opacity = 1;
  document.getElementById("p2ResetImg").style.opacity = 1;

  document.getElementById("p1ResetImg").style.cursor = "pointer";
  document.getElementById("p2ResetImg").style.cursor = "pointer";
  
  document.getElementById("p1Score").innerHTML="0";
  document.getElementById("p2Score").innerHTML="0";

  changePlayer()
}

function changePlayer(){
  var nextPlayer, currentPlayer;
  if (document.getElementById("p1Hand").style.backgroundColor=="rgb(85, 85, 85)"){ nextPlayer = 2, currentPlayer = 1; }
  else { nextPlayer = 1, currentPlayer = 2; }
  //console.log("background color = "+document.getElementById("p1Hand").style.backgroundColor+".");
  document.getElementById("p"+nextPlayer+"Hand").style.backgroundColor="#555555";
  document.getElementById("p"+currentPlayer+"Hand").style.backgroundColor="";

  var i = 1;
  while (document.getElementById("p"+nextPlayer+"Card"+i)){
    document.getElementById("p"+nextPlayer+"Card"+i).onclick = function(){ useCard(this, nextPlayer) };
    document.getElementById("p"+nextPlayer+"Card"+i).style.cursor = "pointer";
    i++;
  }
  i = 1;
  while (document.getElementById("p"+currentPlayer+"Card"+i)){
    document.getElementById("p"+currentPlayer+"Card"+i).onclick = null;
    document.getElementById("p"+currentPlayer+"Card"+i).style.cursor = "default";
    i++;
  }
}

function confirm(thisPlayer, status){
  //console.log(status);
  if (status == "endGame"){
    document.getElementById("resetMessage").innerHTML = "Congratulations Player "+thisPlayer+"!<br>Would you like to play again?";
  } else {
    document.getElementById("resetMessage").innerHTML = "Are you sure you wanna reset?";
  }
  document.getElementById("resetPop").style.display = "flex";
}
function closeConfirm(){
  document.getElementById("resetPop").style.display = "none";
}

function getCard(){
  if (document.getElementById("p1Hand").style.backgroundColor=="rgb(85, 85, 85)"){ p=1 }
  else (p=2)
  var i=8;
  while(document.getElementById("p" + p + "Card" + i)){
    i++
  }
  var newCard = document.createElement("div");
  document.getElementById("p" + p + "Hand").appendChild(newCard);
  newCard.setAttribute("id","p"+p+"Card"+i);
  newCard.className = "card";

  var thisCard, randNum, randColor;
  thisCard = document.getElementById("p"+p+"Card"+i);
  randNum = Math.floor(Math.random() * 10);
  randColor = Math.floor(Math.random() * 4);

  thisCard.style.backgroundImage = "none";
  thisCard.style.backgroundColor = colors[randColor];
  thisCard.innerHTML = "<span>"+randNum+"</span>";

    changePlayer();
}

function useCard(thisCard, thisPlayerNum){
  var discardPile=document.getElementById("discardPile");
  //console.log(thisCard.id+" - "+thisCard.textContent + "=my Card " + discardPile.textContent + "=Discard");
  if (thisCard.textContent== discardPile.textContent || thisCard.style.backgroundColor== discardPile.style.backgroundColor){
    var thisScore = document.getElementById("p"+thisPlayerNum+"Score");
    thisScore.textContent++;
    discardPile.style.backgroundColor = "black";
    discardPile.style.borderColor = "white";
    setTimeout(function(){ 
      discardPile.style.backgroundColor = thisCard.style.backgroundColor;
      discardPile.style.borderColor = "black"; 
      discardPile.innerHTML = "<span>" + thisCard.textContent + "</span>";
      thisCard.style.display = "none"; 
      thisScore.innerHTML = thisScore.textContent++; 
    
      var i = 1, endGame = true;
      while (document.getElementById("p"+thisPlayerNum+"Card"+i)){
        //console.log("p"+thisPlayerNum+"Card"+i+" = "+ window.getComputedStyle(document.getElementById("p"+thisPlayerNum+"Card"+i), null).display);
        if (window.getComputedStyle(document.getElementById("p"+thisPlayerNum+"Card"+i), null).display != "none"){ endGame = false; }
        i++;
      }
      //console.log("endGame = "+endGame);
      if (endGame) { confirm(thisPlayerNum, "endGame") }
      else { changePlayer(); }
    }, 500);
  } else{
    thisCard.style.borderColor = "white";
    setTimeout(function(){ thisCard.style.borderColor = "black"; }, 500);
  }


}
