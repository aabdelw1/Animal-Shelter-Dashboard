exports.get_user = function(req, res) {

  var params = [];
  var q = `SELECT 
              u.First_Name,
              u.Last_Name,
              IfNULL(e.Is_Admin,0) as Is_Admin
            FROM Users u
            LEFT JOIN Employees e on u.Username = e.Username
            WHERE u.Username = ? `

  params.push(req.params.username);

  db.query(q, params, (err, result) => {
    var users=[];

    if (result!=null) {

      result.forEach(u => {
        users.push({
          firstName: u.First_Name,
          lastName: u.Last_Name,
          isAdmin: u.Is_Admin==1
        });
      });

      if (users.length!=0) {
        return res.json(users[0]);
      }

    }
    return res.json({});
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
  var q = `SELECT u.First_Name, u.Last_Name, u.Email_Address, v.Phone_Number
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

  var params = [];
  var q = `SELECT Password FROM Users WHERE Username = ?`

  params.push(req.query.username);

  db.query(q, params, (err, result) => {
    var password=[];

    if (result!=null) {
      result.forEach(p => {
        password.push({
          password: p.Password
         });
      });

      if (password.length!=0) {
        return res.json(password[0]);
      }
    }
    return res.json({});
  });
};

//Get Volunteer of the Month
//SELECT DISTINCT EXTRACT(YEAR_MONTH FROM hours.Date)
//FROM Volunteer AS v
//INNER JOIN VolunteerHours AS hours on hours.Username=v.Username;

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


