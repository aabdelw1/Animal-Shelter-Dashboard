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
          WHERE Animal.Pet_ID = ? `
  params.push(req.params.animalId);

  db.query(q, params, (err, result) => {
    if (result!=null && result.length>0) {
      var a = result[0];
      return res.json({
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
  var mixedUnknown=false;

  for (let j=0; j<breeds.length; j++)
  {
    if(breeds[j] == 'Mixed' || breeds[j] == 'Unknown')
    {
      mixedUnknown=true;
      var breed=breeds[j];
      var params=[];
      params.push(petId);
      params.push(breed);
      await db.query("INSERT INTO AnimalBreeds (Pet_ID, Breed_Name) VALUES (?,?);", params);
      break;
    }
  }

  if(mixedUnknown==false)
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
}

exports.add_vaccine = function(req, res) {
  console.log("add_vaccine:");
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');

  var params = [];
  var q = `INSERT INTO VaccineAdministration
          (Pet_ID,
          Species_Name,
          Vaccine_Type,
          Vaccination_Number,
          Date_Administired,
          Expiration_Date,
          Vaccine_Submitter)
          VALUES
            (?,?,?,?,?,?,?);`;

  params.push(req.params.animalId);
  params.push(req.body.speciesName);
  params.push(req.body.vaccineType);
  params.push(req.body.vaccinationNumber);
  params.push(req.body.dateAdministered);
  params.push(req.body.expirationDate);
  params.push(req.body.vaccineSubmitter);

  db.query(q, params, (err, result) => {
    if (err==null)
    {
      console.log("vaccine administration added");
      res.json({status:"success"})
    } else {
      res.status(500);
      console.log(err);
      res.end(JSON.stringify(err, null, 2));
    }
  });  
}

exports.put_animal_adoption_information = function(req, res) {
  var params = [];
  var q = `UPDATE Animal
  SET   Adoption_Application_Number = ?, Adoption_Date = ?, Adoption_Fee = ?
  WHERE Pet_ID = ?`
  
  params.push(req.body.applicationNumber);
  params.push(req.body.adoptionDate);
  params.push(req.body.adoptionFee);
  params.push(req.params.PetID);

  db.query(q, params, (err, results) => {
      if (err==null){
        console.log(results); 
        res.send('Animal Adoption Information Updated');
      } else {
        res.status(500);
        console.log(err);
        res.end(JSON.stringify(err, null, 2));
      }
  });
};

exports.put_update_animal_information = function(req, res) {
  // console.log("update_animal:");
  // console.log(req.body);
  // res.setHeader('Content-Type', 'application/json');
 
   var params = [];
   var q = ` `; 
 
   if (req.body.sex != null) {
     q = q +`UPDATE Animal
     SET   Sex = ?
     WHERE Pet_ID = ? ; `;
     params.push(req.body.sex);
     params.push(req.params.PetID);
   }
 
   if (req.body.alterationStatus != null) {
     q = q +`UPDATE Animal
     SET   Alteration_Status = ?
     WHERE Pet_ID = ? ; `;
     params.push(req.body.alterationStatus);
     params.push(req.params.PetID);
   }
  
   if (req.body.microchipID != null) {
     q = q +`UPDATE Animal
     SET   Microchip_ID = ?
     WHERE Pet_ID = ? ; `;
     params.push(req.body.microchipID);
     params.push(req.params.PetID);
   }
 
   if (req.body.breeds != null) {
     var breeds = req.body.breeds.split(',');
     var breed=breeds[0];

     var mixedUnknown=false;

     for (let j=0; j<breeds.length; j++)
     {
       if(breeds[j] == 'Mixed' || breeds[j] == 'Unknown')
       {
         mixedUnknown=true;
       }
     }

     if(mixedUnknown==false)
      {
        q = q +`  UPDATE IGNORE AnimalBreeds
        SET Breed_Name = ?
        WHERE Pet_ID = ? ; `;
        params.push(breed);
        params.push(req.params.PetID);
     }
   }
    
   db.query(q, params, (err, results) => {
    if (err==null){
      if (req.body.breeds != null) {
        res.status(200);
        var breeds = req.body.breeds.split(',');
        updateBreeds(req.params.PetID, breeds);
        res.status(200);
      }
      console.log(results); 
      res.send('Animal Information Updated');
    } else {
      res.status(500);
      console.log(err);
      res.end(JSON.stringify(err, null, 2));
    }

  });
 }

async function updateBreeds(petId,breeds)
{

  var mixedUnknown=false;

  for (let j=0; j<breeds.length; j++)
  {
    if(breeds[j] == 'Mixed' || breeds[j] == 'Unknown')
    {
      mixedUnknown=true;
      break;
    }
  }

  if(mixedUnknown==false)
  {
    for (let i=1; i<breeds.length; i++)
    {
      var breed=breeds[i];
      var params=[];
      params.push(petId);
      params.push(breed);
      await db.query("INSERT IGNORE INTO AnimalBreeds (Pet_ID, Breed_Name) VALUES (?,?);", params);
    }
  }
}