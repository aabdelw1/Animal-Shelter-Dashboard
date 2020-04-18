exports.get_user = function(req, res) {

  var params = [];
  var q = `SELECT 
              u.Username,
              u.Email_Address,
              u.First_Name,
              u.Last_Name, (CASE 
              WHEN A.Username = U.Username THEN "Admin"
              WHEN E.Username = U.Username THEN "Employee"
              WHEN V.Username = U.Username THEN "Volunteer"
            END) AS UserType
            FROM Users AS U JOIN Employees AS E JOIN Admin AS A JOIN Volunteer AS V
                WHERE U.Username=? AND (E.Username=U.Username OR A.Username=U.Username OR V.Username=U.Username)`

  params.push(req.params.username);

  db.query(q, params, (err, result) => {
    var users=[];
    console.log(result);
    if (result!=null && result.length!=0) {
      return res.json({ 
        firstName: result[0].First_Name, 
        lastName: result[0].Last_Name, 
        userType: result[0].UserType,
        emailAddress: result[0].Email_Address
       } );
    }
    else {
      return res.json({});
    }
  });
};

exports.get_volunteer_hours = function(req, res) {

  var params = [];
  var q = "SELECT Date, Hours FROM VolunteerHours WHERE Username = ? "

  params.push(req.params.username);

  db.query(q, params, (err, result) => {
    var volunteerhours=[];

    if (result!=null) {

      result.forEach(u => {
        volunteerhours.push({
          date: u.Date,
          hours: u.Hours,
         });
      });
      }
    return res.json(volunteerhours);
  });
};

exports.get_volunteers = function(req, res) {

  var params = [];
  var q = `SELECT u.Username, u.First_Name, u.Last_Name, u.Email_Address, v.Phone_Number
  FROM Volunteer AS v
  INNER JOIN Users AS u on v.Username = u.Username
  WHERE (1=1) `;
  
  if (req.query.lastName != null) {
    q = q + ' AND u.Last_Name like ? ';
    params.push(req.query.lastName+'%');
  }
  if (req.query.firstName != null) {
    q = q + ' AND u.First_Name like ? ';
    params.push(req.query.firstName+'%');
  }
    
  q = q+" ORDER BY u.Last_Name, u.First_Name;";

  db.query(q, params, (err, result) => {
    var volunteers=[];

    if (result!=null) {

      result.forEach(v => {
        volunteers.push({
          username: v.Username,
          firstName: v.First_Name,
          lastName: v.Last_Name,
          emailAddress: v.Email_Address,
          phoneNumber: v.Phone_Number
         });
      });
      }
    return res.json(volunteers);
  });
};

exports.get_password = function(req, res) {

  var query = [];
  var q = ` SELECT Password, (CASE 
              WHEN A.Username = U.Username THEN "Admin"
              WHEN E.Username = U.Username THEN "Employee"
              WHEN V.Username = U.Username THEN "Volunteer"
            END) AS UserType
            FROM Users AS U JOIN Employees AS E JOIN Admin AS A JOIN Volunteer AS V
                WHERE U.Username=? AND (E.Username=U.Username OR A.Username=U.Username OR V.Username=U.Username)
                LIMIT 1`

  query.push(req.query.username);

  db.query(q, query, (err, result) => {
    var password=[];

    if (result!=null) {
      result.forEach(p => {
        password.push({
          password: p.Password,
          userType: p.UserType
         });
      }); 
      if (password.length!=0) {
        return res.json(password);
      }
    }
    return res.json('User not found');
  });
};

//24
exports.get_months_with_volunteer_hours = function(req, res) {
  var params = [];
  var q = ` SELECT DISTINCT EXTRACT(YEAR_MONTH FROM hours.Date) AS YM
            FROM Volunteer AS v
            INNER JOIN VolunteerHours AS hours on hours.Username=v.Username `
  
  db.query(q, params, (err, results) => {
      var yearmonth=[];

      if(results!=null) {
          results.forEach(a => {
            yearmonth.push({
                  yearMonth: a.YM
              });
          });
      }
      return res.json(yearmonth);
  });
};

exports.get_volunteer_of_the_month = function(req, res) {
  var params = [];
  var q = ` SELECT u.First_Name, u.Last_Name, u.Email_Address, sum(Hours) as Hours
            FROM Volunteer AS v
            INNER JOIN Users AS u on v.Username = u.Username
            INNER JOIN VolunteerHours AS hours on hours.Username=v.Username
            WHERE EXTRACT(YEAR_MONTH FROM hours.Date) = ?
            GROUP BY 
              u.First_Name, u.Last_Name, u.Email_Address
            ORDER BY 
              Hours DESC, u.Last_Name ASC
            LIMIT 5`
  
  params.push(req.params.YearMonth);            

  db.query(q, params, (err, results) => {
      var volunteers=[];

      if(results!=null) {
          results.forEach(a => {
            volunteers.push({
                  firstName: a.First_Name,
                  lastName: a.Last_Name,
                  emailAddress: a.Email_Address,
                  hours: a.Hours
              });
          });
      }
      return res.json(volunteers);
  });

};


