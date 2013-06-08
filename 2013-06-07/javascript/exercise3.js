/*	Astolfi Cristiana mat 405509
	ESERCIZIO 1
 */

var brown = [153/255,51/255,0/255];
var darkBrown = [123/255,27/255,2/255];
var blue = [0/255,127/255,255/255];
var green = [34/255,139/255,34/255];

var domain2D = DOMAIN([[-35, 35], [-35, 35]])([11,11]);
//var domain3D = DOMAIN([[-35, 35], [-35, 35],[-5,1]])([15,15,5]);

var brown = [153/255,51/255,0/255];
var matrix = new Array();	// array di coordinate

// TERRENO MODIFICATO RISPETTO AGLI ESERCIZI 1 e 2 PER FAVORIRE LA CREAZIONE DI COSTRUZIONI (ESERCIZIO 4)

/* funzione usata per generare il terreno*/
var terrain = function(punto){
	var x = punto[0];
	var y = punto[1];
	var z ;
	z =  Math.random()*24 * SIN(x) * COS(y);
	if (x<=-2 && y<= -1){
		z = Math.random()* SIN(x) * COS(y);
	}
	else { 
		if(x>=-2 && y>= -1) {
			z =  Math.random()*20 * SIN(x) * COS(y);
		}
		if(x>=3 && y>= 6 && x<=8 && y<=12){
			z =  -2+Math.random()*0.3 * SIN(x) * COS(y);
		}
		
	}
	matrix.push([x,y,z]);
	return [x, y,z];
}

var territory = COLOR(brown)(MAP(terrain)(domain2D));

/*	ESERCIZIO 2 	*/

var lake = COLOR(blue)(CUBOID([70,70,0.5]));
var l1 = TRANSLATE([0,1,2])([-70/2.0,-70/2.0,-1.6])(lake);

/*	ESERCIZIO 3 	*/

var dom2D = PROD1x1([INTERVALS(1)(6),INTERVALS(1)(6)]);


/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi */
function arc (alpha, r, R){
	var domain = DOMAIN([[0,alpha],[r,R]])([12,1]);
	
	var mapping = function(v) {
		var a = v[0];
		var r = v[1];
		
		return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);
	
	return model;
};

/*	funzione che genera una conifera in cui la chioma risulta proporzionata rispetto al tronco
	h = altezza tronco, r = raggio tronco*/
function generaConifera(h,r){

	var tronco = COLOR(darkBrown)(EXTRUDE([h])(arc(2*PI,0,r)));
	var profile = BEZIER(S0)([[0,r*2,h],[r*2.5,(r*2),h],[r*2.5,-(r*2),h],[0,-(r*2),h]]);
	var c_centro = BEZIER(S0)([[0,r*2,h],[0,-(r*2),h]]);

	var apex = [0,0,2*h];
	var base_dx = BEZIER(S1)([profile,c_centro]);
	var mappa_base = MAP(base_dx)(dom2D);
	var base_sx = ROTATE([0,1])(PI)(mappa_base);
	var chioma_dx = MAP(CONICAL_SURFACE(apex)(profile))(dom2D);
	var chioma_sx = ROTATE([0,1])(PI)(chioma_dx);
	var chioma = COLOR(green)(STRUCT([base_sx,mappa_base,chioma_dx,chioma_sx]));

	var conifera = STRUCT ([tronco,chioma]);
	return conifera;
}

var genera_foresta = function () {

	for(i=0; i<matrix.length; i++) {

		var x = matrix[i][0];
		var y = matrix[i][1];
		var z = matrix[i][2];

		if(x >=0 && y <= 35) {
			var three = T([0,1,2])([x, y, z])(generaConifera(0.8*Math.random(),0.3*Math.random()));
			DRAW(three);
		}
	}
}

var environment = STRUCT([territory,l1,genera_foresta()]);



DRAW(environment);