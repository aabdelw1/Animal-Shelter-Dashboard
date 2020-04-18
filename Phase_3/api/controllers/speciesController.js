exports.list_species = function(req, res) {

    var params = [];
    var q = `SELECT
                s.Name,
                s.Max_Per_Shelter,
                SUM(Adoptable) as CountWaitingAdoption,
                COUNT(*)-SUM(Adoptable)-SUM(Adopted) as CountNotReadyForAdoption,
                SUM(Adopted) as CountAdopted
              FROM Species s
              LEFT JOIN 
                (select a.Pet_id, a.Species,
                ((count(v.vaccine_type) = sum(case when va.pet_id is null then 0 else 1 end)) and 
                a.alteration_status=1 and
                a.adoption_application_number is null) as Adoptable,
                  case when adoption_application_number is null then 0 else 1 end as Adopted
              from animal a
              inner join vaccine v on 
                v.species_name=a.species and require_for_adoption=1
              left join vaccineadministration va on 
                va.vaccine_type=v.vaccine_type and a.pet_id=va.pet_id
              group by a.Pet_ID, a.species) a 
              ON a.Species=s.Name 
              GROUP BY s.Name, s.Max_Per_Shelter
              ORDER BY s.Name`
  
    db.query(q, params, (err, result) => {
      var species=[];
  
      if (result!=null) {
  
        result.forEach(row => {
          species.push({
            name: row.Name,
            maxPerShelter: row.Max_Per_Shelter,
            countWaitingAdoption: row.CountWaitingAdoption,
            countAdopted: row.CountAdopted,
            countNotReadyForAdoption: row.CountNotReadyForAdoption
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