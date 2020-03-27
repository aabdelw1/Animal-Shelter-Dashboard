exports.list_breeds = function(req, res) {

    var params = [];
    var q = `SELECT
                Name
              FROM Breed
              WHERE Species_Name = ? `

    params.push(req.params.species);
  
    db.query(q, params, (err, result) => {
      var breeds=[];
  
      if (result!=null) {
  
        result.forEach(b => {
          breeds.push(b.Name);
        });
  
      }
  
      return res.json(breeds);
    });
  };