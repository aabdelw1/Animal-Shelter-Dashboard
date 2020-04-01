exports.list_species = function(req, res) {

    var params = [];
    var q = `SELECT
                Name,
                Max_Per_Shelter
              FROM Species
              ORDER BY Name`
  
    db.query(q, params, (err, result) => {
      var species=[];
  
      if (result!=null) {
  
        result.forEach(b => {
          species.push({
            name: b.Name,
            maxPerShelter: b.Max_Per_Shelter
          });
        });
  
      }
  
      return res.json(species);
    });
  };

  exports.list_species_vaccines = function(req, res) {

    var params = [];
    var q = `SELECT
                Vaccine_Type,
                Require_For_Adoption
              FROM Vaccine
              WHERE Species_Name = ?
              ORDER BY Vaccine_Type`
    
    params.push(req.params.species);
  
    db.query(q, params, (err, result) => {
      var vaccines=[];
  
      if (result!=null) {
  
        result.forEach(v => {
          vaccines.push({
            vaccineType: v.Vaccine_Type,
            requireForAdoption: v.Require_For_Adoption
          });
        });
  
      }
  
      return res.json(vaccines);
    });
  };