exports.list_all_animals = function(req, res) {
  db.query(`select Pet_ID, Name, Description, Age, Microchip_ID, Alteration_Status, 
           Surrender_Date, Surrender_Reason, Surrender_By_Animal_Control, Adoption_Date, 
           Adoption_Fee, Adoption_Application_Number from animal;`, 
    (err, result) => {
        var animals=[];
        result.forEach(a => {
          animals.push({
            petId: a.Pet_ID,
            name: a.Name,
            description: a.Description,
            age: a.Age,
            microchipId: a.Microchip_ID,
            alterationStatus: a.Alteration_Status,
            surrenderDate: a.Surrender_Date,
            surrenderReason: a.Surrender_Reason,
            surrenderByAnimalControl: a.Surrender_By_Animal_Control,
            adoptionDate: a.Adoption_Date,
            adoptionFee: a.Adoption_Fee,
            adoptionApplicationNumber: a.Adoption_Application_Number,
            species: a.Species,
            sex: a.Sex
          });
        });
        return res.json(animals);
      });
};