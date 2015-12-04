var sliderVert = document.getElementById('slider-handle-vert');
var sliderHoriz = document.getElementById('slider-handle-horiz');

noUiSlider.create(sliderVert, {
	animate: false,
    start: 4,
    step: 1,
	orientation: "vertical",
    range: {
        min: 0,
        max: 10
    },
    direction: 'rtl',
    pips: {
		mode: 'range',
		density: 10
    }
});

noUiSlider.create(sliderHoriz, {
	animate: false,
    start: 4,
    step: 1,
    range: {
        min: 0,
        max: 10
    },
    pips: {
		mode: 'range',
		density: 10
    }
});

function crossUpdate ( value, slider ) {
	slider.noUiSlider.set(value);
}

sliderHoriz.noUiSlider.on('slide', function( values, handle ){
	sliderVert.noUiSlider.set(values[handle]);
});

sliderVert.noUiSlider.on('slide', function( values, handle ){
	sliderHoriz.noUiSlider.set(values[handle]);
});


var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};
var randomColor = function() {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
};

function resizeApplicationControls() {
	$('.plotting-area').css('height', $('#canvas').outerHeight() + 80)

	if ($(window).width() > 768) {
		$('.application-controls').css('height', $('.plotting-area').innerHeight())
	} else {
		$('.application-controls').css('height', 'auto')
	}
}

function updateLegend(chart) {
    $legendContainer = $('#legendContainer');
    $legendContainer.empty();
    // $legendContainer.append(window.myChart.generateLegend());
}

window.onload = function() {
  Run();
	getData('kmeans', 6);
	resizeApplicationControls();
};

$('.info-button').click(function(event) {
	div_to_show = $(this).attr("show_div")
	console.log(div_to_show)
	$(div_to_show).fadeIn()
	$("#dimmer").fadeIn()
})

function closeInfo() {
	$('.info-text-wrapper').fadeOut()
	$("#dimmer").fadeOut()
}

$('.info i').click(function() {
	closeInfo()
})


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
	var fd = new FormData();
	fd.append( 'file', csv_file );
	$.ajax({
    	url: 'data',
		data: fd,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
      updateVars(data.names);
      getData('kmeans', 2);
			closeInfo();
    	}
  	});
}



function getData(method, cluster_num) {
  data = 1
  $.get( "cluster?method="+method+"&clusters="+cluster_num+"&data="+data, function(response) {
    if (response.error) { return }  // Error
    refactorData(response, cluster_num);
  });
}

function refactorData(data, cluster_num) {
  clusters = data.clusters;
  Data = data.variables;  // Global
  names = data.names;

  chart_data = [];
  for (c = 0; c <= cluster_num; c++ ) {
    data = [];
    for (jj = 0; jj <= clusters[cluster_num].length; jj++ ) {
      if (clusters[cluster_num][jj] == c) {
        data.push({x: Data[$("#var1-selector").val()][jj], y: Data[$("#var2-selector").val()][jj], name: names[jj]});
      }
    }
    cluster_dict = {name: 'Cluster '+c, color: randomColor(), data: data, marker: {symbol: 'circle'}};
    chart_data.push(cluster_dict);
  }
  var bubbleChartData = chart_data;
  plotData(bubbleChartData)
}

function plotData(bubbleChartData){

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
      title: { text: 'NBA Data' },
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

  updateLegend(window.myChart)

  resizeApplicationControls()

}
