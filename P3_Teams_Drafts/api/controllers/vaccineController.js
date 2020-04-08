exports.get_vaccine_reminder_report = function(req, res) {
    var params = [];

    /*
    SELECT va.Pet_ID, va.Species_Name, va.Vaccine_Type, va.Vaccination_Number, va.Date_Adminisistired, va.Expiration_Date, va.Vaccine_Submitter, 
     GROUP_CONCAT(va.Breed_Name SEPARATOR '/') as Breed_Name, a.Name, a.Description, a.Age, a.Microchip_ID, a.Sex, a.Alteration_Status, a.Surrender_Reason. a.Surrender_By_Animal_Control, a.Surrender_Date, a.Adoption_Date, a.Adoption_Fee, a.Adoption_Application_Number, a.Species
FROM VaccineAdministration AS va
INNER JOIN Animal AS a on va.Pet_ID = a.Pet_ID
WHERE va.Expiration_Date >= DATEADD(month, -3, getdate())
GROUP BY va.Pet_ID, va.Species_Name, va.Vaccine_Type, va.Vaccination_Number, va.Date_Adminisistired, va.Expiration_Date, va.Vaccine_Submitter, a.Name, a.Description, a.Age, a.Microchip_ID, a.Sex, a.Alteration_Status, a.Surrender_Reason. a.Surrender_By_Animal_Control, a.Surrender_Date, a.Adoption_Date, a.Adoption_Fee, a.Adoption_Application_Number, a.Species
ORDER BY va.Expiration_Date, va.Pet_ID
*/

    var q = `SELECT va.Pet_ID, va.Species_Name, va.Vaccine_Type, va.Vaccination_Number, va.Date_Administired, va.Expiration_Date, va.Vaccine_Submitter, 
                GROUP_CONCAT(ab.Breed_Name ORDER BY ab.Breed_Name SEPARATOR '/') as Breed_Name, a.Name, a.Description, a.Age, a.Microchip_ID, a.Sex, a.Alteration_Status, a.Surrender_Reason, a.Surrender_By_Animal_Control, a.Surrender_Date, a.Adoption_Date, a.Adoption_Fee, a.Adoption_Application_Number, a.Species
            FROM VaccineAdministration AS va
            INNER JOIN Animal AS a on va.Pet_ID = a.Pet_ID
            INNER JOIN AnimalBreeds AS ab ON a.Pet_ID=ab.Pet_ID
            WHERE  (EXTRACT(YEAR_MONTH FROM va.Expiration_Date) <= ((EXTRACT(YEAR_MONTH FROM DATE_ADD(NOW(), INTERVAL 3 MONTH))))) AND (EXTRACT(YEAR_MONTH FROM va.Expiration_Date) >= EXTRACT(YEAR_MONTH FROM NOW())) 
            GROUP BY va.Pet_ID, va.Species_Name, va.Vaccine_Type, va.Vaccination_Number, va.Date_Administired, va.Expiration_Date, va.Vaccine_Submitter, a.Name, a.Description, a.Age, a.Microchip_ID, a.Sex, a.Alteration_Status, a.Surrender_Reason, a.Surrender_By_Animal_Control, a.Surrender_Date, a.Adoption_Date, a.Adoption_Fee, a.Adoption_Application_Number, a.Species
            ORDER BY va.Expiration_Date ASC, va.Pet_ID ASC;`
    
    db.query(q, params, (err, results) => {
        var report=[];

        if(results!=null) {
            results.forEach(a => {
                report.push({
                    petID: a.Pet_ID,
                    speciesName: a.Species_Name,
                    vaccineType: a.Vaccine_Type,
                    vaccinationNumber: a.Vaccination_Number,
                    dateAdministired: a.Date_Administired,
                    vaccineSubmitter: a.Vaccine_Submitter,
                    breedName: a.Breed_Name,
                    name: a.Name,
                    description: a.Description,
                    age: a.Age,
                    microchipID: a.Microchip_ID,
                    sex: a.Sex,
                    alterationStatus: a.Alteration_Status,
                    surrenderReason: a.Surrender_Reason, 
                    surrenderByAnimalControl: a.Surrender_By_Animal_Control, 
                    surrenderDate: a.Surrender_Date, 
                    adoptionDate: a.Adoption_Date, 
                    adoptionFee: a.Adoption_Fee, 
                    adoptionApplicationNumber: a.Adoption_Application_Number, 
                    species: a.Species
                });
            });
        }
        return res.json(report);
    });
};


exports.get_eligible_vaccines_for_Pet = function(req, res) {

    var params = [];
    var q = `SELECT Vaccine_Type
            FROM Vaccine AS V JOIN Animal AS A ON V.Species_Name=A.Species
            WHERE Pet_ID=? AND Vaccine_Type NOT IN
                (SELECT Vaccine_Type
                FROM VaccineAdministration AS VA JOIN Animal AS AN ON VA.Pet_ID = AN.Pet_ID
                WHERE AN.Pet_ID=? AND (Expiration_Date > NOW())
                )`
  
    params.push(req.params.PetID);
    params.push(req.params.PetID);
  
    db.query(q, params, (err, results) => {
        var vaccines=[];

        if (results!=null) {
          results.forEach(p => {
            vaccines.push(p.Vaccine_Type);
          }); 
          if (vaccines.length!=0) {
            return res.json(vaccines);
          }
        }
        return res.json('No Vaccines Available');
      });
  };
