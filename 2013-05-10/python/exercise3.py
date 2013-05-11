%cpaste
from pyplasm import *
import scipy
from  scipy import*

# HOMEWORK 2 - ASTOLFI CRISTIANA -
#
# 2013-05-10
# 
# Modello: FERRARI F430 SCUDERIA
# Le immagini del modellino prescelto sono state caricate nella cartella images come richiesto.
#

dom1D = INTERVALS(1)(64)

# Proiezione del modello sull'asse x y ( visione dall'alto)

c1 = BEZIER(S1)([[8.7,0],[8.9,3.8],[7.6,3.1],[6.8,3.8],[4.2,3.9],[3.8,3.7]])
c2 = BEZIER(S1)([[3.8,3.7],[1.1,3.6],[-1.1,3.6],[-5.7,3.7]])
c3 = BEZIER(S1)([[-9,0],[-8.8,1],[-8.9,3.5],[-5.7,3.7]])

map_c1 = MAP(c1)(dom1D)
map_c2 = MAP(c2)(dom1D)
map_c3 = MAP(c3)(dom1D)

half_prof_dx = STRUCT([map_c1,map_c2,map_c3])
half_prof_sx = R([2,3])(PI)(half_prof_dx)

prof_xy = STRUCT([half_prof_dx,half_prof_sx])
#VIEW(prof_xy)

# Proiezione del modello sull'asse y z
# Essendo stato scelto di modellare il muso della macchina (piu largo rispetto al centro della macchina)
# la sagoma del modello sull'asse x y ricade all'interno della sagoma su y z
c5 = BEZIER(S1)([[0,4.0,0],[0,4.2,1],[0,3.9,0.8],[0,3.8,1]])
c6 = BEZIER(S1)([[0,3.8,1],[0,4.7,0.7],[0,4.7,1.6],[0,3.7,1.4],[0,3.6,1.3]])
c7 = BEZIER(S1)([[0,3.6,1.3],[0,3.7,1.3],[0,3.8,1.4],[0,3.0,1.5]])
c8 = BEZIER(S1)([[0,3.0,1.5],[0,2.4,2.8],[0,2.5,2.1],[0,1,2.7],[0,0,2.6]])
c9 = BEZIER(S1)([[0,4.0,0],[0,4.0,-2.3]])
c10 = BEZIER(S1)([[0,4.0,-2.3],[0,4.0,-2.4],[0,3.3,-2.7],[0,3,-2.4]])
c11 = BEZIER(S1)([[0,3,-2.4],[0,2.8,-1.6],[0,3.2,-2.1],[0,0,-2]])


map_c5 = MAP(c5)(dom1D)
map_c6 = MAP(c6)(dom1D)
map_c7 = MAP(c7)(dom1D)
map_c8 = MAP(c8)(dom1D)
map_c9 = MAP(c9)(dom1D)
map_c10 = MAP(c10)(dom1D)
map_c11 = MAP(c11)(dom1D)

half_prof_dy = STRUCT([map_c5,map_c6,map_c7,map_c8,map_c9,map_c10,map_c11])
half_prof_sy = R([1,2])(PI)(half_prof_dy)

prof_yz = STRUCT([half_prof_dy,half_prof_sy])
#VIEW(prof_yz)

# Proiezione del modello sull'asse x z
xz1 = BEZIER(S1)([[-8.0,0,0],[-7.2,0,0.2],[-6.5,0,0.9],[-4.1,0,1]])
xz2 = BEZIER(S1)([[-4.1,0,1],[-0.9,0,2.2],[-0.8,0,3.3],[7.9,0,1.3]])
xz3 = BEZIER(S1)([[7.9,0,1.3],[8.7,0,1.4],[8.1,0,1.8],[8.6,0,0.2]])
xz4 = BEZIER(S1)([[8.6,0,0.2],[8.7,0,-0.2],[9,0,-0.4],[8.4,0,0]])
xz5 = BEZIER(S1)([[8.4,0,0],[9.1,0,-1.4],[7.7,0,-2.2],[7,0,-1.9]])
xz6 = BEZIER(S1)([[7,0,-1.9],[7.5,0,1],[3.8,0,1.8],[4,0,-1.8]])
xz7 = BEZIER(S1)([[4,0,-1.8],[3.6,0,-1.9],[-0.4,0,-1.9],[-3.3,0,-1.8]])
xz8 = BEZIER(S1)([[-3.3,0,-1.8],[-3.2,0,1.3],[-6.3,0,0.7],[-6.1,0,-1.7]])
xz9 = BEZIER(S1)([[-6.1,0,-1.7],[-10,0,-1.8],[-8.8,0,-1.4],[-9,0,-0.5]])
xz10 = BEZIER(S1)([[-9,0,-0.5],[-8.0,0,0]])

