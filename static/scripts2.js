var slider = document.getElementById('slider-handle');

noUiSlider.create(slider, {
    start: 4,
    step: 1,
	orientation: "vertical",
    range: {
        min: 0,
        max: 4
    },
    direction: 'rtl',
    pips: {
        mode: 'values',
        values: [0, 1, 2, 3, 4],
        density: 1,
        stepped: true
    }
});

var randomScalingFactor = function() {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + (opacity || '.3') + ')';
    };

    var scatterChartData = {
        datasets: [{
            label: "My First dataset",
            xAxisID: "x-axis-1",
            yAxisID: "y-axis-1",
			data: [{
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}]
        }, {
            label: "My Second dataset",
            xAxisID: "x-axis-1",
            yAxisID: "y-axis-2",
            data: [{
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}]
        }]
    };

    $.each(scatterChartData.datasets, function(i, dataset) {
        dataset.borderColor = randomColor(0.4);
        dataset.backgroundColor = randomColor(0.1);
        dataset.pointBorderColor = randomColor(0.7);
        dataset.pointBackgroundColor = randomColor(0.5);
        dataset.pointBorderWidth = 1;
    });

    console.log(scatterChartData);

    window.onload = function() {
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myScatter = Chart.Scatter(ctx, {
        	data: scatterChartData,
        	options: {
	            responsive: true,
	            hoverMode: 'single',
	            scales: {
	            	xAxes: [{
	            		position: "bottom",
	            		gridLines: {
	            			zeroLineColor: "rgba(0,0,0,1)"
	            		}
	            	}],
	            	yAxes: [{
		                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
		                display: true,
		                position: "left",
		                id: "y-axis-1",
		            }, {
		                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
		                display: true,
		                position: "right",
		                reverse: true,
		                id: "y-axis-2",
		        
		                // grid line settings
		                gridLines: {
		                    drawOnChartArea: false, // only want the grid lines for one axis to show up
		                },
		            }],
	            }
	        }
        });
    };

    $('#randomizeData').click(function() {
        scatterChartData.datasets[0].data = [{
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}];
        scatterChartData.datasets[1].data = [{
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}, {
			x: randomScalingFactor(),
			y: randomScalingFactor(),
		}]
        window.myScatter.update();
    });



window.onload = function() {    
    $('.application-controls').css('height', $('.plotting-area').innerHeight())
};