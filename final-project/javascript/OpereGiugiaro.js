
var domain = INTERVALS(1)(20);
var dom2D = DOMAIN([[0,1], [0,1]])([20, 20]);
var dom3D = DOMAIN([[0,1], [0,1], [0,1]])([16, 16, 16]);
var dom_semicircolare = DOMAIN([[0,1],[0,PI]])([40,40]);
var dom_circolare = DOMAIN([[0,1],[0,2*PI]])([40,40]);

function surf(){
	function caraffa(){
		/* manico caraffa */
		var m1 = BEZIER(S0)([[3.62,0, 4.9], [4.74,0, 4.38], [4.03, 0,3.14], [3.62,0, 3.11]]);
		var m2 = BEZIER(S0)([[3.62,0, 5.29], [5.11,0, 4.64], [4.48,0, 3.21], [3.62,0, 2.94]]);

		var manico1 = CUBIC_HERMITE(S1)([m1,m2,[0,0.80,0],[0,-0.80,0]]);
		var manico2 = CUBIC_HERMITE(S1)([m1,m2,[0,-0.80,0],[0,0.80,0]]);

		var map_manico1 = MAP(manico1)(dom2D);
		var map_manico2 = MAP(manico2)(dom2D);

		var manico = STRUCT([map_manico1,map_manico2]);
		var man = TRANSLATE([0,2])([-2.8,-1.9])(manico);

		/* contenitore */
		var contenitore = BEZIER(S0)([[0,0, 1.46], [3.96-2.8,0, 1.54], [3.61-2.8,0, 1.21],[3.63-2.8,0, 5.33],
									[3.63-2.8,0, 5.33], [3.65-2.8,0, 5.49], [3.47-2.8,0, 5.46], [3.5-2.8,0, 5.32], 
									[3.55-2.8,0, 1.19], [3.68-2.8,0, 1.62], [2.99-2.8,0, 1.52]]);

		var mapping = ROTATIONAL_SURFACE(contenitore);
		var surface = TRANSLATE([2])([-1.46])(MAP(mapping)(dom_circolare));

		/* beccuccio */
		var b1 = BEZIER(S0)([[2.52,0, 5.28], [2.50,0, 4.79], [3.13,0, 4.79], [3.04,0, 5.28]]);
		var b2 = BEZIER(S0)([[2.52,-0.3, 5.28], [2.50,-0.3, 4.79], [3.13,-0.3, 4.79], [3.04,-0.3, 5.28]]);
		var b3 = BEZIER(S0)([[2.52+0.05,0, 5.28], [2.50+0.05,0, 4.79+0.05], [3.13-0.05,0, 4.79+0.05], [3.04-0.05,0, 5.28]]);
		var b4 = BEZIER(S0)([[2.52+0.05,-0.3, 5.28], [2.50+0.05,-0.3, 4.79+0.05], [3.13-0.05,-0.3, 4.79+0.05], [3.04-0.05,-0.3, 5.28]]);

		var bec1 = BEZIER(S1)([b1,b2]);
		var bec2 = BEZIER(S1)([b3,b4]);

		var bec = BEZIER(S2)([bec1,bec2]);
		var beccuccio =TRANSLATE([0,1,2])([-0.25-0.83,-2.75,-1.8])(ROTATE([0,1])(PI/2)(MAP(bec)(dom3D)));

		var caraffa = COLOR([1.5,1.5,1.5, 0.60])(STRUCT([man,surface,beccuccio]));
		return caraffa;
	}

	function bicchiere(){

		var b1 = BEZIER(S0)([[2.65-2.1,0, 2.84], [2.68-2.1,0, 1.14], [2.75-2.1,0, 1.12], [0,0, 1.14]]);
		var mapping = ROTATIONAL_SURFACE(b1);
		var surface = TRANSLATE([0,2])([-2,-1.14])(MAP(mapping)(dom_circolare));

		var m1 = BEZIER(S0)([[1.54,0, 1.44], [0.78,0, 1.39], [0.76,0, 2.52], [1.54,0, 2.58]]);
		var m2 = BEZIER(S0)([[1.54,0, 1.31], [0.67,0, 1.27], [0.44,0, 2.56], [1.54,0, 2.78]]);

		var manico1 = CUBIC_HERMITE(S1)([m1,m2,[0,0.60,0],[0,-0.60,0]]);
		var manico2 = CUBIC_HERMITE(S1)([m1,m2,[0,-0.60,0],[0,0.60,0]]);

		var map_manico1 = MAP(manico1)(dom2D);
		var map_manico2 = MAP(manico2)(dom2D);

		var manico = TRANSLATE([0,2])([-4.09,-1.11])(STRUCT([map_manico1,map_manico2]));

		var bicchiere = COLOR([1.5,1.5,1.5, 0.60])(STRUCT([surface,manico]));
		return bicchiere;
	}

	var model = STRUCT([caraffa(),bicchiere()]);
	return model;
}