map_xz1 =MAP(xz1)(dom1D)
map_xz2 =MAP(xz2)(dom1D)
map_xz3 =MAP(xz3)(dom1D)
map_xz4 =MAP(xz4)(dom1D)
map_xz5 =MAP(xz5)(dom1D)
map_xz6 =MAP(xz6)(dom1D)
map_xz7 =MAP(xz7)(dom1D)
map_xz8 =MAP(xz8)(dom1D)
map_xz9 =MAP(xz9)(dom1D)
map_xz10 =MAP(xz10)(dom1D)


prof_xz = STRUCT([map_xz1,map_xz2,map_xz3,map_xz4,map_xz5,map_xz6,map_xz7,map_xz8, map_xz9,map_xz10])


model = STRUCT([prof_xy,prof_yz,prof_xz])
#VIEW(model)


# Modellino pseudo 3D

d1 = BEZIER(S1)([[-9,0,-0.5],[-11,0.5,-0.5],[-11,6,-0.5],[-9,7.5,-0.5]])
map_d1 = MAP(d1)(dom1D)

d2 = BEZIER(S1)([[-4.1,0,1],[-6,0.5,1],[-6,6,1],[-4.1,7.5,1]])
map_d2 = MAP(d2)(dom1D)

d3 = BEZIER(S1)([[7.9,0,1.3],[7.9,7.5,1.3]])
map_d3 = MAP(d3)(dom1D)

d4 = BEZIER(S1)([[8.4,0,0],[8.4,7.5,0]])
map_d4 = MAP(d4)(dom1D)

d5 = BEZIER(S1)([[7,0,-1.9],[7,7.5,-1.9]])
map_d5 = MAP(d5)(dom1D)

d6 = BEZIER(S1)([[4,0,-1.8],[4,7.5,-1.8]])
map_d6 = MAP(d6)(dom1D)

d7 = BEZIER(S1)([[-3.3,0,-1.8],[-3.3,7.5,-1.8]])
map_d7 = MAP(d7)(dom1D)

d8 = BEZIER(S1)([[-6.1,0,-1.7],[-6.1,7.5,-1.7]])
map_d8 = MAP(d8)(dom1D)

d9 = BEZIER(S1)([[-8.95,0,-1.5],[-11,0.5,-1.5],[-11,6,-1.5],[-8.95,7.5,-1.5]])
map_d9 = MAP(d9)(dom1D)

d10 = BEZIER(S1)([[8.3,0,1.4],[8.8,0.5,1.4],[8.8,6,1.4],[8.3,7.5,1.4]])
map_d10 = MAP(d10)(dom1D)

d11 = BEZIER(S1)([[8.0,0,-1.7],[8.3,0.5,-1.7],[8.3,6,-1.7],[8.0,7.5,-1.7]])
map_d11 = MAP(d11)(dom1D)

model_3D = STRUCT([prof_xz,T([2])(7.5)(prof_xz),map_d1,map_d2,map_d3,map_d4,map_d5,map_d6,map_d7,map_d8, map_d9, map_d10, map_d11])
t_model_3D = T([2])([-3.7])(model_3D)
#VIEW(t_model_3D)

# FUNZIONI PER PERFEZIONARE LA SUDDIVISIONE DEL DOMINIO, E QUINDI LA VISUALIZZAZIONE DELL'OGGETTO		
def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel


def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to V in order
        to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))


# Questa funzione mi permette di ottenere un dominio simpliciale(triangolare)
def GRID (args):
	model= ([[]],[[0]])
	for k,step in enumerate(args):
		model = larExtrude(model,step*[1])
	V, cells = model
	verts = AA(list)(scipy.array(V)/AA(float)(args))
	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])


