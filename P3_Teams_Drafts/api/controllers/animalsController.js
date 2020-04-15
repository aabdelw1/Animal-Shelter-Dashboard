exports.list_all_animals = function(req, res) {

    var params = [];
    var q = ` SELECT
                Animal.Pet_ID, 
                Animal.Name, 
                Animal.Species, 
                GROUP_CONCAT(AnimalBreeds.Breed_Name ORDER BY AnimalBreeds.Breed_Name SEPARATOR '/') as Breed_Name,
                Animal.Sex, 
                Animal.Alteration_Status, 
                (Animal.Age + (TIMESTAMPDIFF(MONTH,Animal.Surrender_Date, CURDATE())))  AS Age,
                Animal.Description,
                Animal.Microchip_ID,
                Animal.Surrender_Reason,
                Animal.Surrender_By_Animal_Control,
                Animal.Surrender_Date,
                Animal.Surrender_Submitter,
                Animal.Adoption_Date,
                Animal.Adoption_Fee,
                Animal.Adoption_Application_Number,
                Adoptability.Adoptability_Status 
              FROM 
              Animal
              NATURAL JOIN (
                select a.Pet_ID,
                  case
                  when ((count(v.vaccine_type) =sum(case when va.pet_id is null then 0 else 1 end)) and 
                  a.alteration_status=1 and
                  a.adoption_application_number is null) then 'Ready'
                  when a.adoption_application_number then 'Adopted'
                  else 'Pending'
                end as Adoptability_Status
                from animal a
                inner join vaccine v on 
                v.species_name=a.species and require_for_adoption=1
                left join vaccineadministration va on 
                va.vaccine_type=v.vaccine_type and a.pet_id=va.pet_id
                group by a.pet_id 
              ) Adoptability 
              NATURAL JOIN AnimalBreeds
              WHERE `;

    if (req.query.adoptability != null) {
        q = q + 'Adoptability.Adoptability_Status = ? ';
        params.push(req.query.adoptability);
    } else {
        q = q + 'Adoption_Date is null '
    }

    if (req.query.species != null) {
      q = q + ' AND Animal.Species = ? ';
      params.push(req.query.species);
    } 
  
    q = q + ` GROUP BY   
                Animal.Pet_ID, 
                Animal.Name, 
                Animal.Species, 
                Animal.Sex, 
                Animal.Alteration_Status, 
                Animal.Age,
                Adoptability.Adoptability_Status `;
    
    if(req.query.sortParameter!=null)
    {
      if(req.query.sortParameter=='name')
        q= q + ` ORDER BY Name `;
      else if(req.query.sortParameter=='species')
        q= q + ` ORDER BY Species `;  
      else if(req.query.sortParameter=='breeds')
        q= q + ` ORDER BY Breed_Name `;       
      else if(req.query.sortParameter=='sex')
        q= q + ` ORDER BY Sex `;   
      else if(req.query.sortParameter=='alterationStatus')
        q= q + ` ORDER BY Alteration_Status `;  
      else if(req.query.sortParameter=='age')
        q= q + ` ORDER BY Age `;       
      else if(req.query.sortParameter=='adoptability')
        q= q + ` ORDER BY Adoptability_Status `;  
      else if(req.query.sortParameter=='petId')
        q= q + ` ORDER BY Pet_ID `;  
  
      if(req.query.sortOrder!=null)
      {
        if(req.query.sortOrder=='ASC')
          q= q + ` ASC; `;
        else if(req.query.sortOrder=='DESC')
          q= q + ` DESC; `;
      }
      else
      {
        q = q + `; `;
      }
    }
    else
    {
      q = q + ";"
    }
    //console.log(q);
    db.query(q, params, (err, result) => {
      var animals=[];
  
      if (result!=null) {
  
        result.forEach(a => {
          animals.push({
            petId: a.Pet_ID,
            name: a.Name,
            species: a.Species,
            breeds: a.Breed_Name,  
            sex: a.Sex,
            alterationStatus: a.Alteration_Status,
            age: a.Age,
            adoptability: a.Adoptability_Status,
            microchipId: a.Microchip_ID,
            description: a.Description,
            surrenderReason: a.Surrender_Reason,
            surrenderByAnimalControl: a.Surrender_By_Animal_Control,
            surrenderDate: a.Surrender_Date,
            surrenderSubmitter: a.Surrender_Submitter,
            adoptionDate: a.Adoption_Date,
            adoptionFee: a.Adoption_Fee,
            adoptionApplicationNumber: a.Adoption_Application_Number
          });
        });
  
      }
  
      return res.json(animals);
    });
  };


  exports.get_animal_control_report = function(req, res) {

    var params = [];
    var q = ` SELECT 
              dates.Yr_Month,
              SUM(CASE 
                          WHEN Surrender_By_Animal_Control=1 AND 
                              EXTRACT(YEAR_MONTH FROM a.Surrender_Date)=dates.yr_month THEN 1
                          ELSE 0 END) as Surrender_By_Animal_Control_Count,
              SUM(CASE 
                          WHEN EXTRACT(YEAR_MONTH FROM a.Adoption_Date)=dates.yr_month THEN 1
                          ELSE 0 END) as Rescue_Over_60_Count       
            FROM 
            (
              WITH RECURSIVE dates as (
                SELECT date_add(CURDATE(), interval -6 month) as dt
                UNION ALL
                SELECT date_add(dt, interval 1 month) as dt
                FROM dates
                WHERE dt < CURDATE() 
            ) 
            SELECT EXTRACT(YEAR_MONTH FROM dt) as yr_month
            FROM dates
            WHERE dt between date_add(CURDATE(), interval -5 month) and CURDATE()
            ) dates
            inner join Animal a on 
              (EXTRACT(YEAR_MONTH FROM a.Surrender_date)=dates.yr_month AND 
                    a.Surrender_By_Animal_Control=1) 
                OR
              (EXTRACT(YEAR_MONTH FROM a.Adoption_Date)=dates.yr_month AND
              DATEDIFF(a.Adoption_Date,a.Surrender_Date)>=60)
            group by dates.Yr_Month;`
    
    //params.push(req.params.YearMonth);            
  
    db.query(q, params, (err, results) => {
        var yearMonth=[];
  
        if(results!=null) {
            results.forEach(a => {
              yearMonth.push({
                    yearMonth: a.yr_month,
                    surrenderByAnimalControlCount: a.Surrender_By_Animal_Control_Count,
                    rescueOver60Count: a.Rescue_Over_60_Count
                });
            });
        }
        return res.json(yearMonth);
    });
  };
  
  
    //24
  exports.get_report_animal_control_surrenders = function(req, res) {
  
    var params = [];
    var q = ` SELECT 
                a.Pet_ID, Species, 
                GROUP_CONCAT(Breed_Name ORDER BY Breed_Name SEPARATOR '/') as Breed_Name,
                Alteration_Status, Microchip_ID, Sex, Surrender_Date
              FROM Animal AS a
              INNER JOIN AnimalBreeds AS breeds on a.Pet_ID=breeds.Pet_ID
              WHERE 
              Surrender_By_Animal_Control=1 AND 
              EXTRACT(YEAR_MONTH FROM a.Surrender_Date)= ?
              group by a.Pet_ID, Species, Alteration_Status, Microchip_ID, Sex, Surrender_Date
              order by a.Pet_ID;`
    
    params.push(req.params.YearMonth);            
  
    db.query(q, params, (err, results) => {
        var controlSurrenders=[];
  
        if(results!=null) {
            results.forEach(a => {
              controlSurrenders.push({
                petID: a.Pet_ID,
                species: a.Species,
                breedName: a.Breed_Name,
                alterationStatus: a.Alteration_Status,
                microchipID: a.Microchip_ID,
                sex: a.Sex,
                surrenderDate: a.Surrender_Date
                });
            });
        }
        return res.json(controlSurrenders);
    });
  };
  
  //25
  exports.get_report_animal_adopted_over_60_days = function(req, res) {
    var params = [];
    var q = ` SELECT 
                a.Pet_ID, Species, 
                GROUP_CONCAT(Breed_Name ORDER BY Breed_Name SEPARATOR '/') as Breed_Name,
                Alteration_Status, Microchip_ID, Sex, Surrender_Date, Adoption_Date,
                DATEDIFF(a.Adoption_Date,a.Surrender_Date) as Days_To_Rescue
              FROM Animal AS a
              INNER JOIN AnimalBreeds AS breeds on a.Pet_ID=breeds.Pet_ID
              WHERE 
                DATEDIFF(a.Adoption_Date,a.Surrender_Date)>=60 AND
                EXTRACT(YEAR_MONTH FROM a.Adoption_Date)= ?
              GROUP BY 
                a.Pet_ID, Species, Alteration_Status, Microchip_ID, Sex, 
                Surrender_Date, Adoption_Date
              ORDER BY DATEDIFF(a.Adoption_Date,a.Surrender_Date) DESC;`
    
    params.push(req.params.YearMonth);            
  
    db.query(q, params, (err, results) => {
        var animalsList=[];
  
        if(results!=null) {
            results.forEach(a => {
              animalsList.push({
                petID: a.Pet_ID,
                species: a.Species,
                breedName: a.Breed_Name,
                alterationStatus: a.Alteration_Status,
                microchipID: a.Microchip_ID,
                sex: a.Sex,
                surrenderDate: a.Surrender_Date,
                adoptionDate: a.Adoption_Date,
                daysToRescue: a.Days_To_Rescue
                });
            });
        }
        return res.json(animalsList);
    });
  };
  
  
  