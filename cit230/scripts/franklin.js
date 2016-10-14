google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Hour', 'Temp'],
    ['12',  67],
    ['1',  67],
    ['2',  69],
    ['3',  69],
    ['4',  69],
    ['5',  70],
    ['6',  69],
    ['7',  72],
    ['8',  74],
    ['9',  77],
    ['10',  79],
    ['11',  81],
    ['12',  84],
    ['1',  86],
    ['2',  88],
    ['3',  90],
    ['4',  90],
    ['5',  85],
    ['6',  83],
    ['7',  79],
    ['8',  74],
    ['9',  70],
    ['10',  68],
    ['11',  66]
  ]);

  var options = {
    hAxis: { slantedText: false },
    chartArea: { width: '80%', height: '75%'},
    curveType: 'function',
    legend: { position: 'bottom' },
    annotations: {
      boxStyle: {
        rx: 10,
        ry: 10,
      }
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}