// Globals
var clusters;
var Data;
var names;
var cluster_num;

var sliderVert = document.getElementById('slider-handle-vert');
var sliderHoriz = document.getElementById('slider-handle-horiz');

// Info functions
function showInfo() {
	$("#"+$('#method-selector').val()+"-info").fadeIn();
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

/* main update functions - getData and updateClusters */
function getData(method, cluster_num) {
  data = 1
  $.get( "cluster?method="+method+"&clusters="+cluster_num+"&data="+data, function(response) {
    if (response.error) { return }  // Error
    setData(response, cluster_num);
		refactorAndPlotData();
  });
}

function updateClusters() {
	// Main update function
	clusters = parseInt(sliderVert.noUiSlider.get());
	method = $('#method-selector').val();
	$(".no-of-clusters").html(clusters);
	getData(method, clusters);
}


function setData(data, cluster_count) {
	// set globals
	clusters = data.clusters;
	Data = data.variables;
	names = data.names;
	cluster_num = cluster_count;
}

// run on submitting file
$('#submit-file').submit(function() {
  	var csv_file = document.getElementById("file1").files[0]
  	var exts = ['csv'];
  	if (csv_file['type'] == "text/csv") {
	  	uploadFile(csv_file);
  	} else {
	  	alert("Wrong file type. Please upload a valid CSV");
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
				updateClusters();
				closeInfo();
			}
	});
}


/* hooks to run various functions when users change:
   variables
	 cluster numbers
	 method
	 dataset
*/
$('.var-selector').on('change', function() {
	// on changing variables update variable names and plot data
	updateVarName();
	refactorAndPlotData();
});

$('#method-selector').change(function() {
	updateClusters();
})


$('#dataset-selector').change(function() {
	$.post('data', {'builtin': $(this).val()}, function(data) {
    	updateVars(data.variable_names);
			updateClusters();
  	});
})

sliderVert.noUiSlider.on('change', function( values, handle){
	updateClusters();
});

sliderHoriz.noUiSlider.on('change', function( values, handle){
	updateClusters();
});


window.onload = function() {
	current_clusters = parseInt(sliderVert.noUiSlider.get());
	resizeApplicationControls();

	// default dataset cereal
	$.post('data', {'builtin': 'cereal.csv'}, function(data) {
    	updateVars(data.variable_names);
		  updateClusters();
  });
};
