var domain = INTERVALS(1)(20);
var dom2D = DOMAIN([[0,1], [0,1]])([20, 20]);
var dom3D = DOMAIN([[0,1], [0,1], [0,1]])([14,14,14]);

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


DRAW(armchair);