dom2D = GRID([25,25])
#dom2D = MAP([S2,S1])(dom)

# Funzione che crea una ruota di raggi [r_min,r_max], di spessore=[s_in,s_out] centrata in points=[x,y,z] con Hermite
# pneumatico ([x,y,z])([r_min,r_max])([s_in,s_out])(sub)
def pneumatico (points):
	x,y,z = points
	def radius(raggi):
		r_min,r_max = raggi
		def spessore (spess):
			s_in, s_out = spess
			def subdivision(sub):
				N = sub
				domain = INTERVALS(1)(sub)
				#dom2D = PROD([domain,domain])
				# cerchio interno
				c1 = CUBICHERMITE(S1)([[x+r_min,y,z],[x,y+r_min,z],[0,+1.6568*r_min,0],[-1.6568*r_min,0,0]]) # 1 quadrante
				c2 = CUBICHERMITE(S1)([[x+r_min,y,z],[x,y-r_min,z],[0,-1.6568*r_min,0],[-1.6568*r_min,0,0]]) # 2 quadrante
				c3 = CUBICHERMITE(S1)([[x-r_min,y,z],[x,y-r_min,z],[0,-1.6568*r_min,0],[+1.6568*r_min,0,0]]) # 3 quadrante
				c4 = CUBICHERMITE(S1)([[x-r_min,y,z],[x,y+r_min,z],[0,+1.6568*r_min,0],[+1.6568*r_min,0,0]]) # 4 quadrante
				#struct_circleMin = STRUCT([MAP(c1)(domain), MAP(c2)(domain), MAP(c3)(domain), MAP(c4)(domain)])
				# cerchio esterno
				c5 = CUBICHERMITE(S1)([[x+r_max,y,z],[x,y+r_max,z],[0,+1.6568*r_max,0],[-1.6568*r_max,0,0]]) # 1 quadrante
				c6 = CUBICHERMITE(S1)([[x+r_max,y,z],[x,y-r_max,z],[0,-1.6568*r_max,0],[-1.6568*r_max,0,0]]) # 2 quadrante
				c7 = CUBICHERMITE(S1)([[x-r_max,y,z],[x,y-r_max,z],[0,-1.6568*r_max,0],[+1.6568*r_max,0,0]]) # 3 quadrante
				c8 = CUBICHERMITE(S1)([[x-r_max,y,z],[x,y+r_max,z],[0,+1.6568*r_max,0],[+1.6568*r_max,0,0]]) # 4 quadrante
				#struct_circleMax = STRUCT([MAP(c5)(domain), MAP(c6)(domain), MAP(c7)(domain), MAP(c8)(domain)])
				# superficie: a= superiore, b= posteriore; 1,2,3,4 rappresentano i quadranti
				sup1a = CUBICHERMITE(S2)([c1,c5,[0,0,s_in],[0,0,-s_out]])
				sup1b = CUBICHERMITE(S2)([c1,c5,[0,0,-s_in],[0,0,s_out]])
				sup2a = CUBICHERMITE(S2)([c2,c6,[0,0,s_in],[0,0,-s_out]])
				sup2b = CUBICHERMITE(S2)([c2,c6,[0,0,-s_in],[0,0,+s_out]])
				sup3a = CUBICHERMITE(S2)([c3,c7,[0,0,s_in],[0,0,-s_out]]) 
				sup3b = CUBICHERMITE(S2)([c3,c7,[0,0,-s_in],[0,0,+s_out]])
				sup4a = CUBICHERMITE(S2)([c4,c8,[0,0,s_in],[0,0,-s_out]]) 
				sup4b = CUBICHERMITE(S2)([c4,c8,[0,0,-s_in],[0,0,s_out]])
				struct_superficie = STRUCT([MAP(sup1a)(dom2D),MAP(sup1b)(dom2D), MAP(sup2a)(dom2D), MAP(sup2b)(dom2D), MAP(sup3a)(dom2D), MAP(sup3b)(dom2D), MAP(sup4a)(dom2D), MAP(sup4b)(dom2D)])
				return struct_superficie
			return subdivision
		return spessore
	return radius

