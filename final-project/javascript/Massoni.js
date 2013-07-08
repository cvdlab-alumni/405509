var domain = INTERVALS(1)(20);
var dom2D = DOMAIN([[0,1], [0,1]])([20, 20]);
var dom3D = DOMAIN([[0,1], [0,1], [0,1]])([10,10,10]);
var dom_circolare = DOMAIN([[0,1],[0,2*PI]])([30,30]);

/* Arco di circonferenza bidimensionale parametrico rispetto a due raggi */
function arc (alpha, r, R){
	var domain = DOMAIN([[0,alpha],[r,R]])([30,1]);
	
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

var bullone = function (){

	var base = EXTRUDE([0.05])(arc(2*PI,0.075,0.15));
	var a_l = TRANSLATE([2])([0.05])(EXTRUDE([0.02])(arc(2*PI,0,0.10)));
	var a_l2 =  TRANSLATE([2])([0.05])(EXTRUDE([0.0089])(arc(2*PI,0.10,0.14)));
	var bullone = COLOR(0,0,0)(STRUCT([base,a_l,a_l2]));
	return bullone;
};

var brumbury_lamp = function (){

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

	return model;

};

var dinner_table = function() {

	var t1 = BEZIER(S0)([[0,0,5.5],[4.5,0,5.5],[4.7,0,5.45],[4.7,0,5.35],[4.5,0,5.3],
						[1.5,0,5.3],[-1,0,5.3],[-1.2,0,4.7],[0.5,0,1.5],[0.2,0,0.5],[-0.5,0,-0.5],
						[2.4,0,0.2],[2.9,0,0.9],[2.8,0,-0.2],[2.4,0,0],[0,0,0]]);

	var table = COLOR([0.7,0.29,0])(creaSolidoRotazione(t1,dom_circolare));

	return table;
};

var leather_armchair = function(){

	/* sponda laterale dx */
	var c1 = BEZIER(S0)([[2.71,0,4.06], [2.58,0, 4.57], [3.67,0.1, 4.36], [3.90,1.5, 4.32],
						[3.20,1.5, 4.32], [3.20,4.1, 4.72], [3.20,3.30, 5.48], [3.20,4.38, 5.32]]); // curva esterna superiore
	var c2 = BEZIER(S0)([[2.71, 0, 2.7], [2.58,0, 2.68], [3.67,0.1, 2.69], [3.90,1.5, 2.8],
						[3.20,1.5, 2.8], [3.20,4.1, 2.86], [3.20,4.17, 2.78], [3.20,4.38, 2.88]]); // curva estarna inferiore
	var sup1 = MAP(BEZIER(S1)([c1,c2]))(dom2D); // sup esterna

	var c3 = BEZIER(S0)([[2.71,0,4],[2.71,1.5, 4.32], [2.71,4.1, 4.72], [2.71,4.17, 5.38], [2.71,4.38, 5.32]]); // curva interna superiore
	var c4 = BEZIER(S0)([[2.71, 0, 2.7],[2.71,1.5, 2.8], [2.71,4.1, 2.86], [2.71,4.17, 2.78], [2.71,4.38, 2.88]]); // curva interna inferiore
	var sup2 = MAP(BEZIER(S1)([c3,c4]))(dom2D); // sup interna

	var sup3 = CUBIC_HERMITE(S1)([c1,c3,[0,0,1.5],[0,0,-1.5]]);
	var sup4 = BEZIER(S1)([c2,c4]);
	var m_sup3 = MAP(sup3)(dom2D); // sup superiore bracciolo
	var m_sup4 = MAP(sup4)(dom2D); // superficie inferiore
	var sup5 = MAP(BEZIER(S2)([sup3,sup4]))(dom3D); // riempimento

	var laterale_dx = STRUCT([sup1,sup2,m_sup3,m_sup4,sup5]);

	/* sponda laterale sx */

	var c1sx = BEZIER(S0)([[-(2.71-2.71),0,4.06], [-(2.58-2.71),0, 4.57], [-(3.67-2.71),0.1, 4.36], [-(3.90-2.71),1.5, 4.32],
						[-(3.20-2.71),1.5, 4.32], [-(3.20-2.71),4.1, 4.72], [-(3.20-2.71),3.30, 5.48], [-(3.20-2.71),4.38, 5.32]]); // curva esterna superiore
	var c2sx = BEZIER(S0)([[-(2.71-2.71), 0, 2.7], [-(2.58-2.71),0, 2.68], [-(3.67-2.71),0.1, 2.69], [-(3.90-2.71),1.5, 2.8],
						[-(3.20-2.71),1.5, 2.8], [-(3.20-2.71),4.1, 2.86], [-(3.20-2.71),4.17, 2.78], [-(3.20-2.71),4.38, 2.88]]); // curva estarna inferiore

	var c3sx = BEZIER(S0)([[-(2.71-2.71),0,4],[-(2.71-2.71),1.5, 4.32], [-(2.71-2.71),4.1, 4.72], [-(2.71-2.71),4.17, 5.38], [-(2.71-2.71),4.38, 5.32]]); // curva interna superiore
	var c4sx = BEZIER(S0)([[-(2.71-2.71), 0, 2.7],[-(2.71-2.71),1.5, 2.8], [-(2.71-2.71),4.1, 2.86], [-(2.71-2.71),4.17, 2.78], [-(2.71-2.71),4.38, 2.88]]); // curva interna inferiore

	var sup3sx = CUBIC_HERMITE(S1)([c1sx,c3sx,[0,0,1.5],[0,0,-1.5]]);
	var sup4sx = BEZIER(S1)([c2sx,c4sx]);

	var sup5sx = MAP(BEZIER(S2)([sup3sx,sup4sx]))(dom3D); // riempimento

	var laterale_sx = STRUCT([sup5sx]);

	var laterali = TRANSLATE([1,2])([-2.88,-2.8])(STRUCT([laterale_dx,laterale_sx]));

	/* parte posteriore */

	/*var p1 = BEZIER(S0)([[2.71,4.38, 5.32],[2.71,4.38, 2.88]]);
	var p2 = BEZIER(S0)([ [-(2.71-2.71),4.38, 5.32],[-(2.71-2.71),4.38, 2.88]]);
	var posteriore1 = TRANSLATE([1,2])([-2.88,-2.8])(MAP (BEZIER(S1)([p1,p2]))(dom2D));*/

	var p1 = BEZIER(S0)([[0,1.5, 0.08],[0,1.5, 2.44]]);
	var p2 = BEZIER(S0)([[0+2.71,1.5, 0.08],[0+2.71,1.5, 2.44]]);
	var posteriore1 = BEZIER(S1)([p1,p2]);

	var p3 = BEZIER(S0)([[0,1.5,2.44],[0,1.75,3.25],[0,0.5,3.25],[0,0.75,2.44],
						[0,0.64,2.25],[0,0.63,2],[0,0.875,1.48],[0,0.875,0.75],[0,0.625,0.875],[0,0.5,0.625],[0,0.5,0]]);
	var p4 = BEZIER(S0)([[0+2.71,1.5,2.44],[0+2.71,1.75,3.25],[0+2.71,0.5,3.25],[0+2.71,0.75,2.44],
						[0+2.71,0.64,2.25],[0+2.71,0.63,2],[0+2.71,0.875,1.48],[0+2.71,0.875,0.75],
						[0+2.71,0.625,0.875],[0+2.71,0.5,0.625],[0+2.71,0.5,0]]);
	/*var posteriore2 = MAP (BEZIER(S1)([p3,p4]))(dom2D);*/
	var posteriore2 = BEZIER(S1)([p3,p4]);
	var posteriore = MAP(BEZIER(S2)([posteriore1,posteriore2]))(dom3D);

	var b1 = BEZIER(S0)([[0,0.5,0],[0+2.71,0.5,0]]);
	var b2 = BEZIER(S0)([[0,1.5,0.08],[0+2.71,1.5,0.08]]);
	var base = MAP(BEZIER(S1)([b1,b2]))(dom2D);

	var post = STRUCT([posteriore,base]);

	/* Sedile */

	var s1 = BEZIER(S0)([[0,0.75,0.625],[0,-2.32,0.625],[0,-2.75,0.25],[0,-2.87,1.125]]);
	var s2 = BEZIER(S0)([[0,-2.87,1.125],[0,-3,1.5],[0,-2.25,1.5],[0,0.875,1.48]]);

	var s3 = BEZIER(S0)([[0+2.71,0.75,0.625],[0+2.71,-2.32,0.625],[0+2.71,-2.75,0.25],[0+2.71,-2.87,1.125]]);
	var s4 = BEZIER(S0)([[0+2.71,-2.87,1.125],[0+2.71,-3,1.5],[0+2.71,-2.25,1.5],[0+2.71,0.875,1.48]]);

	var seat1 = BEZIER(S1)([s1,s2]);
	var seat2 = BEZIER(S1)([s3,s4]);

	var seat = MAP(BEZIER(S2)([seat1,seat2]))(dom3D);

	var armchair = COLOR([0.94,0.90,0.50])(STRUCT([laterali,post,seat]));
	return armchair;

};

var tLampada = SCALE([0,1,2])([0.7,0.7,0.7])(TRANSLATE([2])([7.8])(brumbury_lamp()));

var scaleArmch = SCALE([0,1,2])([2,2,2])(TRANSLATE([0])([4.5])(leather_armchair()));
var tArmch = STRUCT([scaleArmch,TRANSLATE([0])([-23])(scaleArmch)]);

var pavimento = COLOR([238/255,138/255,50/255])(TRANSLATE([0,1,2])([-24,-24,-0.2])(CUBOID([48,48,0.2])));
var parete1 = COLOR([243/255,194/255,151/255])(TRANSLATE([0,1])([-24,24])(CUBOID([48,0.05,24])));
var parete2 = COLOR([243/255,194/255,151/255])(TRANSLATE([0,1])([-24,-24])(CUBOID([0.05,48,24])));
var parete3 = COLOR([243/255,194/255,151/255])(TRANSLATE([0,1])([24,-24])(CUBOID([0.05,48,24])));

var environment = STRUCT([pavimento,parete1,parete2,parete3]);

var MassoniDesign = STRUCT([tLampada, dinner_table(), tArmch, environment]);

DRAW(MassoniDesign);