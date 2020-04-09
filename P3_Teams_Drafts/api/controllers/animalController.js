exports.list_all_animals = function(req, res) {

  var params = [];
  var q = ` SELECT
              Animal.Pet_ID, 
              Animal.Name, 
              Animal.Species, 
              GROUP_CONCAT(AnimalBreeds.Breed_Name ORDER BY AnimalBreeds.Breed_Name SEPARATOR '/') as Breed_Name,
              Animal.Sex, 
              Animal.Alteration_Status, 
              Animal.Age,
              (CASE 	 WHEN (Alteration_Status = 1 AND 1 >
                  (SELECT COUNT(Vaccine_Type)
                FROM Vaccine AS V JOIN Animal AS A ON V.Species_Name=A.Species
                WHERE Require_for_Adoption=1 AND A.Pet_ID=Animal.Pet_ID AND Vaccine_Type NOT IN
                  (SELECT Vaccine_Type
                  FROM VaccineAdministration AS VA JOIN Animal AS AN ON VA.Pet_ID = AN.Pet_ID
                  WHERE AN.Pet_ID=Animal.Pet_ID AND (Expiration_Date > NOW())
                  ))) 
                THEN "Ready"
                ELSE "Pending"
                  END) AS Adoptability_Status 
            FROM Animal NATURAL JOIN AnimalBreeds 
            WHERE Adoption_Date IS NULL `

  if (req.query.species != null) {
    q = q + ' AND Animal.Species = ? ';
    params.push(req.query.species);
  }

  if (req.query.adoptability != null) {
    if(req.query.adoptability == 'Ready'){
      q = q + ` AND (Alteration_Status = 1 AND (1 >
                  (SELECT COUNT(Vaccine_Type)
                FROM Vaccine AS V JOIN Animal AS A ON V.Species_Name=A.Species
                WHERE Require_for_Adoption=1 AND Pet_ID=Animal.Pet_ID AND Vaccine_Type NOT IN
                  (SELECT Vaccine_Type
                  FROM VaccineAdministration AS VA JOIN Animal AS AN ON VA.Pet_ID = AN.Pet_ID
                  WHERE AN.Pet_ID=Animal.Pet_ID AND (Expiration_Date > NOW())
                  ))))  `;
    }
    else if(req.query.adoptability == 'Pending'){
      q = q + `  AND (Alteration_Status = 0 OR (1 <=
                      (SELECT COUNT(Vaccine_Type)
                    FROM Vaccine AS V JOIN Animal AS A ON V.Species_Name=A.Species
                    WHERE Require_for_Adoption=1 AND Pet_ID=Animal.Pet_ID AND Vaccine_Type NOT IN
                      (SELECT Vaccine_Type
                      FROM VaccineAdministration AS VA JOIN Animal AS AN ON VA.Pet_ID = AN.Pet_ID
                      WHERE AN.Pet_ID=Animal.Pet_ID AND (Expiration_Date > NOW())
                      )))) `;
    }
  }

  q = q + ` GROUP BY   
              Animal.Pet_ID, 
              Animal.Name, 
              Animal.Species, 
              Animal.Sex, 
              Animal.Alteration_Status, 
              Animal.Age,
              Adoptability_Status`;
  
    /*Sorting Parameters
    Pet_ID
    Name
    Species
    Breed_Name
    Sex
    Alteration_Status
    Age
    Adoptability_Status
    */
  if(req.query.sortParameter!=null)
  {
    q= q + ` ORDER BY ? `;
    params.push(req.query.sortParameter);

    if(req.query.sortOrder!=null)
    {
      q= q + ` ? `;
      params.push(req.query.sortOrder);
    }
  }
  else
  {
    q = q + ";"
  }

  db.query(q, params, (err, result) => {
    var animals=[];

    if (result!=null) {

      result.forEach(a => {
        animals.push({
          petId: a.Pet_ID,
          name: a.Name,
          description: a.Description,
          species: a.Species,
          breeds: a.Breed_Name,
          sex: a.Sex,
          alterationStatus: a.Alteration_Status,
          age: a.Age,
          adoptability: a.Adoptability_Status
          //surrenderDate: a.Surrender_Date,
          //surrenderReason: a.Surrender_Reason,
          //surrenderByAnimalControl: a.Surrender_By_Animal_Control,
          //adoptionDate: a.Adoption_Date,
          //adoptionFee: a.Adoption_Fee,
          //adoptionApplicationNumber: a.Adoption_Application_Number
        });
      });

    }

    return res.json(animals);
  });
};


exports.get_breeds = function(req, res) {

  var params = [];
  var q = `SELECT Breed_Name
            FROM AnimalBreeds
            WHERE Pet_ID = ? `

  params.push(req.params.animalId);

  db.query(q, params, (err, result) => {
    var breeds=[];

    if (result!=null) {

      result.forEach(b => {
        breeds.push({
          name: b.Breed_Name
        });
      });
    }
    return res.json(breeds);
  });
};

