var dom_circolare = DOMAIN([[0,1],[0,2*PI]])([40,40]);
var dom_semicircolare = DOMAIN([[0,1],[0,PI]])([40,40]);

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
DRAW(chimera);