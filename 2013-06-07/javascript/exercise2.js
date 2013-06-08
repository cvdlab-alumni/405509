/*	Astolfi Cristiana mat 405509
	ESERCIZIO 1
 */

var brown = [153/255,51/255,0/255];
var blue = [0/255,127/255,255/255];

var domain3D = DOMAIN([[-35, 35], [-35, 35],[-5,1]])([15,15,5]);

var brown = [153/255,51/255,0/255];
var matrix = new Array();	// array di coordinate

/* funzione usata per generare il terreno*/
var terrain = function(punto){
	var x = punto[0];
	var y = punto[1];
	var z ;
	z =  Math.random()*5 * SIN(x) * COS(y);
	if (x<=-2 && y<= -1){
		z = Math.random()*1 * SIN(x) * COS(y);
	}
	else { 
		if(x>=-2 && y>= -1) {
			z =  Math.random()*3.5 * SIN(x) * COS(y);
		}
		if(x>=3 && y>= 6 && x<=8 && y<=12){
			z =  -5+Math.random()*5 * SIN(x) * COS(y);
		}
		
	}
	matrix.push([x,y,z]);
	return [x, y,z];
}

var territory = COLOR(brown)(MAP(terrain)(domain3D));

/*	ESERCIZIO 2 	*/

var lake = COLOR(blue)(CUBOID([70,70,0.5]));
var l1 = TRANSLATE([0,1,2])([-70/2.0,-70/2.0,-1.3])(lake);
var environment = STRUCT([territory,l1]);


DRAW(environment);