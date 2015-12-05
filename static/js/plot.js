
colors = ['rgba(95, 75, 182, 100)',
					'rgba(13, 50, 77, 100)',
					'rgba(168, 224, 255, 100)',
					'rgba(84, 122, 165, 100)',
					'rgba(247, 111, 142, 100)',
					'rgba(85, 40, 111,100)',
					'rgba(0,72,124,100)']



function refactorAndPlotData() {
	// refactors the data so highcharts can plot
  chart_data = [];
  for (c = 0; c < cluster_num; c++ ) {
    data = [];
    for (jj = 0; jj <= clusters[cluster_num].length; jj++ ) {
      if (clusters[cluster_num][jj] == c) {
        data.push({x: Data[$("#var1-selector").val()][jj], y: Data[$("#var2-selector").val()][jj], name: names[jj]});
      }
    }
    cluster_dict = {name: 'Cluster '+ (c+1), color: colors[c], data: data, marker: {symbol: 'circle'}};
    chart_data.push(cluster_dict);
  }
  plotData(chart_data);
}

function plotData(data) {
  $('#canvas').highcharts({
      chart: {
          type: 'scatter',
          zoomType: 'xy',
          spacingTop: 0,
          spacingBottom: 5,
          spacingLeft: 0,
          style: {
          fontFamily: 'Proxima Nova'
        }
      },
      navigation: {
            buttonOptions: {
                enabled: false
            }
      },
      title: { text: '' },
      xAxis: {
	      lineColor: '#eee',
	      tickColor: '#eee',
          title: {
              enabled: true,
              text: $("#var1-selector").val()
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
      yAxis: {
	      lineColor: '#333',
	      gridLineColor: '#eee',
          title: {
              text: $("#var2-selector").val()
          }
      },
      plotOptions: {
          scatter: {
              marker: {
                  radius: 5,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false
                      }
                  }
              },
              tooltip: {
                  headerFormat: '',
                  pointFormat: '{point.name}'
              }
          }
      },
      series: data
  });


  resizeApplicationControls()

}
