SELECT 
	a.Pet_ID, Species, 
    GROUP_CONCAT(Breed_Name ORDER BY Breed_Name SEPARATOR '/') as Breed_Name,
    Alteration_Status, Microchip_ID, Surrender_Date, Adoption_Date,
    DATEDIFF(a.Adoption_Date,a.Surrender_Date) as Days_To_Rescue
FROM Animal a
INNER JOIN AnimalBreeds breeds on a.Pet_ID=breeds.Pet_ID
WHERE 
	DATEDIFF(a.Adoption_Date,a.Surrender_Date)>=60 AND
    EXTRACT(YEAR_MONTH FROM a.Adoption_Date)=$Yr_Mon
GROUP BY a.Pet_ID, Species, Alteration_Status, Microchip_ID, 
	Sex, Surrender_Date, Adoption_Date
ORDER BY DATEDIFF(a.Adoption_Date,a.Surrender_Date) DESC;