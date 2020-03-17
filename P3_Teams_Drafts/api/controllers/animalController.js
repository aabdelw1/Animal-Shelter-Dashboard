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
          type: v.Vaccinne_Type,
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
