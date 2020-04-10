var express = require('express'),
  app = express(),
  mysql = require('mysql'),
  bodyParser = require('body-parser'),
  cors = require('cors');

// create connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'gatechUser',
    password: 'gatech123',
    database: 'cs6400_sp20_team054',
    multipleStatements: true
});
 
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var routes = require('./routes'); //importing route
routes(app); //register the routes

app.listen(4000, () => {
    console.log("Server running on port 3000");
});
