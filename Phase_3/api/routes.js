'use strict';
module.exports = function(app) {
  var animalController = require('./controllers/animalController');
  var animalsController = require('./controllers/animalsController');
  var userController = require('./controllers/userController');
  var adopterController = require('./controllers/adopterController');
  var speciesController = require('./controllers/speciesController');
  var breedController = require('./controllers/breedController');
  var adoptionReportController = require('./controllers/adoptionReportController');
  var vaccineController = require('./controllers/vaccineController');
  var initController = require('./controllers/initController');

  app.get('/initdb',initController.load_data); 

  app.get('/animals',animalsController.list_all_animals);

  app.post('/animal/add', animalController.add_animal);
  app.get('/animal/:animalId', animalController.get_animal);
  app.get('/animal/:animalId/breeds', animalController.get_breeds);
  app.post('/animal/:animalId/vaccines/add', animalController.add_vaccine);
  app.get('/animal/:animalId/vaccines', animalController.get_vaccines);
  app.get('/animal/:animalId/vaccines/:vaccineType', animalController.get_vaccine);
  
  app.get('/breeds/:species',breedController.list_breeds);
  app.get('/species',speciesController.list_species);
  app.get('/species/:species/vaccines', speciesController.list_species_vaccines);

  app.get('/users/volunteers', userController.get_volunteers);
  app.get('/user/:username', userController.get_user);
  app.get('/user/:username/volunteerHours', userController.get_volunteer_hours);

  app.get('/adoption/report', adoptionReportController.get_adoption_report);

  //1 Works
  app.route('/login').get(userController.get_password);

  app.route('/vaccines/:PetID').get(vaccineController.get_eligible_vaccines_for_Pet);

  ///11 Works
  app.route('/vaccineReminderReport').get(vaccineController.get_vaccine_reminder_report);

  //12 Works
  app.route('/adoptionApplications').get(adopterController.get_approved_applications);

  //13 Works
  app.route('/updateAnimalAdoptionInformation/:PetID').put(animalController.put_animal_adoption_information);

  app.route('/updateAnimalInformation/:PetID').put(animalController.put_update_animal_information);

  //14 Works    
  app.route('/newAdoptionApplication').post(adopterController.post_new_adoption_application);

  //15 Works    
  app.route('/newAdopter').post(adopterController.post_new_adopter);

  //16 Works
  app.route('/adopter').get(adopterController.get_adopter);

  //17 Works
  app.route('/adoptionApplicationsNumber').get(adopterController.get_applications_number);

  //18 Works
  app.route('/adoptionApplicationsPendingApproval').get(adopterController.get_applications_pending_approval);

  //19 Works
  app.route('/adoptionApplicationApprove/:applicationNumber').put(adopterController.put_application_status_approve);

  //20 Works
  app.route('/adoptionApplicationReject/:applicationNumber').put(adopterController.put_application_status_reject);

  //23 Works
  app.route('/viewAnimalControlReportLists').get(animalsController.get_animal_control_report);

  //24
  app.route('/viewAnimalControlSurrenders/:YearMonth').get(animalsController.get_report_animal_control_surrenders);

  //25
  app.route('/viewAnimalAdoptedOver60Days/:YearMonth').get(animalsController.get_report_animal_adopted_over_60_days);

  //26 Works
  app.route('/monthsWithVolunteerHours').get(userController.get_months_with_volunteer_hours);

  //27 Works
  app.route('/volunteeroftheMonth/:YearMonth').get(userController.get_volunteer_of_the_month);


};

