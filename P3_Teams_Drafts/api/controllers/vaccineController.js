exports.get_vaccine_reminder_report = function(req, res) {
    var params = [];
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
