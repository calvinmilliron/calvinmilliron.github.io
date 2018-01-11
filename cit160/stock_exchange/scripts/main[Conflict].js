var SAM = new Array();
var CAL = new Array();
var SHA = new Array();
var SAMcost = 0;
var CALcost = 0;
var SHAcost = 0;
var SAMprofit = 0;
var CALprofit = 0;
var SHAprofit = 0;


function changeDay() {
  var i = SAM.length;
  do {
    positive = Math.random() >= 0.5;
    next_price = (Math.random() * 10).toFixed(2);
    if (positive) {
      next_result = parseFloat(SAM[i - 1]) + parseFloat(next_price);
    } else {
      next_result = parseFloat(SAM[i - 1]) - parseFloat(next_price);
    }
  } while (next_result < 0)
  SAM[i] = parseFloat(next_result).toFixed(2);
  do {
    positive = Math.random() >= 0.5;
    next_price = (Math.random() * 10).toFixed(2);
    if (positive) {
      next_result = parseFloat(SHA[i - 1]) + parseFloat(next_price);
    } else {
      next_result = parseFloat(SHA[i - 1]) - parseFloat(next_price);
    }
  } while (next_result < 0)
  SHA[i] = parseFloat(next_result).toFixed(2);
  do {
    positive = Math.random() >= 0.5;
    next_price = (Math.random() * 10).toFixed(2);
    if (positive) {
      next_result = parseFloat(CAL[i - 1]) + parseFloat(next_price);
    } else {
      next_result = parseFloat(CAL[i - 1]) - parseFloat(next_price);
    }
  } while (next_result < 0)
  CAL[i] = parseFloat(next_result).toFixed(2);
  changeProfit();
}

function changeProfit(){
  var i = SAM.length-1;
  //if (SAMcost > 0){
    SAMprofit = ((parseInt(document.getElementById("SAMshares").textContent) * SAM[i]) - SAMcost).toFixed(2);
    if (SAMprofit > 0){
      document.getElementById("SAMprofit").innerHTML = "+"+SAMprofit;
      document.getElementById("SAMprofit").style.color = "green";
    } else if (SAMprofit < 0){
      document.getElementById("SAMprofit").innerHTML = SAMprofit;
      document.getElementById("SAMprofit").style.color = "red";
    } else{ document.getElementById("SAMprofit").style.color = "black"; }
  //}
  //if (SHAcost > 0){
    SHAprofit = ((parseInt(document.getElementById("SHAshares").textContent) * SHA[i]) - SHAcost).toFixed(2);
    if (SHAprofit > 0){
      document.getElementById("SHAprofit").innerHTML = "+"+SHAprofit;
      document.getElementById("SHAprofit").style.color = "green";
    } else if (SHAprofit < 0){
      document.getElementById("SHAprofit").innerHTML = SHAprofit;
      document.getElementById("SHAprofit").style.color = "red";
    } else{ document.getElementById("SHAprofit").style.color = "black"; }
  //}
  //if (CALcost > 0){
    CALprofit = ((parseInt(document.getElementById("CALshares").textContent) * CAL[i]) - CALcost).toFixed(2);
    if (CALprofit > 0){
      document.getElementById("CALprofit").innerHTML = "+"+CALprofit;
      document.getElementById("CALprofit").style.color = "green";
    } else if (CALprofit < 0){
      document.getElementById("CALprofit").innerHTML = CALprofit;
      document.getElementById("CALprofit").style.color = "red";
    } else{ document.getElementById("CALprofit").style.color = "black"; }
  //}
}

function buyDeny() {
  document.getElementById("buyPop").style.display = "none";
}
function sellDeny() {
  document.getElementById("sellPop").style.display = "none";
}

function buyStock(stockName) {
  document.getElementById("confirmMessage").innerHTML = "";
  document.getElementById("buyMessage").innerHTML = "How many shares would you like?<br>"
  document.getElementById("buyShares").style.backgroundColor = "white";
  document.getElementById("buyShares").value = "";
  document.getElementById("confirmButton").innerHTML = "<button onclick='buyConfirm(&#39;" + stockName + "&#39;)'>Confirm</button>"
  document.getElementById("buyPop").style.display = "flex";
  document.getElementById("buyShares").focus();
}
function sellStock(stockName) {
  if (parseInt(document.getElementById(stockName+"shares").textContent) == 0){
    document.getElementById("confirmMessage").innerHTML = "You do not own any "+stockName+" stock.";
  } else{
    document.getElementById("confirmMessage").innerHTML = "";
    document.getElementById("sellPop").style.display = "flex";
    document.getElementById("sellMessage").innerHTML = "How many shares would you like to sell?<br>";
    var sellSelect = "<select id='sellShares'>";
    for(var i = 1; i<= document.getElementById(stockName+"shares").textContent; i++){
      sellSelect += "<option value="+i+">"+i+"</option>";
    }
    sellSelect += "</select>";
    document.getElementById("sellSelect").innerHTML = sellSelect;
    document.getElementById("confirmSellButton").innerHTML = "<button onclick='sellConfirm(&#39;" + stockName + "&#39;)'>Confirm</button>"
    document.getElementById("sellPop").style.display = "flex";
    document.getElementById("sellShares").focus();
  }
}

