#--------------------------------------------------------PILLARS---------------------------------------------------------------------------------

		# Ground floor pillars

# pilastri esterni a sezione rotonda 
pilastri_esterni = STRUCT(NN(5)([CYLINDER([1.25,25.0])(64),T([1])([27.5])]))

# pilastro interno a sezione rotonda
pilastro_interno = T([2])([52.5]) (CYLINDER([1.25,25.0])(64))

# pilastro esterno (non presente sulla piantina fornita) a sezione rotonda
pilastro = T([1])([110])(pilastro_interno)

# pilastri interni a sezione quadrata
pilastri_interni = INSR(PROD)(AA(QUOTE)([[-1.25,-12.0,-2.5,-10.5,2.5,-25.0,2.5,-25.0,2.5],[-51.25,2.5],[25.0]]))

# struttura dei pilastri al piano terra
pillars0 = STRUCT([pilastri_esterni, pilastro_interno, pilastro, pilastri_interni])
#VIEW(pillars0)

		# First floor pillars

# pilastri perimetrali 
pilastri_perimetrali = INSR(PROD)(AA(QUOTE)([[2.5,-25.0,2.5,-25.0,2.5,-25.0,2.5,-25.0,2.5],[2.5],[25.0]]))

# pilastri interni a sezione quadrata
pilastri_int_quad = INSR(PROD)(AA(QUOTE)([[2.5,-25.0,2.5,-25.0,2.5,-25.0,-2.5,-25.0,2.5],[-2.5,-50,2.5],[25.0]]))

# pilastro interno a sezione rotonda
pilastro_int_rot =	T([1,2])([83.75,53.75]) (CYLINDER([1.25,25])(64))

pillars1 = T([1,2,3])([-1.25,-1.25, 25])(STRUCT([pilastri_perimetrali,pilastri_int_quad, pilastro_int_rot]))
#VIEW(pillars1)

		# Second floor pillars

# pilastri perimetrali 
pilastri_perimetrali2 = INSR(PROD)(AA(QUOTE)([[2.5,-25.0,2.5,-25.0,2.5,-25.0,-2.5,-25.0,2.5],[2.5],[25]]))

# pilastri interni
pilastri_interni2 = INSR(PROD)(AA(QUOTE)([[2.5,-25.0,2.5,-25.0,2.5,-25.0,2.5,-25.0,2.5],[-2.5,-50,2.5],[25]]))

pillars2 = T([1,2,3])([-1.25,-1.25, 50.0])(STRUCT([pilastri_perimetrali2,pilastri_interni2]))
# VIEW(pillars2)

		# Third floor pillars

# pilastri perimetrali
pilastri_perimetrali3 = INSR(PROD)(AA(QUOTE)([[-2.5,-25.0,-2.5,-25.0,2.5,-25.0,-2.5,-25.0,2.5],[2.5],[25]]))

# pilastri interni a sezione quadrata maggiore
pilastri_interni3big = INSR(PROD)(AA(QUOTE)([[-2.5,-25.0,-2.5,-25.0,2.5,-25.0,2.5,-25.0,2.5],[-2.5,-50,2.5],[25]]))

# pilastri interni a sezione quadrata minore
pilastri_interni3small = INSR(PROD)(AA(QUOTE)([[1.5,-26.5,1.5],[-53.5,1.5],[25]]))

pillars3 = T([1,2,3])([-1.25,-1.25, 75.0])(STRUCT([pilastri_perimetrali3, pilastri_interni3big, pilastri_interni3small]))
# VIEW(pillars3)


#...................................................HORIZONTAL PARTITION --------------------------------------------------------------------

# Definizione solaio piano terra
partition0_a = INSR(PROD)(AA(QUOTE)([[-14.5,70.5],[-1.25,-22.15,2.5,26.6,2.5,9.5,2.5],[2.0]]))
partition0_b = INSR(PROD)(AA(QUOTE)([[-14.5,12.0],[-19.4,4],[2]]))
partition0_c = INSR(PROD)(AA(QUOTE)([[-14.5,-70.5,10.12],[-1.25,-22.15,-17.5,26.1],[2.0]]))
# definizione delle partizioni a semicerchio
partition0_d = T([1,2])([95.12, 53.95])(CYLINDER([13.05,2.0])(64))
partition0_e = T([1,2])([20.5, 19.4])(CYLINDER([6.0,2.0])(64))


floor0 = T([1,2])([-1.25, -1.25])(STRUCT([partition0_a, partition0_b, partition0_c, partition0_d, partition0_e]))


# Definizione solaio primo piano
partition1_a = INSR(PROD)(AA(QUOTE)([[112.5],[2.5,16.5],[3]]))
partition1_b = INSR(PROD)(AA(QUOTE)([[8.0, 35.3, -16, 53.2],[-2.5,-16.5,17.0],[3]]))
partition1_c = INSR(PROD)(AA(QUOTE)([[112.5],[-2.5,-16.5,-17.0, 18.0],[3]]))
partition1_d = INSR(PROD)(AA(QUOTE)([[25.28, -35.2, 52.02 ],[-2.5,-16.5,-17.0,-18.0, 10.5, 2.5],[3]]))

balconcino = T([1,3])([-11.5, 1.04])(INSR(PROD)(AA(QUOTE)([[11.5],[-2.5,-50.0,10.7],[1.96]])))

floor1 = T([1,2,3])([-1.25, -1.25, 25.0])(STRUCT([partition1_a, partition1_b, partition1_c, partition1_d,balconcino]))

# Definizione solaio secondo piano
partition2_a_2D = MKPOL([[[57.5,2.5],[112.5,0],[112.5,67],[46.98,67],[46.98,53.75]],[[1,2,3],[1,3,5],[3,4,5]],None])
partition2_a_3D = PROD([partition2_a_2D,Q(3)])

floor2 = T([1,2,3])([-1.25, -1.25, 50.0])(partition2_a_3D)

# Definizione solaio terzo piano
partition3_a = INSR(PROD)(AA(QUOTE)([[112.5],[55.0, -9.5, -2.5],[3]]))
partition3_b = INSR(PROD)(AA(QUOTE)([[55.0, 2.5, -30.5, 24.5],[-55.0, 9.5],[3]]))
partition3_c = INSR(PROD)(AA(QUOTE)([[112.5],[-64.5, 2.5],[3]]))

floor3 = T([1,2,3])([-1.25, -1.25, 75.0])(STRUCT([partition3_a, partition3_b, partition3_c]))

# Definizione tetto
tetto1 = INSR(PROD)(AA(QUOTE)([[-55.0, 57.5],[67.0],[5.04]]))
tetto2 = INSR(PROD)(AA(QUOTE)([[55.0],[-53.5,13.5],[5.04]]))

floor4 = T([1,2,3])([-1.25, -1.25, 100.0])(STRUCT([tetto1,tetto2]))

#----------------------------------------------------VERTICAL ENCLOSURES--------------------------------------------------------------------------------
# Facciata ovest
partitionW_1 = INSR(PROD)(AA(QUOTE)([[95.12],[-64.5,2.5],[18.04]]))
partitionW_2 = INSR(PROD)(AA(QUOTE)([[],[],[]]))

west = T([1,2])([-1.25, -1.25])(STRUCT([partitionW_1, partitionW_2]))

# Scheletro edificio
building = STRUCT([pillars0, pillars1, pillars2, pillars3, floor0, floor1, floor2, floor3, floor4, west])
VIEW(building)
