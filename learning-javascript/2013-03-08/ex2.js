function rand_array (n)	{
	var array = [];
	var compare=function (v1,v2){
				return v2-v1;};
	for (var i=1; i<=n; i++){
		array.push(Math.ceil(Math.random()*100));};
	return array.filter(function(item,index,array){return item%2===1;})
		    .sort()
		    .sort(compare);
		
}

