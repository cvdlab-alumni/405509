
domain = INTERVALS(1)(32);
dom2D = DOMAIN([[0,1], [0,1]])([32, 32]);

/*	Disco superiore piano d'appoggio */
function pianoAppoggio (){
var d1 = BEZIER(S0)([[3.01, 2.49,0], [3.12, 4.93,0], [9.1, 5.18,0], [9.49, 2.6,0]]);
var d2 = BEZIER(S0)([[9.49, 2.6,0],[9.61, 0.09,0],[3.24, -0.27,0],[3.01, 2.49,0]]);
var d3 = BEZIER(S0)([[3.01, 2.49,-0.05], [3.12, 4.93,-0.05], [9.1, 5.18,-0.05], [9.49, 2.6,-0.05]]);
var d4 = BEZIER(S0)([[9.49, 2.6,-0.05],[9.61, 0.09,-0.05],[3.24, -0.27,-0.05],[3.01, 2.49,-0.05]]);

var s1 = BEZIER(S1)([d1,d2]);
var s2 = BEZIER(S1)([d3,d4]);
var s3 = BEZIER(S1)([d1,d3]);
var s4 = BEZIER(S1)([d2,d4]);

//var mapDisco1 = MAP(d1)(domain);
//var mapDisco2 = MAP(d2)(domain);
var mapSup1 = MAP(s1)(dom2D);
var mapSup2 = MAP(s2)(dom2D);
var mapSup3 = MAP(s3)(dom2D);
var mapSup4 = MAP(s4)(dom2D);

var disco = SCALE([0,1,2])([0.8,0.8,0.8])(STRUCT([mapSup1,mapSup2,mapSup3,mapSup4]));
return disco;
}

function piedistallo (){

	var p1 = BEZIER(S0)([[3.05, 3.86], [3.84, 3.71], [4.05, 3.92], [4.09, 4.08],
					[4.37, 4.71],[5.43, 4.82],[5.6, 4.03],[5.88, 3.19], [4.65, 2.64], [4.15, 3.46]]);

	var p2 = BEZIER(S0)([[3.07, 3.81], [3.73, 3.74], [4, 3.71], [4.12, 4.05],[4.57, 4.88],
						[5.36, 4.47],[5.42, 4.11],[5.83, 3.25], [4.71, 2.73], [4.19, 3.47]]);

	var s2 = BEZIER(S1)([p1,p2]);

	//var mapP1 =  MAP(p1)(domain);
	//var mapP2 =  MAP(p2)(domain);

	var mapSup2 = MAP(s2)(dom2D);

	//var pied = STRUCT([mapP1,mapP2]);
	var piedistallo = TRANSLATE([0,1])([1,-1.8])(mapSup2);
	var pied = TRANSLATE([2])([-1])(EXTRUDE([1])(piedistallo));
	return pied;
}

var tavolinetto = COLOR([0/255,115/255, 175/255, 0.60])(STRUCT([pianoAppoggio(), piedistallo()]));
DRAW(tavolinetto);

