exports.load_data = async function(req, res) {
    console.log("Initializing database");
    await executeSqlFile('../sql/team054_p3_schema.sql');
    await executeSqlFile('../sql/team054_p3_data_species.sql');
    await executeSqlFile('../sql/team054_p3_data_breeds.sql');
    await executeSqlFile('../sql/team054_p3_data_vaccines.sql');

    await loadAdopters();
    await loadApplications();
    await loadUsers();
    await loadAnimals();
    await loadAdoptions();
    await loadVaccines();
    await loadVolunteerHours();
    console.log("Initialization complete.");
    return res.json({status:"complete"});
}

async function executeSqlFile(filename) {
    var fs = require('fs');
    var sql = fs.readFileSync(filename, 'utf8');
    console.log(` Executing SQL in ${filename}`)
    await db.query(sql);
}

async function loadVaccines() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/vaccinations.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading vaccine administrations");
    for await (const line of rl) {
      var fields = line.split('\t');
      if (fields[4]=='') {
          fields[4] = 'NULL';
      }
      if (fields[0]!='pet_id') {
        var q=`insert into VaccineAdministration (pet_id, vaccine_type, species_name,
            date_administired, expiration_date, vaccination_number, vaccine_submitter) values
            ('${fields[0]}','${fields[1]}', (select species from animal where pet_id=${fields[0]}),
             '${fields[2]}','${fields[3]}',${fields[4]},'${fields[5]}');`;
        //console.log(q); 
        await db.query(q); 
      }
    }        
}

async function loadVolunteerHours() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/Volunteer_Hours.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading volunteer hours");
    for await (const line of rl) {
      var fields = line.split('\t');
      if (fields[0]!='username') {
        var q=`insert into VolunteerHours (username, date, hours) values
            ('${fields[0]}','${fields[1]}', ${fields[2]});`;
        //console.log(q);
        await db.query(q); 
      }
    }        
}

async function loadAnimals() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/Animals.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading animals/animal breeds");
    for await (const line of rl) {
        //pet_id	animal_name	sex	alt_status	local_control	surrender_date	surrender_reason	
        //description	age_months	microchip	username	species_name	group_concat(hb.breed_name)
      var fields = line.split('\t');
      if (fields[0]!='pet_id') {
        fields[6] = fields[6].replace(/'/g,"''");
        fields[7] = fields[7].replace(/'/g,"''");
        var q=`INSERT INTO Animal (
            Pet_ID, Name, Sex, Alteration_Status,
            Surrender_By_Animal_Control, Surrender_Date,
            Surrender_Reason, Description, Age, microchip_id, 
            Surrender_Submitter, Species) values 
            (
                ${fields[0]},'${fields[1]}','${fields[2]}',${fields[3]},${fields[4]},
                '${fields[5]}','${fields[6]}','${fields[7]}',${fields[8]},'${fields[9]}',
                '${fields[10]}','${fields[11]}'
        );`;
        //console.log(q);
        await db.query(q); 
        var breeds = fields[12].split(',');
        for (var i=0;i<breeds.length;i++) {
            var breed=breeds[i].replace("'","''");
            //console.log(" loading breed:"+breed);
            var q2=`INSERT INTO AnimalBreeds (Pet_ID, Breed_Name) values 
            ('${fields[0]}','${breed}');`;
            //console.log(q2);
            await db.query(q2); 
        }
      }
    }        
}

async function loadAdopters() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/Adopter.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading adopters");
    //a_email	a_f_name	a_l_name	a_street_addr	a_city	a_state	a_postal_code	a_phone
    for await (const line of rl) {
      var fields = line.split('\t');
      if (fields[0]!='a_email') {
        var q=`insert into adopter (Email_Address, Applicant_First_Name, 
                Applicant_Last_Name, Street, City, State, ZIPCode, Phone_Number) values 
            (
                '${fields[0]}','${fields[1]}','${fields[2]}','${fields[3]}','${fields[4]}',
                '${fields[5]}','${fields[6]}','${fields[7]}'
        );`;
        //console.log(q);
        await db.query(q); 
      }
    }        
}

async function loadAdoptions() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/Adoptions.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading adoptions (update animal)");
    //pet_id	app_num	adoption_date	fee
    for await (const line of rl) {
      var fields = line.split('\t');
      if (fields[0]!='pet_id') {
        var q=`update animal 
                set 
                    Adoption_Application_number= '${fields[1]}',
                    Adoption_Date='${fields[2]}',
                    Adoption_Fee='${fields[3]}'
                where
                    Pet_ID=${fields[0]};`;
        //console.log(q);
        await db.query(q); 
      }
    }        
}

async function loadApplications() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/Applications.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading adoption applications");
    //app_num	app_date	coapp_f_name	coapp_l_name	a_email	is_approved	is_rejected
    for await (const line of rl) {
      var fields = line.split('\t');
      //'Pending Approval', 'Approved', 'Rejected'
      var state;
      if (fields[6]=='1') {
          state = 'Rejected';
      } else if (fields[5]=='1') {
          state = 'Approved';
      } else {
          state = 'Pending Approval'
      }
      if (fields[0]!='app_num') {
        var q=`insert into AdoptionApplication (application_number, date_of_application, 
                CoApplicant_First_Name, CoApplicant_Last_Name, Email_Address,
                State) values 
            ('${fields[0]}','${fields[1]}','${fields[2]}','${fields[3]}','${fields[4]}','${state}');`;
        //console.log(q);
        await db.query(q); 
      }
    }        
}

async function loadUsers() {
    const fs = require('fs');
    const readline = require('readline');
    const fileStream = fs.createReadStream('../data/Users.tsv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    console.log(" Loading users - employees/admin/volunteer");
    //username	password	u_f_name	u_l_name	email	start_date	
    //is_volunteer	is_owner	is_employee	phone
    for await (const line of rl) {
      var fields = line.split('\t');
      if (fields[0]!='username') {
        var q=`insert into users (username, password, first_name, last_name, 
                email_address, start_date) values  
            ('${fields[0]}','${fields[1]}','${fields[2]}','${fields[3]}',
              '${fields[4]}','${fields[5]}');`;
        //console.log(q);
        await db.query(q); 

        // is_employee
        if (fields[8]=='1') {
            var q2=`insert into employees (username) values  
            ('${fields[0]}');`;
            //console.log(q2);
            await db.query(q2); 
        }
        
        // is_owner
        if (fields[7]=='1') {
            var q2=`insert into admin (username) values  
            ('${fields[0]}');`;
            console.log(q2);
            await db.query(q2); 
        }

        // is_volunteer
        if (fields[6]=='1') {
            var q2=`insert into volunteer (username,phone_number) values 
            ('${fields[0]}','${fields[9]}');`;
            //console.log(q2);
            await db.query(q2); 
        }    
      }
    }        
}