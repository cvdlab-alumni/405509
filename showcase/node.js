!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {
     /* SHOWCASE : modellazione di un' arpa */
    /* Astolfi Cristiana , mat 405509 */

    var dom1D = INTERVALS(1)(64);
    var dom2D = PROD1x1([INTERVALS(1)(64),INTERVALS(1)(64)]);
    var domain = DOMAIN([[0,1],[0,2*PI]])([64,64]);

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

    function capitello(){

      var cap = BEZIER(S0)([[0.82-0.42,0,5.81], [0.82-0.42,0,5.48+0.68], [1.23-0.42,0,5.09+0.68], [1.13-0.42,0,5.49+0.68]]);
      var mapping1 = ROTATIONAL_SURFACE(cap);
      var capitello = COLOR([0.48,0.11,0.0078])(TRANSLATE([0,1])([0.42,0.175])(MAP(mapping1)(domain)));
      return capitello;
    };

    function telaio(){
      /* struttura superiore curva */

      //curva superiore
      var curva_s1 = BEZIER(S0)([[0.82,0,5.81], [2.24,0,5.64], [2.44,0,4.48], [3.18,0,3.29],[3.7,0,2.5], [3.78,0,1.85], [5.48,0,2.81]]);
      var curva_s1d = BEZIER(S0)([[0.82,0.35,5.81], [2.24,0.35,5.64], [2.44,0.35,4.48], [3.18,0.35,3.29],[3.7,0.35,2.5], [3.78,0.35,1.85], [5.48,0.35,2.81]]);

      // curva inferiore
      var curva_s2 = BEZIER(S0)([[0.82,0,5.13], [1.98,0, 5.04], [2.72,0, 2.91], [2.83,0, 2.63],[3.6,0, 1.37], [4.03,0, 1.66], [5.7,0, 2.55]]);
      var curva_s2d = BEZIER(S0)([[0.82,0.35,5.13], [1.98,0.35, 5.04], [2.72,0.35, 2.91], [2.83,0.35, 2.63],[3.6,0.35, 1.37], [4.03,0.35, 1.66], [5.7,0.35, 2.55]]);

      //curva rientrata superiore
      var curva_s3 = BEZIER(S0)([[0.82,0.03,5.13], [1.98,0.03, 5.04], [2.72,0.03, 2.91], [2.83,0.03, 2.63],[3.6,0.03, 1.37], [4.03,0.03, 1.66], [5.7,0.03, 2.55]]);
      var curva_s3d = BEZIER(S0)([[0.82,0.32,5.13], [1.98,0.32, 5.04], [2.72,0.32, 2.91], [2.83,0.32, 2.63],[3.6,0.32, 1.37], [4.03,0.32, 1.66], [5.7,0.32, 2.55]]);

      // curva rientrata inferiore
      var curva_s4 = BEZIER(S0)([[0.82,0.03, 4.05], [1.84,0.03, 3.78], [2.08,0.03, 2.83], [2.76,0.03, 1.84],[3.56,0.03, 0.88], [4.01,0.03, 1.31], [5.78,0.03, 2.36]]);
      var curva_s4d = BEZIER(S0)([[0.82,0.32, 4.05], [1.84,0.32, 3.78], [2.08,0.32, 2.83], [2.76,0.32, 1.84],[3.56,0.32, 0.88], [4.01,0.32, 1.31], [5.78,0.32, 2.36]]);

      /* superfici struttura superiore */

      var sup1 = BEZIER(S1)([curva_s1,curva_s1d]);
      var sup2 = BEZIER(S1)([curva_s2,curva_s2d]);

      var l1 = BEZIER(S1)([curva_s1,curva_s2]);
      var l1d = BEZIER(S1)([curva_s1d,curva_s2d]);

      var map_sup1 = MAP(sup1)(dom2D);
      var map_sup2 = MAP(sup2)(dom2D);
      var map_l1 = MAP(l1)(dom2D);
      var map_l1d = MAP(l1d)(dom2D);

      var sup_struct = COLOR([0.48,0.11,0.0078])(STRUCT([map_sup1,map_sup2,map_l1,map_l1d]));

      /* superfici struttura superiore con rientro */

      var sup4 = BEZIER(S1)([curva_s4,curva_s4d]);

      var l2 = BEZIER(S1)([curva_s3,curva_s4]);
      var l2d = BEZIER(S1)([curva_s3d,curva_s4d]);

      var map_sup4 = MAP(sup4)(dom2D);
      var map_l2 = MAP(l2)(dom2D);
      var map_l2d = MAP(l2d)(dom2D);

      var rsup_struct = COLOR([0.94,0.90,0.50])(STRUCT([map_sup4,map_l2,map_l2d]));

      /* Curva di giunzione */

      var c1 = BEZIER(S0)([[5.48,0,2.81], [5.81,0, 3.01], [6.58,0, 2.74], [6.26,0, 2.13]]);
      var c1d = BEZIER(S0)([[5.48,0.35,2.81], [5.81,0.35,3.01], [6.58,0.35,2.74], [6.26,0.35,2.13]]);

      var c2 = BEZIER(S0)([[5.48,0.175, 2.81],  [6.24,0.175, 3.28], [6.69,0.175, 2.77], [6.48,0.175, 2.08]]); //rialzo curva

      var c3 = BEZIER(S0)([[5.78,0.03, 2.36], [6,0.03, 2.5], [6.08,0.03,2.29], [5.98,0.03,2.18]]);
      var c3d = BEZIER(S0)([[5.78,0.32, 2.36], [6,0.32, 2.5], [6.08,0.32,2.29], [5.98,0.32,2.18]]);

      var sup_123 = BEZIER(S1)([c1,c2,c1d]);
      var sup_133d = BEZIER(S1)([c1,c3]);
      var sup_33d = BEZIER(S1)([c3,c3d]);
      var sup_3d1d = BEZIER(S1)([c3d,c1d]);

      var map_123 = MAP(sup_123)(dom2D);
      var map_133d= MAP(sup_133d)(dom2D);
      var map_33d= MAP(sup_33d)(dom2D);
      var map_3d1d= MAP(sup_3d1d)(dom2D);

      var giunzione = COLOR([0.48,0.11,0.0078])(STRUCT([map_123,map_133d, map_33d,map_3d1d]));

      /* Asse trasversale destro */

      var a1 = BEZIER(S0)([[6.26,0, 2.13], [3.85,-0.55, -0.99], [2.85,-0.75, -2.65], [0.82,-0.95, -5.31]]);
      var a1d = BEZIER(S0)([[6.26,0.35,2.13], [3.85,0.55+0.175, -0.99], [2.85,0.75+0.175, -2.65], [0.82,0.95+0.175, -5.31]]);

      var a2 = BEZIER(S0)([[6.48,0.175, 2.08], [4.39,0.175, -1.22], [3.13,0.175, -2.9], [1.66,0.175,-5.27]]); // curvatura asse

      var a3 = BEZIER(S0)([[5.98,0.03,2.18], [3.36,-0.52, -1.68], [2.57,-0.72, -2.88], [0.82,-0.92, -5.31]]);
      var a3d = BEZIER(S0)([[5.98,0.32,2.18], [3.36,0.52+0.175, -1.68], [2.57,0.72+0.175, -2.88], [0.82,0.92+0.175, -5.31]]);

      var sup_a121d = BEZIER(S1)([a1,a2,a1d]);
      var sup_a31 = BEZIER(S1)([a3,a1]);
      var sup_a33d = BEZIER(S1)([a3,a3d]);
      var sup_a1d3d = BEZIER(S1)([a1d,a3d]);

      var map0 = COLOR([0.48,0.11,0.0078])(MAP(sup_a121d)(dom2D));
      var map1 = COLOR([0.48,0.11,0.0078])(MAP(sup_a31)(dom2D));
      var map2 = COLOR([0.48,0.11,0.0078])(MAP(sup_a1d3d)(dom2D));
      var map3 = COLOR([0.94,0.90,0.50])(MAP(sup_a33d)(dom2D));

      var asse = STRUCT([map0,map1,map2,map3]);

      /* Colonna */

      var colonna = TRANSLATE([0,1,2])([0.42,0.175,-5.32])(COLOR([0.48,0.11,0.0078])(EXTRUDE([5.83+5.31])(arc (2*PI, 0, 0.40))));
      var chiusura = BEZIER(S0)([[1.13-0.42,0,5.49+0.68],[1.13-0.42,0, 5.52+0.68], [1.15-0.42,0, 5.62+0.68], [0,0, 5.61+0.68]])
      var mapping2 = ROTATIONAL_SURFACE(chiusura);
      var chiu = COLOR([0.48,0.11,0.0078])(TRANSLATE([0,1])([0.42,0.175])(MAP(mapping2)(domain)));

      var telaio = STRUCT([sup_struct,rsup_struct,giunzione,asse,colonna,capitello(),chiu]);
      return telaio;
    };

    function pedale(){

        var p1 = BEZIER(S0)([[1.95, -5.32,0], [2.73, -5.22,0], [2.82, -5.51,0], [3.14, -5.11,0]]);
        var p2 = BEZIER(S0)([[1.95, -5.15,0], [2.78, -5.33,0], [2.85, -4.92,0], [3.14, -5.11,0]]);
        var p3 = BEZIER(S0)([[2.07,-5.235, -0.35], [2.7,-5.275, -0.3], [2.82,-5.215 ,-0.51], [3.14,-5.11, -0.11]]);

        var sp1 = BEZIER(S1)([p1,p2]);
        var sp2 = BEZIER(S1)([p1,p3,p2]);

        var map_p1= MAP(sp1)(dom2D);
        var map_p2= MAP(sp2)(dom2D);

        var pedale = COLOR([1,0.84,0])(TRANSLATE([0,1,2])([-0.3,5.3,-5])(STRUCT([map_p1,map_p2])));
        return pedale;
    };

    function base(){

      var base = TRANSLATE([0,1,2])([0.42,0.175,-5.32])(COLOR([0.48,0.11,0.0078])(EXTRUDE([0.5])(arc (2*PI, 0, 1.5))));
      var appoggio = ROTATE([1,2])(PI)(capitello());
      var trasla_app = TRANSLATE([0,1,2])([0,0.35,1.36])(appoggio);

      var pedale1= R([0,1])(PI/18.0)(pedale());
      var pedale2 = R([0,1])(-PI/18.0)(pedale());

      var struct_base = STRUCT([base,trasla_app,pedale(),pedale1,pedale2]);
      return struct_base;
    };

    function corde(){

      var c1 = POLYLINE([[1.3,0.03, 4.49], [1.3,0.03, -5]]);
      var c2 = POLYLINE([[1.5,0.03, 4.28],[1.5,0.03, -4.4]]);
      var c3 = POLYLINE([[1.7,0.03, 4],[1.7,0.03, -4.2]]);
      var c4 = POLYLINE([[1.9,0.03, 3.85],[1.9,0.03, -4.2]]);
      var c5 = POLYLINE([[2.1,0.03, 3.60],[2.1,0.03, -3.8]]);
      var c6 = POLYLINE([[2.3,0.03, 3.32],[2.3,0.03, -3.6]]);
      var c7 = POLYLINE([[2.5,0.03, 3],[2.5,0.03, -3.4]]);
      var c8 = POLYLINE([[2.7,0.03, 2.60],[2.7,0.03, -3]]);
      var c9 = POLYLINE([[2.9,0.03, 2.30],[2.9,0.03, -2.6]]);
      var c10 = POLYLINE([[3.1,0.03,2.10],[3.1,0.03, -2]]);
      var c11 = POLYLINE([[3.3,0.03, 1.90],[3.3,0.03, -1.8]]);
      var c12 = POLYLINE([[3.5,0.03, 1.75],[3.5,0.03, -1.5]]);
      var c13 = POLYLINE([[3.7,0.03, 1.7],[3.7,0.03, -1.3]]);
      var c14 = POLYLINE([[3.9,0.03, 1.65],[3.9,0.03, -1]]);
      var c15 = POLYLINE([[4.1,0.03, 1.7],[4.1,0.03, -0.8]]);
      var c16 = POLYLINE([[4.3,0.03, 1.75],[4.3,0.03, -0.6]]);
      var c17= POLYLINE([[4.5,0.03, 1.83],[4.5,0.03, -0.4]]);
      var c18= POLYLINE([[4.7,0.03, 1.89],[4.7,0.03, -0.1]]);
      var c19= POLYLINE([[4.9,0.03, 1.95],[4.9,0.03, 0.2]]);
      var c20= POLYLINE([[5.1,0.03, 2.1],[5.1,0.03, 0.4]]);
      var c21= POLYLINE([[5.3,0.03, 2.2],[5.3,0.03, 0.7]]);
      var c22= POLYLINE([[5.5,0.03, 2.3],[5.5,0.03, 0.9]]);

      var corde = STRUCT([c1,c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22]);
      var chiodi = COLOR([1,0.84,0])(POLYPOINT([[1.3,0.03, 4.49],[1.5,0.03, 4.28],[1.7,0.03, 4],[1.9,0.03, 3.85],[2.1,0.03, 3.60],
                  [2.3,0.03, 3.32],[2.5,0.03, 3],[2.7,0.03, 2.60],[2.9,0.03, 2.30],[3.1,0.03,2.10],
                  [3.3,0.03, 1.90],[3.5,0.03, 1.75],[3.7,0.03, 1.7],[3.9,0.03, 1.65],[4.1,0.03, 1.7],
                  [4.3,0.03, 1.75],[4.5,0.03, 1.83],[4.7,0.03, 1.89], [4.9,0.03, 1.95],[5.1,0.03, 2.1],
                  [5.3,0.03, 2.2],[5.5,0.03, 2.3]]));

      var struct_corde_chiodi = STRUCT([corde,chiodi]);
      return struct_corde_chiodi;

    };

    var model = STRUCT([telaio(),base(),corde()]);


  return model
  })();

  exports.author = 'astolfiC';
  exports.category = 'musical instruments';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));