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
                label: "My First dataset",
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
			
			$('.application-controls').css('height', $('.plotting-area').innerHeight())

        };





