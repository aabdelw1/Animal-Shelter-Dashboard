exports.get_approved_applications = function(req, res) {

    var params = [];
    var q = "SELECT Application_Number, Applicant_First_Name, Applicant_Last_Name, Street, "+
    "City, Adopter.`State`, ZIPCode, Phone_Number, Adopter.Email_Address, CoApplicant_First_Name, CoApplicant_Last_Name" + 
    "FROM Adopter INNER JOIN AdoptionApplication ON Adopter.Email_Address = AdoptionApplication.Email_Address" +
    "WHERE AdoptionApplication.`State`= 'Approved' AND (Applicant_Last_Name LIKE  ?%) AND (CoApplicant_Last_Name LIKE ?%) AND Application_Number NOT IN" +
              "(SELECT Adoption_Application_Number"+
              "FROM Animal"+
              "WHERE Adoption_Application_Number IS NOT NULL)";
    
    params.push(req.params.ApplicantLastName);
    params.push(req.params.CoApplicantLastName);
 
    db.query(q, params, (err, results) => {
        var approvedApplications=[];

        if(result!=null) {
            result.forEach(a => {
                approvedApplications.push({
                    applicationNumber: a.Application_Number,
                    applicantFirstName: a.Applicant_First_Name,
                    applicantLastName: a.Applicant_Last_Name,
                    street: a.Street,
                    city: a.City,
                    state: a.State,
                    zipCode: a.ZIPCode,
                    phoneNumber: a.Phone_Number,
                    emailAddress: a.Email_Address,
                    coApplicantFirstName: a.CoApplicant_First_Name,
                    coApplicantLastName: a.CoApplicant_Last_Name,
                });

            });
        }
        return res.json(approvedApplications);
    });
};

exports.get_applications_pending_approval = function(req, res) {

    var params = [];
    var q = "SELECT Application_Number, Applicant_First_Name, Applicant_Last_Name, Street, City, Adopter.`State`, ZIPCode, Phone_Number, Adopter.Email_Address, CoApplicant_First_Name, CoApplicant_Last_Name"+ 
    "FROM Adopter INNER JOIN AdoptionApplication ON Adopter.Email_Address = AdoptionApplication.Email_Address"+
    "WHERE AdoptionApplication.`State`= 'Pending Approval'";
       
    db.query(q, params, (err, results) => {
        var pendingApplications=[];

        if(result!=null) {
            result.forEach(p => {
                pendingApplications.push({
                    applicationNumber: p.Application_Number,
                    applicantFirstName: p.Applicant_First_Name,
                    applicantLastName: p.Applicant_Last_Name,
                    street: p.Street,
                    city: p.City,
                    state: p.State,
                    zipCode: p.ZIPCode,
                    phoneNumber: p.Phone_Number,
                    emailAddress: p.Email_Address,
                    coApplicantFirstName: p.CoApplicant_First_Name,
                    coApplicantLastName: p.CoApplicant_Last_Name,
                });
            });
        }
        return res.json(pendingApplications);
    });
};