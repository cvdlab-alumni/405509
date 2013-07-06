var dom_circolare = DOMAIN([[0,1],[0,2*PI]])([40,40]);

/* funzione che crea un solido di rotazione */
function creaSolidoRotazione(c1,dom){

	var mapping = ROTATIONAL_SURFACE(c1);
	var solido = MAP(mapping)(dom);

	return solido;
};

var t1 = BEZIER(S0)([[0,0,5.5],[4.5,0,5.5],[4.7,0,5.45],[4.7,0,5.35],[4.5,0,5.3],
					[1.5,0,5.3],[-1,0,5.3],[-1.2,0,4.7],[0.5,0,1.5],[0.2,0,0.5],[-0.5,0,-0.5],
					[2.4,0,0.2],[2.9,0,0.9],[2.8,0,-0.2],[2.4,0,0],[0,0,0]]);

var table = COLOR([0.7,0.29,0])(creaSolidoRotazione(t1,dom_circolare));
DRAW(table);