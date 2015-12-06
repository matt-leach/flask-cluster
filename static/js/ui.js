var sliderVert = document.getElementById('slider-handle-vert');
var sliderHoriz = document.getElementById('slider-handle-horiz');

noUiSlider.create(sliderVert, {
	animate: false,
    start: 4,
    step: 1,
	orientation: "vertical",
    range: {
        min: 1,
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
        min: 1,
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


function resizeApplicationControls() {
	$('.plotting-area').css('height', $('#canvas').outerHeight() + 80)

	if ($(window).width() > 768) {
		$('.application-controls').css('height', $('.plotting-area').innerHeight())
	} else {
		$('.application-controls').css('height', 'auto')
	}
}

/* updates for the variable dropdowns */
function updateVars(varNames) {
  	// Updates the variable selector dropdowns with varNames
  	select1 = document.getElementById("var1-selector");
  	select2 = document.getElementById("var2-selector");
  	$("#var1-selector").empty();
  	$("#var2-selector").empty();
  	$.each( varNames, function( index, value ){
			var option = document.createElement("option");
    	option.value = value;
    	option.textContent = value;
    	select1.appendChild(option);
    	select2.appendChild(option.cloneNode(true));
	});
	updateVarName();
}

function updateVarName() {
	current_length = $("#var2-selector")[0].length
	current_1_index = $("#var1-selector")[0].selectedIndex
	current_2_index = $("#var2-selector")[0].selectedIndex
	if (current_1_index == current_2_index){
		$("#var2-selector").prop('selectedIndex', (current_1_index + 1) % current_length)
	}
	current_1_index = $("#var1-selector")[0].selectedIndex
	current_2_index = $("#var2-selector")[0].selectedIndex
	$("#var2-selector").find("option").prop('disabled', false)
	$("#var1-selector").find("option").prop('disabled', false)
	$("#var2-selector").find("option").eq(current_1_index).prop('disabled', true)
	$("#var1-selector").find("option").eq(current_2_index).prop('disabled', true)
}

$(window).resize(function() {
	resizeApplicationControls()
})
