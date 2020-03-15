'use strict';
module.exports = function(app) {
  var animalController = require('./controllers/animalController');

  app.route('/animals')
    .get(animalController.list_all_animals);

//   app.route('/animal/:animalId')
//     .get(animalController.read_a_task)
//     .put(animalController.update_a_task)
//     .delete(animalController.delete_a_task);

};
