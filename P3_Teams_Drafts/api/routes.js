'use strict';
module.exports = function(app) {
  var animalController = require('./controllers/animalController');
  var userController = require('./controllers/userController');
  var adopterController = require('./controllers/adopterController');
  var speciesController = require('./controllers/speciesController');
  var breedController = require('./controllers/breedController');

  app.get('/animals',animalController.list_all_animals);
  app.post('/animal/add', animalController.add_animal);
  app.get('/animal/:animalId', animalController.get_animal);
  app.get('/animal/:animalId/breeds', animalController.get_breeds);
  app.get('/animal/:animalId/vaccines', animalController.get_vaccines);

  app.get('/user/:username', userController.get_user);

  app.route('/login')
    .get(userController.get_password);

  app.route('/volunteerHours/:username')//
    .get(adopterController.get_volunteer_hours);
    //http://localhost:3000/volunteerHours?username=bsmith

  app.get('/breeds/:species',breedController.list_breeds);

  app.get('/species',speciesController.list_species);

  //12  
  app.route('/AdoptionApplications')
    .get(adopterController.get_approved_applications);

  //14 Works    
  app.route('/newadoptionapplication')
    .post(adopterController.post_new_adoption_application);

  //15 Works    
  app.route('/newadopter')
    .post(adopterController.post_new_adopter);

  //16 Works
  app.route('/adopter/:EmailAddress')//http://localhost:3000/adopter/test2@test ///:EmailAddress
    .get(adopterController.get_adopter);
  //17 
  app.route('/AdoptionApplicationsNumber')
    .get(adopterController.get_applications_number);

  //18  
  app.route('/AdoptionApplicationsPendingApproval')
  .get(adopterController.get_applications_pending_approval);

//   app.route('/animal/:animalId')
//     .get(animalController.read_a_task)
//     .put(animalController.update_a_task)
//     .delete(animalController.delete_a_task);



};
