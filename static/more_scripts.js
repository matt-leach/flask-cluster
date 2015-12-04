function Run() {
	$.post('data', {'builtin': 'cereal'}, function(data) {
    updateVars(data.names)
  });
};


function updateVars(varNames) {
  // Updates the variable selector dropdowns with varNames
  select1 = document.getElementById("var1-selector");
  select2 = document.getElementById("var2-selector");
  $("#var1-selector").empty();
  $("#var2-selector").empty();
  for (var i = 0; i < varNames.length; i++) {
      var option = document.createElement("option");
      option.value = varNames[i];
      option.textContent = varNames[i];
      select1.appendChild(option);
      select2.appendChild(option.cloneNode(true));
  }
}
