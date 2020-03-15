## Getting Started
* Install node.js (v12.16.1)
* Start terminal session
* cd to api directory
* Download required node modules
  * npm update
* Install nodemon for development.  Auto-recompile server while in development.
  * su npm install -g nodemon

## Setting up database
* Install mysql (v8)
* Execute ../sql/team054_p3_schema.sql
* Execute ../sql/team054_p3_data.sql

## Starting the server
* Start node from a terminal session
  * node server.js
* Or in development mode
  * nodemon server.js
* Browse to an API endpoint
  * http://localhost:3000/animals

## Developing new API endpoints
* Add contoller file to folder ./controllers
* Add route to ./route.js calling controller