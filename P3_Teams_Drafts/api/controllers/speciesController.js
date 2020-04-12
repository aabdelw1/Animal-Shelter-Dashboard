exports.list_species = function(req, res) {

    var params = [];
    var q = `SELECT
              s.Name,
              s.Max_Per_Shelter,
              COUNT(a.Pet_ID) as Count
            FROM Species s
            LEFT JOIN Animal a ON a.Species=s.Name
            GROUP BY s.Name, s.Max_Per_Shelter
            ORDER BY s.Name`
  
    db.query(q, params, (err, result) => {
      var species=[];
  
      if (result!=null) {
  
        result.forEach(row => {
          species.push({
            name: row.Name,
            maxPerShelter: row.Max_Per_Shelter,
            count: row.Count
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