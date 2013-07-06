
var domain = INTERVALS(1)(20);
var dom_circolare = DOMAIN([[0,1],[0,2*PI]])([32,32]);
var dom2D = DOMAIN([[0,1], [0,1]])([20, 20]);
var dom3D = DOMAIN([[0,1], [0,1], [0,1]])([16, 16, 16]);

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
DRAW(model);