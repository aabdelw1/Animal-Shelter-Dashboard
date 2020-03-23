'use strict';
module.exports = function(app) {
  var animalController = require('./controllers/animalController');
  var userController = require('./controllers/userController');
  var adopterController = require('./controllers/adopterController');

  app.route('/animals')
    .get(animalController.list_all_animals);

  app.route('/animal/:animalId/breeds')
    .get(animalController.get_breeds);

  app.route('/animal/:animalId/vaccines')
    .get(animalController.get_vaccines);

  app.route('/user')
    .get(userController.get_user);

  app.route('/AdoptionApplications/:ApplicantLastName&:CoApplicantLastName')
    .get(adopterController.get_approved_applications);

  app.route('/AdoptionApplicationsPendingApproval')
    .get(adopterController.get_applications_pending_approval);

//   app.route('/animal/:animalId')
//     .get(animalController.read_a_task)
//     .put(animalController.update_a_task)
//     .delete(animalController.delete_a_task);

};
