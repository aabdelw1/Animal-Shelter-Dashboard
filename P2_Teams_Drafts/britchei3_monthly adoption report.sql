USE cs6400_sp20_team054;
-- monthly adoption report
-- tracking the number of animals surrendered and adopted each month. 
-- This report should show the numbers for each month for the last 12 months (starting from the previous month) 
-- displaying summaries for each breed, grouped and subtotaled by species. 
-- Only breeds and species adopted during the 12 month period should be displayed. 
-- row-wise (with a column for the month name, species, breed, number of surrenders, and number of adoptions), 
-- The table should be sorted by month in ascending order (earliest to latest), and species name alphabetically (A-Z) followed by breed name alphabetically (A-Z, 
--    in the case of an animal with multiple breeds, remember that breeds should be combined into a single value in alphabetical order).
select distinct Yr_Month, Species, Breed_Name, Adoption_Count, Surrender_Count
FROM (
select 
	dates.Yr_Month, 
	Species, 
    Breed_Name,
	IFNULL(SUM(Adoption_Count),0) as Adoption_Count, 
    IFNULL(Sum(Surrender_Count),0) as Surrender_Count
FROM
(
	with RECURSIVE dates as (
		select date_add(CURDATE(), interval -12 month) as dt -- start
		union all
		select date_add(dt, interval 1 month) as dt
		from dates
		where dt < CURDATE() -- end
	) select EXTRACT(YEAR_MONTH FROM dt) as yr_month
	from dates
	where dt between date_add(CURDATE(), interval -12 month) and date_add(CURDATE(), interval -1 month) 
) dates LEFT JOIN
(
	select Yr_Month, Species,
			Breed_Name,Adoption_Count, Surrender_Count 
	from
		(
			SELECT 
				Yr_Month,
				Species,
				Breed_Name,
				0 as Adoption_Count, 
				count(*) as Surrender_Count
			FROM (
				SELECT    
					EXTRACT(YEAR_MONTH FROM a.Surrender_Date) as Yr_month,
					Species,
					GROUP_CONCAT(Breed_Name ORDER BY Breed_Name SEPARATOR '/') as Breed_Name
				FROM Animal a
				INNER JOIN AnimalBreeds breeds on a.Pet_ID=breeds.Pet_ID
				WHERE a.Surrender_Date is not null
				GROUP BY a.Pet_ID, Species, EXTRACT(YEAR_MONTH FROM a.Surrender_Date)
			) Animals
			GROUP BY 
				Yr_Month,
				Species,
				Breed_Name

		) t1 union
		(
			SELECT 
				Yr_Month,
				Species,
				Breed_Name,
				count(*) as Adoption_Count, 
				0 as Surrender_Count
			FROM (
				SELECT    
					EXTRACT(YEAR_MONTH FROM a.Adoption_Date) as Yr_month,
					Species,
					GROUP_CONCAT(Breed_Name ORDER BY Breed_Name SEPARATOR '/') as Breed_Name
				FROM Animal a
				INNER JOIN AnimalBreeds breeds on a.Pet_ID=breeds.Pet_ID
				WHERE a.Adoption_Date is not null
				GROUP BY a.Pet_ID, Species, EXTRACT(YEAR_MONTH FROM a.Adoption_Date)
			) Animals
			GROUP BY 
				Yr_Month,
				Species,
				Breed_Name
		) 
	) t2 on dates.yr_month=t2.yr_month
	GROUP BY Yr_Month, Species, Breed_Name WITH ROLLUP
ORDER BY Grouping(dates.Yr_Month), dates.Yr_Month, Grouping(Species), Species, Grouping(Breed_Name), Breed_Name
) report;