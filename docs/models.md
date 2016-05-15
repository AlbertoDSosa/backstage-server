
-> person[array]
	-> id
	-> name
	-> phone
	-> photo
	-> email
	-> user (bool)
	-> staff(bool)
	-> freelance(bool)
	-> company(objectId)

-> user
	-> name
	-> password
	-> role
	-> data(objectId)

-> company
	-> id
	-> name
	-> location(cords, String)
	-> webSite
	-> email
	-> phone
	-> fax

-> equipament
	-> id
	-> count
	-> name
	-> brand
	-> feature (Video, Sonido, Luces)
	-> model
	-> description
	-> photo
	-> manuals
		-> spanish [array]
		-> english [array]

-> event
	-> id
	-> day
	-> budget(Presupuesto, String)
	-> location(cords, String)
	-> name(String)
	-> daysNum(Number)
	-> conscutiveDays(Boolean)
	-> firstDay(Date)

	-> staffList
		-> day(objectId)
		-> list[array]
		-> mounting
		-> test
		-> event
		-> dismounting

	-> equipament
		-> id (objectId)
		-> count
		-> daysNum
	-> observations(String)

	-> schedule (horario)
		-> day(objectId)
		-> store(bool)
		-> storeHour
		-> mountingHour
		-> testHour
		-> eventHour
		-> dismountingHour

-> quadrantHours (Cuadrante de horas)
	-> dates(Array)
		-> date(Date)
			-> free(bool)
			-> event(objectId)
			-> store(bool)
			-> entryTime
			-> departTime
	-> hoursNum
	-> extraHours
	-> accruedHours
	-> MounthHours(161)

-> tasks (Tareas)


	


