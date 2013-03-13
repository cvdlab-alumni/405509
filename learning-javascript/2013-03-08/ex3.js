function upperCase(string){
	return string.toUpperCase();
}
function upperCaseFirst(string){
	return string.charAt(0).toUpperCase().concat(string.slice(1,string.length).toLowerCase());
}
function capitalizeText(text){
	return test.split(" ")
		.map(function(item,index,array){
		return upperCaseFirst(item)})
		}
		.join("");
}
