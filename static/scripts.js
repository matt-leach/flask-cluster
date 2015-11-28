var sliderVert = document.getElementById('slider-handle-vert');
var sliderHoriz = document.getElementById('slider-handle-horiz');

noUiSlider.create(sliderVert, {
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
        values: [0,1, 2, 3, 4],
        density: 40,
        stepped: true
    }
});

noUiSlider.create(sliderHoriz, {
    start: 4,
    step: 1,
    range: {
        min: 0,
        max: 4
    },
    pips: {
        mode: 'values',
        values: [0,1, 2, 3, 4],
        density: 40,
        stepped: true
    }
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

var bubbleChartData = {
    animation: {
        duration: 10000
    },
    datasets: [{
        label: "My Second dataset",
        backgroundColor: randomColor(),
        data: [{
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }]
    }, {
        label: "My Second dataset",
        backgroundColor: randomColor(),
        data: [{
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }]
    }, {
        label: "My Second dataset",
        backgroundColor: randomColor(),
        data: [{
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }, {
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: 5,
        }]
    }]

};

function resizeApplicationControls() {
	if ($(window).width() > 600) {
		$('.application-controls').css('height', $('.plotting-area').innerHeight())
	} else {
		$('.application-controls').css('height', 'auto')
	}
}

function updateLegend() {
    $legendContainer = $('#legendContainer');
    $legendContainer.empty();
    $legendContainer.append(window.myChart.generateLegend());
}

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myChart = new Chart(ctx, {
        type: 'bubble',
        data: bubbleChartData,
        options: {
            responsive: true,
        }
    });

    updateLegend();
	
	resizeApplicationControls()
	

};


$(window).resize(function() {
	resizeApplicationControls()
})




