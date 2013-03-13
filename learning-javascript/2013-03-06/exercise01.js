var matrix= "";
for (var i=1;i<=10;i++){
	for(var j=1;j<=10;j++){
	(j===10) ? matrix+=(i*j): matrix += (i*j + "\t");	
	}
	matrix += '\n';
}
console.log(matrix);
