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
  var q = "SELECT password FROM Users WHERE UserName = ?";

  params.push(req.query.username);

  db.query(q, params, (err, result) => {
    var password=[];

    if (result!=null) {

      result.forEach(u => {
        password.push({
          password: p.password
         });
      });

      if (users.length!=0) {
        return res.json(users[0]);
      }

    }
    return res.json({});
  });
};




//app.route('/login/:username')
//.get(userController.get_password);