function papiro(){

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
	return tavolinetto;
}

function chimera(){

	/* funzione che crea un solido di rotazione */
	function creaSolidoRotazione(c1,dom){

		var mapping = ROTATIONAL_SURFACE(c1);
		var solido = MAP(mapping)(dom);

		return solido;
	};

	/* Scodella con coperchio */
	var c1 = BEZIER(S0)([[2,0,2],[2,0,1.3],[1.5,0,0],[0,0,0]]);
	var c2 = BEZIER(S0)([[0,0,2.2],[2,0,2.2],[2.4,0,2.3],[2.4,0,1.9],[2,0,2],[0,0,2]]);
	var c3 = BEZIER(S0)([[0,0,2.8],[0.15,0,2.8],[0.2,0,2.7],[0.15,0,2.3],[0.15,0,2.3],[0,0,2.4],[0,0,2.25],[0.1,0,2.2]]);

	var coperchio = STRUCT([creaSolidoRotazione(c2,dom_circolare),creaSolidoRotazione(c3,dom_circolare)]);

	var scodella_Coperchio = COLOR([1.5,1.5,1.5, 0.55])(STRUCT([creaSolidoRotazione(c1,dom_circolare),coperchio]));

	/* Scodella senza coperchio e con cucchiai*/
	var c4 = BEZIER(S0)([[0,0,0],[1.4,0,0],[1.5,0,0.9],[1.5,0,1.5],
						[1.6,0,1.7],[1.3,0,1.7],[1.3,0,1.5],[1.3,0,0.9],[1.4,0,0.2],[0,0,0.2]]);
	var scodella = COLOR([1.5,1.5,1.5, 0.55])(TRANSLATE([0])([-5])(creaSolidoRotazione(c4,dom_circolare)));

	/* cucchiaio */
	var m1 = BEZIER(S0)([[0,0,4.5],[0.15,0,4.6],[0.1,0,3.3],[0.1,0,1.7]]);
	var a1 = BEZIER(S0)([[0,0,4],[0.15,0,3.9],[0.15,0,4.3],[0,0,4.2]]);
	var a2 = BEZIER(S0)([[0,0,1.5],[0.25,0,1.45],[0.25,0,1.75],[0,0,1.7]]);
	var c6 = BEZIER(S0)([[0,0,1.5],[0.4,0,1.58],[0.7,0,0],[0,0,0]]);
	var cucchiaio = STRUCT([COLOR([1.5,1.5,1.5,0.55])(creaSolidoRotazione(m1,dom_circolare)),COLOR([0,0,0])(creaSolidoRotazione(a1,dom_circolare)),
							COLOR([1.5,1.5,1.5,0.55])(creaSolidoRotazione(a2,dom_circolare)),COLOR([1.5,1.5,1.5,0.55])(creaSolidoRotazione(c6,dom_semicircolare))]);
	var cucchiai = ROTATE([0,2])(PI/3.3)(STRUCT([cucchiaio,TRANSLATE([1])([-0.5])(cucchiaio)]));

	/* Scodella satinata */
	var c5 = BEZIER(S0)([[0,0,0],[0.7,0,0],[1.8,0,0.3],[1.8,0,1.8],
						[1.9,0,2],[1.5,0,2],[1.6,0,1.8],[1.6,0,0.3],[0.7,0,0.2],[0,0,0.2]]);
	var scodella_satinata = COLOR([1.5,1.5,1.5,0.88])(TRANSLATE([0])([4])(creaSolidoRotazione(c5,dom_circolare)));


	var chimera = STRUCT([scodella_Coperchio, scodella, scodella_satinata,TRANSLATE([0,2])([-5.5,0.3])(cucchiai)]);
	return chimera;
}

var modello = STRUCT([TRANSLATE([1])([1.3])(SCALE([0,1,2])([0.4,0.4,0.4])(surf())),TRANSLATE([0,1])([-5,-1.5])(papiro()),
					SCALE([0,1,2])([0.4,0.4,0.4])(chimera())]);

var pavimento = COLOR([255/255,218/255,218/255])(TRANSLATE([0,1,2])([-8,-8,-1])(CUBOID([16,16,0.2])));
var parete1 = COLOR([255/255,229/255,229/255])(TRANSLATE([0,1,2])([-8,8,-1])(CUBOID([16,0.05,8])));
var parete2 = COLOR([255/255,229/255,229/255])(TRANSLATE([0,1,2])([-8,-8,-1])(CUBOID([0.05,16,8])));
var parete3 = COLOR([255/255,229/255,229/255])(TRANSLATE([0,1,2])([8,-8,-1])(CUBOID([0.05,16,8])));

var environment = STRUCT([pavimento,parete1,parete2,parete3]);

var model = STRUCT([modello,environment]);

DRAW(model);