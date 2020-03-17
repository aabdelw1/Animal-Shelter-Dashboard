'use strict';
module.exports = function(app) {
  var animalController = require('./controllers/animalController');
  var userController = require('./controllers/userController');

  app.route('/animals')
    .get(animalController.list_all_animals);

  app.route('/animal/:animalId/breeds')
    .get(animalController.get_breeds);

  app.route('/animal/:animalId/vaccines')
    .get(animalController.get_vaccines);

  app.route('/user')
    .get(userController.get_user);

//   app.route('/animal/:animalId')
//     .get(animalController.read_a_task)
//     .put(animalController.update_a_task)
//     .delete(animalController.delete_a_task);

};