exports.get_vaccines = function(req, res) {

  var params = [];
  var q = `SELECT 
              Vaccine_Type, Vaccination_Number, Date_Administired, 
              Expiration_Date, Vaccine_Submitter
            FROM VaccineAdministration 
            WHERE Pet_ID = ? `;

  params.push(req.params.animalId);

  db.query(q, params, (err, result) => {
    var vaccines=[];

    if (result!=null) {

      result.forEach(v => {
        vaccines.push({
          type: v.Vaccine_Type,
          number: v.Vaccination_Number,
          dateAdministered: v.Date_Administired,
          expDate: v.Expiration_Date,
          submitter: v.Vaccine_Submitter
        });
      });
    }
    return res.json(vaccines);
  });
};

exports.get_vaccine = function(req, res) {

  var params = [];
  var q = `SELECT 
              Vaccine_Type, Vaccination_Number, Date_Administired, 
              Expiration_Date, Vaccine_Submitter
            FROM VaccineAdministration 
            WHERE Pet_ID = ? and Vaccine_Type = ? `;

  params.push(req.params.animalId);
  params.push(req.params.vaccineType);

  db.query(q, params, (err, result) => {
    if (result!=null && result.length>0) {
      var v = result[0];
      return res.json({
          type: v.Vaccine_Type,
          number: v.Vaccination_Number,
          dateAdministered: v.Date_Administired,
          expDate: v.Expiration_Date,
          submitter: v.Vaccine_Submitter
        });
    }
    res.status(404)        // HTTP status 404: NotFound
        .send(res.json({status:'not found'}));
  });
};

exports.get_animal = function(req, res) {

  var params = [];
  var q = `SELECT
              Animal.Pet_ID, 
              Animal.Name, 
              Animal.Species, 
              GROUP_CONCAT(AnimalBreeds.Breed_Name ORDER BY AnimalBreeds.Breed_Name SEPARATOR '/') as Breed_Name,
              Animal.Sex, 
              Animal.Alteration_Status, 
              Animal.Age,
              AdoptionApplication.State as Adoptability_Status
            FROM Animal 
            INNER JOIN AnimalBreeds ON Animal.Pet_ID = AnimalBreeds.Pet_ID
            LEFT JOIN AdoptionApplication ON Animal.Adoption_Application_Number = AdoptionApplication.Application_Number
            WHERE Animal.Pet_ID = ? `
  params.push(req.params.animalId);

  db.query(q, params, (err, result) => {
    if (result!=null && result.length>0) {
      var a = result[0];
      return res.json({
          petId: a.Pet_ID,
          name: a.Name,
          description: a.Description,
          species: a.Species,
          breeds: a.Breed_Name,
          sex: a.Sex,
          alterationStatus: a.Alteration_Status,
          age: a.Age,
          adoptability: a.Adoptability_Status
          //surrenderDate: a.Surrender_Date,
          //surrenderReason: a.Surrender_Reason,
          //surrenderByAnimalControl: a.Surrender_By_Animal_Control,
          //adoptionDate: a.Adoption_Date,
          //adoptionFee: a.Adoption_Fee,
          //adoptionApplicationNumber: a.Adoption_Application_Number
        });
    }
    
    return res.status(404)        // HTTP status 404: NotFound
        .send(res.json({status:'not found'}));;
    
  });
};

exports.add_animal = function(req, res) {
  console.log("add_animal:");
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');

  var params = [];
  var q = `INSERT INTO Animal
              (Name,
              Description,
              Age,
              Microchip_ID,
              Sex,
              Surrender_Date,
              Surrender_Submitter,
              Surrender_Reason,
              Surrender_By_Animal_Control,
              Alteration_Status,
              Species)
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?);`;

  params.push(req.body.name);
  params.push(req.body.description);
  params.push(req.body.age);
  params.push(req.body.microchipId);
  params.push(req.body.sex);
  params.push(req.body.surrenderDate);
  params.push(req.body.surrenderSubmitter);
  params.push(req.body.surrenderReason);
  params.push(req.body.surrenderByAnimalControl);
  params.push(req.body.alterationStatus);
  params.push(req.body.species);

  db.query(q, params, (err, result) => {
    if (err==null)
    {
      db.query('SELECT LAST_INSERT_ID() as id;', null, (err, result) => {
        var response = { petId:result[0].id };
        console.log("petId: "+response.petId);
        if (req.body.breeds!=null) {
          var breeds = req.body.breeds.split(',');
          addBreeds(response.petId, breeds);
          res.status(200);
          res.end(JSON.stringify(response));
        } else {
          res.status(200);
          res.end(JSON.stringify(response));
        }
      });
    } else {
      res.status(500);
      console.log(err);
      res.end(JSON.stringify(err, null, 2));
    }
  });  
}

async function addBreeds(petId,breeds)
{
  for (let i=0; i<breeds.length; i++)
  {
    var breed=breeds[i];
    var params=[];
    params.push(petId);
    params.push(breed);
    await db.query("INSERT INTO AnimalBreeds (Pet_ID, Breed_Name) VALUES (?,?);", params);
  }
}

exports.put_animal_adoption_information = function(req, res) {
  var params = [];
  var q = `UPDATE Animal
  SET   Adoption_Application_Number = ?, Adoption_Date = ?, Adoption_Fee = ?
  WHERE Pet_ID = ?`
  
  params.push(req.body.applicationNumber);
  params.push(req.body.adoptionDate);
  params.push(req.body.adoptionFee);
  params.push(req.params.petID);

  db.query(q, params, (err, results) => {
     if(err) throw err;
    //console.log("1 record inserted"); 
     res.send('Animal Adoption Information Updated');
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


