var dom_circolare = DOMAIN([[0,1],[0,2*PI]])([40,40]);;
var dom3D = DOMAIN([[0,1], [0,1], [0,1]])([10, 10, 10]);
var dom2D = DOMAIN([[0,1], [0,1]])([32, 32]);

/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi */
function arc (alpha, r, R){
	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	
	var mapping = function(v) {
		var a = v[0];
		var r = v[1];
		
		return [r*COS(a), r*SIN(a)];
	}
	var model = MAP(mapping)(domain);
	
	return model;
};

/* funzione che crea un solido di rotazione */
function creaSolidoRotazione(c1,dom){

	var mapping = ROTATIONAL_SURFACE(c1);
	var solido = MAP(mapping)(dom);

	return solido;
};

/* funzione che crea una sfera di raggio r */
var sphere = function(r) {
	var domain = DOMAIN([[0, PI], [0, 2*PI]])([30,30]);

	var mapping = function(v) {
		var a = v[0];
		var b = v[1];

		var u = r*SIN(a)*COS(b);
		var v = r*SIN(a)*SIN(b);
		var w = r*COS(a);

		return [u,v,w];
	}
	return MAP(mapping)(domain)
}

/* base lampada */

var base_acciaio = COLOR([81/255,88/255,91/255])(EXTRUDE([0.65])(arc(2*PI,0,0.5)));
var anellino =  COLOR([0,0,0])(TRANSLATE([2])([0.65])(EXTRUDE([0.05])(arc(2*PI,0,0.485))));
var base_vetro = COLOR([1.5,1.5,1.5])(TRANSLATE([2])([0.7])(EXTRUDE([1.8])(arc(2*PI,0,0.5))));
var p_a = BEZIER(S0)([[0.5,0,2.5],[0.5,0,2.8],[0.4,0,2.9],[0.8,0,3]]);
var parte_alta = COLOR([1.5,1.5,1.5])(creaSolidoRotazione(p_a,dom_circolare));
var vite = TRANSLATE([0,2])([0.5,2.75])(sphere(0.05));
var viti = COLOR([0.184,0.2,0.207])(STRUCT(REPLICA(4)([vite,ROTATE([0,1])(PI/2)])));

/* parte superiore lampada */

var f1 = BEZIER(S0)([[2,0,2],[2.2,0,3.4],[1.2,0,3.2],[0.8,0,3.2],[0.8,0,3]]);
var base_fungo = COLOR([1,140/255,0])(creaSolidoRotazione(f1,dom_circolare));

var anello = COLOR([0.184,0.2,0.207])(TRANSLATE([2])([3])(EXTRUDE([0.05])(arc(2*PI,0.7,0.8))));

var f2 = BEZIER(S0)([[0.15,0,3.7],[0.5,0,3.60],[0.7,0,3.30],[0.7,0,3]]);
var cappello_fungo =COLOR([1,1,0])( creaSolidoRotazione(f2,dom_circolare));


var bullone = function (){

	var base = EXTRUDE([0.05])(arc(2*PI,0.075,0.15));
	var a_l = TRANSLATE([2])([0.05])(EXTRUDE([0.02])(arc(2*PI,0,0.10)));
	var a_l2 =  TRANSLATE([2])([0.05])(EXTRUDE([0.0089])(arc(2*PI,0.10,0.14)));
	var bullone = COLOR(0,0,0)(STRUCT([base,a_l,a_l2]));
	return bullone;
};
/* lampadina */

var cil = COLOR([1,1,0])(EXTRUDE([0.2])(arc(2*PI,0,0.075)));
var l1 = BEZIER(S0)([[0.075,0,0.2],[0.075,0,0.25],[0.48,0,0.53],[0.19,0,0.78],[0,0,0.75]]);
var lamp = COLOR([1.5,1.5,1.5, 0.90])(creaSolidoRotazione(l1,dom_circolare));
var lampada = STRUCT([bullone(),cil,lamp]);
var lampad = ROTATE([0,2])(PI/2)(lampada);
var lampadina = TRANSLATE([0,2])([0.5,2.65])(lampad);
var ruota_l = ROTATE([0,1])(PI/4)(lampadina);
var lampadine_laterali = STRUCT(REPLICA(3)([ruota_l,ROTATE([0,1])(2*PI/3)]));
var lampadine = STRUCT([lampadine_laterali,TRANSLATE([2])([2.5])(lampada)]);

/* Interruttore */