function buyConfirm(stockName) {
  var thisStockName = window[stockName];
  var shareRequest = Math.round(Math.abs(document.getElementById("buyShares").value))
  var shareCost = shareRequest * thisStockName[thisStockName.length - 1];
  var theBank = document.getElementById("bank");
  var stockShares = document.getElementById(stockName + "shares");
  if (shareCost > parseFloat(theBank.textContent)) {
    document.getElementById("buyShares").style.backgroundColor = "#ff99c2"
    document.getElementById("buyMessage").innerHTML = "There is not enough funds for this transaction. Try again."
  } else {
    theBank.innerHTML = (parseFloat(theBank.textContent) - shareCost).toFixed(2);
    stockShares.textContent = parseInt(stockShares.textContent) + shareRequest;
    document.getElementById("confirmMessage").innerHTML = "Congratulations! You now own " + stockShares.textContent + " shares of " + stockName + ".";
    window[stockName + "cost"] = (window[stockName + "cost"] + shareCost).toFixed(2);
    changeProfit();
    buyDeny()
  }
}
function sellConfirm(stockName) {
  var thisStockName = window[stockName];
  var sellRequest = Math.round(Math.abs(document.getElementById("sellShares").value))
  var sellPrice = sellRequest * thisStockName[thisStockName.length - 1];
  var theBank = document.getElementById("bank");
  var stockShares = document.getElementById(stockName + "shares");
  /*if (sellPrice > parseFloat(theBank.textContent)) {
    document.getElementById("buyShares").style.backgroundColor = "#ff99c2"
    document.getElementById("buyMessage").innerHTML = "There is not enough funds for this transaction. Try again."
  } else {*/
    theBank.innerHTML = (parseFloat(theBank.textContent) + sellPrice).toFixed(2);
    stockShares.textContent = parseInt(stockShares.textContent) - sellRequest;
    document.getElementById("confirmMessage").innerHTML = "You now own " + stockShares.textContent + " shares of " + stockName + ".";
    window[stockName + "cost"] = (window[stockName + "cost"] - sellPrice).toFixed(2);
    changeProfit();
    sellDeny()
  //}
}

function giveAdvice() {
  var lowest = "I give up";
  var highest = "I give up";
  if (SAM[SAM.length - 1] < CAL[CAL.length - 1] && SAM[SAM.length - 1] < SHA[SHA.length - 1]) {
    lowest = "SAM";
  } else if (CAL[CAL.length - 1] < SAM[SAM.length - 1] && CAL[CAL.length - 1] < SHA[SHA.length - 1]) {
    lowest = "CAL";
  } else if (SHA[SHA.length - 1] < SAM[SAM.length - 1] && SHA[SHA.length - 1] < CAL[CAL.length - 1]) {
    lowest = "SHA"
  } else {
    lowest = "I give up";
  }

  if (SAM[SAM.length - 1] > SHA[SHA.length - 1] && SAM[SAM.length - 1] > CAL[CAL.length - 1]) {
    highest = "SAM";
  } else if (CAL[CAL.length - 1] > SHA[SHA.length - 1] && CAL[CAL.length - 1] > SAM[SAM.length - 1]) {
    highest = "CAL";
  } else if (SHA[SHA.length - 1] > CAL[CAL.length - 1] && SHA[SHA.length - 1] > SAM[SAM.length - 1]) {
    highest = "SHA";
  } else {
    highest = "I give up";
  }

  if (lowest == "I give up" && highest == "I give up") {
    document.getElementById("adviceMessage").innerHTML = "I give up";
  } else {
    document.getElementById("adviceMessage").innerHTML = "";
    if (lowest != "I give up") {
      document.getElementById("adviceMessage").innerHTML += "You should buy " + lowest+"<br>";
    }
    if (highest != "I give up" && document.getElementById(highest + "shares").textContent > 0) {
      document.getElementById("adviceMessage").innerHTML += "You should sell " + highest;
    }
  }
}

