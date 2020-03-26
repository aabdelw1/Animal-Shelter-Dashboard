'use strict';
module.exports = function(app) {
  var animalController = require('./controllers/animalController');
  var userController = require('./controllers/userController');
  var adopterController = require('./controllers/adopterController');

  app.get('/animals',animalController.list_all_animals);
  app.post('/animal/add', animalController.add_animal);
  app.get('/animal/:animalId', animalController.get_animal);
  app.get('/animal/:animalId/breeds', animalController.get_breeds);
  app.get('/animal/:animalId/vaccines', animalController.get_vaccines);

  app.get('/user/:username', userController.get_user);

  app.route('/AdoptionApplications/:ApplicantLastName&:CoApplicantLastName')
    .get(adopterController.get_approved_applications);

  app.route('/AdoptionApplicationsPendingApproval')
    .get(adopterController.get_applications_pending_approval);

//   app.route('/animal/:animalId')
//     .get(animalController.read_a_task)
//     .put(animalController.update_a_task)
//     .delete(animalController.delete_a_task);

};
