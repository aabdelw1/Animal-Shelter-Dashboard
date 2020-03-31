exports.list_all_animals = function(req, res) {

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
            WHERE (1=1) `
  if (req.query.species != null) {
    q = q + ' AND Animal.Species = ? ';
    params.push(req.query.species);
  }
  if (req.query.adoptability != null) {
    q = q + ' AND AdoptionApplication.State = ? ';
    params.push(req.query.adoptability);
  }
  q = q + ` GROUP BY   
              Animal.Pet_ID, 
              Animal.Name, 
              Animal.Species, 
              Animal.Sex, 
              Animal.Alteration_Status, 
              Animal.Age,
              AdoptionApplication.State;`;

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
