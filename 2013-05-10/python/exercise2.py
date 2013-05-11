# HOMEWORK 2 - ASTOLFI CRISTIANA -
#
# 2013-05-10
# 
# Modello: FERRARI F430 SCUDERIA
# Le immagini del modellino prescelto sono state caricate nella cartella images come richiesto.
#
from pyplasm import *
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
VIEW(model)


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
VIEW(t_model_3D)