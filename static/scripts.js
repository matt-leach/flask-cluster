// Globals
var clusters;
var Data;
var names;
var cluster_num;

var sliderVert = document.getElementById('slider-handle-vert');
var sliderHoriz = document.getElementById('slider-handle-horiz');


function showInfo() {
	method = $('#method-selector').val();
	$("#"+method+"-info").fadeIn();
	$("#dimmer").fadeIn();
}

function showUploadInfo() {
  $("#file-upload-info").fadeIn();
	$("#dimmer").fadeIn();
}

function closeInfo() {
	$('.info-text-wrapper').fadeOut();
	$("#dimmer").fadeOut();
}

$('.info-button').click(function(event) {
  showInfo();
})

$(".upload-info-button").click(function(event) {
	showUploadInfo();
})

$('.info i').click(function() {
	closeInfo()
})

$('.var-selector').on('change', function() {
	updateVarName();
	refactorAndPlotData();
});



$(window).resize(function() {
	resizeApplicationControls()
})


$('#submit-file').submit(function() {
  	var csv_file = document.getElementById("file1").files[0]
  	var exts = ['csv'];
  	if (csv_file['type'] == "text/csv") {
	  	uploadFile(csv_file)
  	} else {
	  	alert("Wrong file type. Please upload a valid CSV")
  	}
  	return false;
});



function uploadFile(csv_file) {
	// uploads a file
	var fd = new FormData();
	fd.append( 'file', csv_file );
	$.ajax({
    	url: 'data',
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
				updateVars(data.variable_names);
				getData('kmeans', parseInt(sliderVert.noUiSlider.get()));
					closeInfo();
		    	}
	  	});
}

$('#method-selector').change(function() {
	updateClusters();
})


$('#dataset-selector').change(function() {
	$.post('data', {'builtin': $(this).val()}, function(data) {
    	updateVars(data.variable_names);
			updateClusters();
  	});
})


function updateClusters() {
	// Updates clusters
	clusters = parseInt(sliderVert.noUiSlider.get());
	method = $('#method-selector').val();
	$(".no-of-clusters").html(clusters);
	getData(method, clusters);
}

sliderVert.noUiSlider.on('change', function( values, handle){
	updateClusters();
});

sliderHoriz.noUiSlider.on('change', function( values, handle){
	updateClusters();
});


function getData(method, cluster_num) {
  data = 1
  $.get( "cluster?method="+method+"&clusters="+cluster_num+"&data="+data, function(response) {
    if (response.error) { return }  // Error
    setData(response, cluster_num);
		refactorAndPlotData(cluster_num);
  });
}

colors = ['rgba(95, 75, 182, 100)',
					'rgba(13, 50, 77, 100)',
					'rgba(168, 224, 255, 100)',
					'rgba(84, 122, 165, 100)',
					'rgba(247, 111, 142, 100)',
					'rgba(85, 40, 111,100)',
					'rgba(0,72,124,100)']


function setData(data, cluster_count) {
	// set globals
	clusters = data.clusters;
	Data = data.variables;
	names = data.names;
	cluster_num = cluster_count;
}

function refactorAndPlotData() {
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
  var bubbleChartData = chart_data;
  plotData(bubbleChartData);
}

function plotData(bubbleChartData) {
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
      series: bubbleChartData
  });


  resizeApplicationControls()

}


window.onload = function() {
	current_clusters = parseInt(sliderVert.noUiSlider.get());
	resizeApplicationControls();
  Initialize(current_clusters);
};