function changeSec() {
  if (document.getElementById("timeDisplay") == 0) {
    document.getElementById("timeDisplay") = 60;
  } else {
    document.getElementById("timeDisplay").textContent -= 1;
  }
}

function buildTable() {
  var stockTable = document.getElementById("stock-options");
  for (i = SAM.length + 1; i > 1; i--) {
    if (stockTable.childNodes[i]) {
      stockTable.removeChild(stockTable.childNodes[i])
    }
  } // Remove all rows

  var newTd;
  for (i = SAM.length; i > 0; i--) {
    var newTr = document.createElement("tr");
    newTr.setAttribute("id", "day" + i);
    if (i % 2 == 0) {
      newTr.classList.add("highlight");
    }
    stockTable.appendChild(newTr);

    newTd = document.createElement("td");
    newTd.innerHTML = SAM[i - 1];
    document.getElementById("day" + i).appendChild(newTd)

    newTd = document.createElement("td");
    if (i > 1) {
      if (SAM[i - 1] - SAM[i - 2] > 0) {
        newTd.classList.add("positive");
        newTd.innerHTML = "+";
      } else {
        newTd.classList.add("negative");
      }
      newTd.innerHTML += (SAM[i - 1] - SAM[i - 2]).toFixed(2);
    }
    document.getElementById("day" + i).appendChild(newTd)

    newTd = document.createElement("td");
    newTd.innerHTML = SHA[i - 1];
    document.getElementById("day" + i).appendChild(newTd)

    newTd = document.createElement("td");
    if (i > 1) {
      if (SHA[i - 1] - SHA[i - 2] > 0) {
        newTd.classList.add("positive");
        newTd.innerHTML = "+";
      } else {
        newTd.classList.add("negative");
      }
      newTd.innerHTML += (SHA[i - 1] - SHA[i - 2]).toFixed(2);
    }
    document.getElementById("day" + i).appendChild(newTd)

    newTd = document.createElement("td");
    newTd.innerHTML = CAL[i - 1];
    document.getElementById("day" + i).appendChild(newTd)

    newTd = document.createElement("td");
    if (i > 1) {
      if (CAL[i - 1] - CAL[i - 2] > 0) {
        newTd.classList.add("positive");
        newTd.innerHTML = "+";
      } else {
        newTd.classList.add("negative");
      }
      newTd.innerHTML += (CAL[i - 1] - CAL[i - 2]).toFixed(2);
    }
    document.getElementById("day" + i).appendChild(newTd)
  } //Build new rows

  drawChart();
}

function changeSec(){

}

function init() {

  setInterval(changeDay, 60000);
  setInterval(changeSec, 1000);
  var positive, next_price, next_result, i;

  var BAR = new Array();

  SAM[0] = parseFloat((Math.random() * 10).toFixed(2));
  CAL[0] = parseFloat((Math.random() * 10).toFixed(2));
  SHA[0] = parseFloat((Math.random() * 10).toFixed(2));

  for (i = 1; i < 10; i++) {
    changeDay();
  } //build stock history
  buildTable();



} // end init()




google.charts.load('current', {
  'packages': ['line']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Day');
  data.addColumn('number', 'SAM');
  data.addColumn('number', 'SHA');
  data.addColumn('number', 'CAL');

  var row = new Array();
  for (var i = 0; i < SAM.length; i++) {
    row = [i, parseFloat(SAM[i]), parseFloat(SHA[i]), parseFloat(CAL[i])];
    data.addRow(row);
  }


  /*  data.addRows([
      [1, 37.8, 80.8, 41.8],
      [2, 30.9, 69.5, 32.4],
      [3, 25.4, 57, 25.7],
      [4, 11.7, 18.8, 10.5],
      [5, 11.9, 17.6, 10.4],
      [6, 8.8, 13.6, 7.7],
      [7, 7.6, 12.3, 9.6],
      [8, 12.3, 29.2, 10.6],
      [9, 16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11, 5.3, 7.9, 4.7],
      [12, 6.6, 8.4, 5.2],
      [13, 4.8, 6.3, 3.6],
      [14, 4.2, 6.2, 3.4]
    ]);*/

  var options = {
    width: "100%",
    legend: {
      position: 'none'
    },
    hAxis: {
      textPosition: 'none'
    }

  };

  var chart = new google.charts.Line(document.getElementById('chart_div'));

  chart.draw(data, options);
}

$(window).resize(function () {
  drawChart();
});
