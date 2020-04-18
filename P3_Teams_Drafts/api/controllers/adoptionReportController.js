exports.get_adoption_report = function(req, res) {

    var q = `
SELECT DISTINCT Yr_Month, Species, Breed_Name, Adoption_Count, Surrender_Count
FROM (
	SELECT 
	     dates.Yr_Month, Species, Breed_Name,
	     IFNULL(SUM(Adoption_Count),0) as Adoption_Count, 
	     IFNULL(Sum(Surrender_Count),0) as Surrender_Count
	FROM
	(
	   WITH RECURSIVE dates as (
		SELECT date_add(CURDATE(), interval -12 month) as dt -- start
		UNION ALL
		SELECT date_add(dt, interval 1 month) as dt
		FROM dates
		WHERE dt < CURDATE() -- end
	      ) SELECT EXTRACT(YEAR_MONTH FROM dt) as yr_month
	      FROM dates
	      WHERE dt between date_add(CURDATE(), interval -12 month) and date_add(CURDATE(), interval -1 month) 
	) dates LEFT JOIN
	(
		SELECT Yr_Month, Species, Breed_Name, Adoption_Count, Surrender_Count 
		FROM
			(SELECT 
			   Yr_Month, Species, Breed_Name, 
			   0 as Adoption_Count, count(*) as Surrender_Count
			FROM (SELECT    
				   EXTRACT(YEAR_MONTH FROM a.Surrender_Date) as Yr_month,
				   Species,
				   GROUP_CONCAT(Breed_Name 
                   ORDER BY Breed_Name SEPARATOR '/') as Breed_Name
				FROM Animal AS a
				INNER JOIN AnimalBreeds breeds on a.Pet_ID=breeds.Pet_ID
				WHERE a.Surrender_Date is not null
				GROUP BY a.Pet_ID, Species, EXTRACT(YEAR_MONTH FROM a.Surrender_Date)
			) Animals
			GROUP BY Yr_Month, Species, Breed_Name
		) Surrender UNION
		(
			SELECT 
			   Yr_Month, Species, Breed_Name, 
			   count(*) as Adoption_Count, 0 as Surrender_Count
			FROM (
				SELECT    
				   EXTRACT(YEAR_MONTH FROM a.Adoption_Date) as Yr_month,
				   Species,
				   GROUP_CONCAT(Breed_Name 
                   ORDER BY Breed_Name SEPARATOR '/') as Breed_Name
				FROM Animal AS a
				INNER JOIN AnimalBreeds AS breeds on a.Pet_ID=breeds.Pet_ID
				WHERE a.Adoption_Date is not null
				GROUP BY a.Pet_ID, Species, EXTRACT(YEAR_MONTH FROM a.Adoption_Date)
			) Animals
			GROUP BY Yr_Month, Species, Breed_Name
		) 
	) t2 on dates.yr_month=t2.yr_month
	GROUP BY Yr_Month, Species, Breed_Name WITH ROLLUP
	ORDER BY Grouping(dates.Yr_Month), dates.Yr_Month, Grouping(Species), 
                       Species, Grouping(Breed_Name), Breed_Name
) report;`

    var rows=[];
    db.query(q, null, (err, result) => {

        if (result!=null) {

            result.forEach(r => {
                rows.push({
                    yrMonth: r.Yr_Month, 
                    species: r.Species, 
                    breedName: r.Breed_Name, 
                    adoptionCount: r.Adoption_Count, 
                    surrenderCount: r.Surrender_Count
                })
			});
			return res.json(rows);
        }
    });
    
};
