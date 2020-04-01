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

    var q = `SELECT Application_Number, Applicant_Fist_Name, Applicant_Last_Name, Street,
    City, Adopter.State, ZIPCode, Phone_Number, Adopter.Email_Address, CoApplicant_First_Name, CoApplicant_Last_Name
    FROM Adopter INNER JOIN AdoptionApplication ON Adopter.Email_Address = AdoptionApplication.Email_Address
    WHERE AdoptionApplication.State= 'Approved' AND (Applicant_Last_Name LIKE  ?) AND (CoApplicant_Last_Name LIKE ?) AND Application_Number NOT IN
              (SELECT Adoption_Application_Number
              FROM Animal
              WHERE Adoption_Application_Number IS NOT NULL)`
    
    params.push('%' + req.query.applicantLastName + '%');
    params.push('%' + req.query.coApplicantLastName + '%');
 
    db.query(q, params, (err, results) => {
        var approvedApplications=[];

        if(results!=null) {
            results.forEach(a => {
                approvedApplications.push({
                    applicationNumber: a.Application_Number,
                    applicantFirstName: a.Applicant_Fist_Name,
                    applicantLastName: a.Applicant_Last_Name,
                    street: a.Street,
                    city: a.City,
                    state: a.State,
                    zipCode: a.ZIPCode,
                    phoneNumber: a.Phone_Number,
                    emailAddress: a.Email_Address,
                    coApplicantFirstName: a.CoApplicant_First_Name,
                    coApplicantLastName: a.CoApplicant_Last_Name
                });

            });
        }
        return res.json(approvedApplications);
    });
}
