function select(data, key, values){
	res = []
	for (var i = 0; i < values.length; i++){
		f = data.filter(function(item, index, array){
 			return ((item[i] === key)&(values[i]===values));	
		});
		res = res.concat(f);
	}
	return res;
}

