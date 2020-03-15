-- Each count should allow pulling up a drill down report for that month, 
-- which will identify the animals from each category, listed separately. 
-- The information for each animal will include pet ID, species, breed 
-- (in the case of an animal with multiple breeds, remember that breeds 
-- should be combined into a single value in alphabetical order), sex, 
-- alteration status, microchip ID, surrender date, and for animals in 
-- rescue for 60 or more days before adoption, the number of days they were in rescue. 
-- The listing of animal control surrenders should be sorted by pet ID ascending, 
-- while the listing of animals over 60 days before being adopted should be 
-- listed by number of days in rescue descending.

-- Surrendered by animal control drilldown
SELECT 
	a.Pet_ID, Species, 
    GROUP_CONCAT(Breed_Name ORDER BY Breed_Name SEPARATOR '/') as Breed_Name,
    Alteration_Status, Microchip_ID, Surrender_Date
FROM Animal a
INNER JOIN AnimalBreeds breeds on a.Pet_ID=breeds.Pet_ID
WHERE Surrender_By_Animal_Control=1 AND EXTRACT(YEAR_MONTH FROM a.Surrender_Date)=$Yr_Mon
group by a.Pet_ID, Species, Alteration_Status, Microchip_ID, Sex,  Surrender_Reason, Surrender_By_Animal_Control, 
    Surrender_Date, Adoption_Date
order by a.Pet_ID;


