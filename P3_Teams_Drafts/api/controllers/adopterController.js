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

        if(results!=null) {
            results.forEach(a => {
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
                    coApplicantLastName: a.CoApplicant_Last_Name
                });

            });
        }
        return res.json(approvedApplications);
    });
};

exports.get_applications_pending_approval = function(req, res) {

    var params = [];
    var q = `SELECT Application_Number, Applicant_First_Name, Applicant_Last_Name, Street, City, Adopter.State, ZIPCode, Phone_Number, Adopter.Email_Address, CoApplicant_First_Name, CoApplicant_Last_Name 
    FROM Adopter INNER JOIN AdoptionApplication ON Adopter.Email_Address = AdoptionApplication.Email_Address
    WHERE AdoptionApplication.State= 'Pending Approval'`
    
    db.query(q, params, (err, results) => {
        var pendingApplications=[];

        if(results!=null) {
            results.forEach(p => {
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
                    coApplicantLastName: p.CoApplicant_Last_Name
                });
            });
        }
        return res.json(pendingApplications);
    });
};


exports.get_applications_number = function(req, res) {

    var params = [];
    var q = "SELECT Application_Number"+
    "FROM AdoptionApplication"+
    "WHERE Email_Address= ? AND Date_Of_Application = ?"+
    "AND CoApplicant_First_Name = ? AND CoApplicant_Last_Name = ?";
    
    params.push(req.params.EmailAddress);
    params.push(req.params.DateOfApplication);
    params.push(req.params.CoApplicantFirstName);
    params.push(req.params.CoApplicantLastName);

    db.query(q, params, (err, results) => {
        var applicationNumber=[];

        if(results!=null) {
            results.forEach(a => {
                applicationNumber.push({
                    applicationNumber: a.Application_Number
                });
            });
        }
        return res.json(applicationNumber);
    });
};

exports.post_new_adoption_application = function(req, res) {
    var params = [];
    var q = `INSERT INTO AdoptionApplication (Email_Address, Date_Of_Application, CoApplicant_First_Name, CoApplicant_Last_Name, State)
    VALUES (?, ?, ?, ?, 'Pending Approval')`
    //
    params.push(req.body.emailAddress);
    params.push(req.body.dateOfApplication);
    params.push(req.body.coApplicantFirstName);
    params.push(req.body.coApplicantLastName);

    db.query(q, params, (err, results) => {
       if(err) throw err;
      //console.log("1 record inserted"); 
       res.send('done :)');
    });

};

exports.post_new_adopter = function(req, res) {

    var params = [];
    var q = `INSERT INTO Adopter (Email_Address, Phone_Number, Street, City, State, ZIPCode, Applicant_Fist_Name, Applicant_Last_Name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    
    params.push(req.body.emailAddress);
    params.push(req.body.phoneNumber);
    params.push(req.body.street);
    params.push(req.body.city);
    params.push(req.body.state);
    params.push(req.body.zipCode);
    params.push(req.body.applicantFirstName);
    params.push(req.body.applicantLastName);

    db.query(q, params, (err, results) => {
       if(err) throw err;
      //console.log("1 record inserted"); 
       res.send('done');
    });
};



exports.get_adopter = function(req, res) {

    var params = [];
    var q = "SELECT Email_Address FROM Adopter WHERE Email_Address = ? "//+
    
    params.push(req.params.EmailAddress);

    db.query(q, params, (err, result) => {
        var adopter=[];

        if(result!=null) {
            result.forEach(a => {
                adopter.push({
                    emailAddress: a.Email_Address
                });
            });
        }
        return res.json(adopter);
    });
};



exports.get_volunteer_hours = function(req, res) {

    var params = [];
    var q = "SELECT Username, Date, Hours FROM VolunteerHours WHERE (1=1) AND Username = ? "
  
    params.push(req.params.username);

    db.query(q, params, (err, result) => {
      var volunteerhours=[];
  
      if (result!=null) {
  
        result.forEach(u => {
          volunteerhours.push({
            username: u.Username,
            date: u.Date,
            hours: u.Hours,
           });
        });
        }
      return res.json(volunteerhours);
    });
  };