# Funzione che crea un cilindro centrato in [x,y,z]	
def cylinder(r, R, h) : 
	def coord(c) :
		x,y,z = c
		dom2D = PROD([INTERVALS(2*PI)(64), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
		def mapping (v) : 
			a = v[0]
			r = v[1]
			return [r*COS(a), r*SIN(a)]	
		model1 = PROD([MAP(mapping)(dom2D),Q(h/2)])
		model2 = PROD([MAP(mapping)(dom2D),Q(-h/2)])
		struct_model = STRUCT([model1,model2])
		res=T([1,2,3])([x,y,z])(struct_model)
		return res
	return coord

# Funzione che crea un cerchionencentrato in [x,y,z]: r,R,h sono i parametri del cerchio esterno  
# rin,Rin,hin sono i parametri del cerchio interno
def cerchione(origin):
	x,y,z=origin
	def cilindro_esterno(cilExt):
		r,R,h=cilExt
		def cilindro_interno(cilInt):
			rin,Rin,hin=cilInt	
			cilinInt=cylinder(rin,Rin,hin)([x,y,h/3])
			cilindroExtern=cylinder(r,R,h)([x,y,z])
			model = STRUCT([cilinInt,cilindroExtern])
			return model
		return cilindro_interno
	return cilindro_esterno

ruota =COLOR([0,0,0])(pneumatico([0,0,0])([1,1.3])([1,2])(20))
cerch = cerchione([0,0,0])([0.95,1.10,0.50])([0.03,0.25,0.1])

# Creo un raggio
dom1D = INTERVALS(1)(32)
r1 = BEZIER(S1)([[0.1,0.21,0.216],[0,0.25+0.2375,0.216+0.15],[0,0.25+0.6,0.216+0.15],[0.1,0.95,0.216]])
map_r1 = MAP(r1)(dom1D)

r2 = BEZIER(S1)([[-0.1,0.21,0.216],[0,0.25+0.2375,0.216+0.15],[0,0.25+0.6,0.216+0.15],[-0.1,0.95,0.216]])
map_r2 = MAP(r2)(dom1D)

r3 = BEZIER(S1)([[0.1,0.21,0.13],[0,0.25+0.2375,0.13+0.15],[0,0.25+0.6,0.13+0.15],[0.1,0.95,0.13]])
map_r3 = MAP(r3)(dom1D)

r4 = BEZIER(S1)([[-0.1,0.21,0.13],[0,0.25+0.2375,0.13+0.15],[0,0.25+0.6,0.13+0.15],[-0.1,0.95,0.13]])
map_r4 = MAP(r4)(dom1D)

sup_1 = BEZIER(S2)([r1,r2])
sup_r1 = MAP(sup_1)(dom2D)

sup_2 = BEZIER(S2)([r3,r4])
sup_r2 = MAP(sup_2)(dom2D)

sup_3 = BEZIER(S2)([r1,r3])
sup_r3 = MAP(sup_3)(dom2D)

sup_4 = BEZIER(S2)([r2,r4])
sup_r4 = MAP(sup_4)(dom2D)

raggio = STRUCT([sup_r1,sup_r2,sup_r3,sup_r4])
raggi = STRUCT(NN(10)([raggio,R([1,2])(2*PI/10)]))

modello_ruota = STRUCT([ruota,cerch,raggi])
#VIEW(modello_ruota)

ruota_vert = R([2,3])(PI/2) (modello_ruota)
post_sx = T([1,2,3])([5.4,-3.5,-1.1]) (ruota_vert)
post_dx = T([1,2,3])([5.4,+3.5,-1.1]) (R([1,2])(PI)(ruota_vert))
ant_sx = T([1])([-10.1])(post_sx)
ant_dx = T([1])([-10.1])(post_dx)
# modellino con ruote
macchina = STRUCT([model,post_sx,post_dx,ant_sx,ant_dx])
VIEW(macchina)
# modellino3D con ruote
macchina3D = STRUCT([t_model_3D,post_sx,post_dx,ant_sx,ant_dx])
VIEW(macchina3D)