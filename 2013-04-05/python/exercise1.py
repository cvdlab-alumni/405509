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

# Scheletro edificio
building = STRUCT([pillars0, pillars1, pillars2, pillars3])
VIEW(building)