var i1 = BEZIER(S0)([[2,0,0.3],[2.6,0,0.3],[2.3,0,0.2],[2.7,0,0.2]]);
var i2 = BEZIER(S0)([[2,0.7,0.3],[2.6,0.7,0.3],[2.3,0.7,0.2],[2.7,0.7,0.2]]);
var si1 = BEZIER(S1)([i1,i2]);
var i3 = BEZIER(S0)([[2,0,0],[2.7,0,0]]);
var i4 = BEZIER(S0)([[2,0.7,0],[2.7,0.7,0]]);
var si2 =  BEZIER(S1)([i3,i4]);
var inter = MAP(BEZIER(S2)([si1,si2]))(dom3D);

var pulsante = TRANSLATE([0,1,2])([2.18,0.2,0.3])(EXTRUDE([0.03])(arc(2*PI,0,0.085)));
var pulsanti = STRUCT([pulsante,TRANSLATE([1])([0.3])(pulsante)]);
var interruttore =COLOR(0,0,0)( TRANSLATE([1])([-0.3])(STRUCT([inter, pulsanti])));

/* filo */

var b = ROTATE([0,2])(PI/2)(bullone());
var bull = TRANSLATE([0,2])([0.5,0.15])(b);

// filo lampada-interruttore
var t1 = BEZIER(S0)([[0.57,0,0.15],[2,0,0.15]]);
var t2 = BEZIER(S0)([[0.57,0.03,0.15],[2,0.03,0.15]]);
var st1 = CUBIC_HERMITE(S1)([t1,t2,[0,0,0.1],[0,0,-0.1]]);
var st2 = CUBIC_HERMITE(S1)([t1,t2,[0,0,-0.1],[0,0,+0.1]]); 
var map_st1 = MAP(st1)(dom2D);
var map_st2 = MAP(st2)(dom2D);

// filo interruttore-presa
var t3 = BEZIER(S0)([[2.7,0,0.15],[8,-0.2,0.15],[1.5,-1,0.15],[6,-3,0.15]]);
var t4 = BEZIER(S0)([[2.7,0+0.03,0.15],[8,-0.2+0.03,0.15],[1.5,-1+0.03,0.15],[6,-3+0.03,0.15]]);
var st3 = CUBIC_HERMITE(S1)([t3,t4,[0,0,0.1],[0,0,-0.1]]);
var st4 = CUBIC_HERMITE(S1)([t3,t4,[0,0,-0.1],[0,0,+0.1]]); 
var map_st3 = MAP(st3)(dom2D);
var map_st4 = MAP(st4)(dom2D);

var fil = COLOR(0,0,0)(STRUCT([map_st1,map_st2,map_st3,map_st4]));

// presa
var pr1 = BEZIER(S0)([[0.5,0,0.3],[-0.2,0,0.3],[-0.2,0,-0.3],[0.5,0,-0.3]]);
var pr2 =  BEZIER(S0)([[0.5,0,0.3],[0.5,0,-0.3]]);
var sup_presa1 = BEZIER(S1)([pr1,pr2]);
var pr3 = BEZIER(S0)([[0.5,0.3,0.3],[-0.2,0.3,0.3],[-0.2,0.3,-0.3],[0.5,0.3,-0.3]]);
var pr4 =  BEZIER(S0)([[0.5,0.3,0.3],[0.5,0.3,-0.3]]);
var sup_presa2 = BEZIER(S1)([pr3,pr4]);
var pr = COLOR(0,0,0)(TRANSLATE([0,1])([5.9,-3.15])(MAP(BEZIER(S2)([sup_presa1,sup_presa2]))(dom3D)));

var z1 = BEZIER(S0)([[0.5,0,0.2],[0.6,0,0.2],[0.7,0,0.2],[0.7,0,0.15]]);
var z2 = BEZIER(S0)([[0.5,0,0.1],[0.6,0,0.1],[0.7,0,0.1],[0.7,0,0.15]]);
var sz1 = CUBIC_HERMITE(S1)([z1,z2,[0,0.15,0],[0,-0.15,0]]);
var sz2 = CUBIC_HERMITE(S1)([z1,z2,[0,-0.15,0],[0,0.15,0]]); 
var map_sz1 = MAP(sz1)(dom2D);
var map_sz2 = MAP(sz2)(dom2D);
var el = STRUCT([map_sz1,map_sz2]);
var ele = COLOR([81/255,88/255,91/255])(STRUCT([TRANSLATE([0,1])([5.9,-2.99])(el),TRANSLATE([0,1,2])([5.9,-2.99,-0.28])(el)]));

var presa = TRANSLATE([1,2])([0.08,0.15])(STRUCT([pr,ele]));

var filo = STRUCT([fil,presa]);



var model = STRUCT([base_acciaio,anellino,base_vetro,parte_alta,viti,
					base_fungo,anello,cappello_fungo, lampadine, interruttore,bull,filo]);

DRAW(model);