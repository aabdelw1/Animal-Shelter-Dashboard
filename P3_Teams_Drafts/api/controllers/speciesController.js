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