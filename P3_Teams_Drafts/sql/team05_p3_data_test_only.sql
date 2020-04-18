-- TEST DATA --

INSERT INTO Users (Username, Password, Email_Address, First_Name, Last_Name, Start_Date) VALUES 
('ijones','xxx','ijones@shelter.com','Inge','Jones','2020/1/1'),
('fedwards','xxx','fedwards@shelter.com','Frank','Edwards','2020/1/1'),
('bsmith','xxx','bsmith@gmail.com','Bob','Smith','2020/1/7'),
('dsanders','xxx','ds2000@gmail.com','Donna','Sanders','2020/1/3'),
('jjohnson','xxx','johnsonj123@gmail.com','John','Johnson','2020/1/3');

INSERT INTO Volunteer (Username, Phone_Number) VALUES 
('bsmith','904-867-5309'),
('dsanders','904-867-5309');

INSERT INTO Employees (Username) VALUES
('fedwards'),
('jjohnson');

INSERT INTO Admin (Username) VALUES
('ijones');

INSERT INTO VolunteerHours (Username, Date, Hours) VALUES
('bsmith','2020/1/2',5),
('bsmith','2020/1/6',2),
('bsmith','2020/1/9',4),
('bsmith','2020/1/21',3),
('bsmith','2020/1/22',8),
('dsanders','2020/1/4',3),
('dsanders','2020/1/5',2),
('dsanders','2020/1/8',4),
('dsanders','2020/1/12',2),
('dsanders','2020/1/15',3),
('dsanders','2020/1/18',4),
('dsanders','2020/1/19',2),
('dsanders','2020/1/21',2);

INSERT INTO Animal
(Name,Description,Age,Sex,Alteration_Status,Surrender_Reason,Surrender_By_Animal_Control,Surrender_Date,Surrender_Submitter,Adoption_Date,Species)
VALUES
('Grace','Brown cat',1,'Female',0,'Lost',1,'2020/1/14','ijones','2020/2/4','Cat'),
('Cinder','Medium black dog',1,'Male',0,'Lost',1,'2020/2/12','ijones',NULL,'Dog'),
('Fido','Small brown dog',2,'Male',0,'Lost',0,'2020/2/1','fedwards',NULL,'Dog');

INSERT INTO AnimalBreeds
(Pet_ID,Breed_Name)
VALUES
(1,'Birman'),
(2,'Bloodhound'),
(2,'Yorkshire Terrier'),
(3,'Maltipoo');

INSERT INTO VaccineAdministration                  
(Pet_ID, Species_Name, Vaccine_Type, Vaccination_Number, 
 Date_Administired, Expiration_Date, Vaccine_Submitter)
VALUES
(2,'Dog','Parvovirus','12345','2020-3-20','2021-3-21','fedwards'),
(2,'Dog','Parainfluenza',NULL,'2020-1-20','2020-4-20','fedwards'),
(3,'Dog','Parainfluenza',NULL,'2020-1-25','2020-4-25','jjohnson');


INSERT INTO Adopter
(Email_Address, Phone_Number, Street, City, State, ZIPCode, Applicant_First_Name, Applicant_Last_Name)
VALUES
('sford@mail.com', 1234567, '123 St', 'Miami', 'Florida', '12345', 'Sally', 'Ford'),
('djones@mail.com', 8901234, '456 St', 'Miami', 'Florida', '12345', 'Darren', 'Jones');

INSERT INTO AdoptionApplication
(Email_Address, Date_Of_Application)
VALUES 
('sford@mail.com', '2020-01-25'),
('djones@mail.com', '2020-02-25');

