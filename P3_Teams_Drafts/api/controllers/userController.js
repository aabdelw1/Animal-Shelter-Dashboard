exports.get_user = function(req, res) {

  var params = [];
  var q = `SELECT 
              u.First_Name,
              u.Last_Name,
              IfNULL(e.Is_Admin,0) as Is_Admin
            FROM Users u
            LEFT JOIN Employees e on u.Username = e.Username
            WHERE u.Username = ? `

  params.push(req.query.username);

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