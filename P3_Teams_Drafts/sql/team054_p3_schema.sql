DROP DATABASE IF EXISTS 
cs6400_sp20_team054;
SET default_storage_engine=InnoDB;
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS cs6400_sp20_team054
   DEFAULT CHARACTER SET utf8mb4
   DEFAULT COLLATE utf8mb4_unicode_ci;
USE cs6400_sp20_team054;

/*
DROP USER gatechUser@localhost;
CREATE USER IF NOT EXISTS gatechUser@localhost IDENTIFIED WITH mysql_native_password BY 'gatech123';
GRANT SELECT, INSERT, UPDATE, DELETE, FILE ON *.* TO 'gatechUser'@'localhost';
GRANT ALL PRIVILEGES ON `gatechuser`.* TO 'gatechUser'@'localhost';
GRANT ALL PRIVILEGES ON `cs6400_fa17_team001`.* TO 'gatechUser'@'localhost';
FLUSH PRIVILEGES;
*/

-- Tables

CREATE TABLE Adopter (
  Email_Address VARCHAR(250) NOT NULL,
  Phone_Number INT NOT NULL,
  Street VARCHAR(50) NOT NULL,
  City VARCHAR(50) NOT NULL,
  State VARCHAR(50) NOT NULL,
  ZIPCode VARCHAR(50) NOT NULL,
  Applicant_First_Name VARCHAR(100) NOT NULL,
  Applicant_Last_Name VARCHAR(100) NOT NULL,
  PRIMARY KEY (Email_Address)
);

CREATE TABLE AdoptionApplication (
  Application_Number INT NOT NULL AUTO_INCREMENT,
  Email_Address VARCHAR(250) NOT NULL,
  Date_Of_Application DATE NOT NULL,
  CoApplicant_First_Name VARCHAR(100) DEFAULT NULL,
  CoApplicant_Last_Name VARCHAR(100) DEFAULT NULL,
  State ENUM('Pending Approval', 'Approved', 'Rejected') DEFAULT 'Pending Approval',
  PRIMARY KEY (Application_Number),
  KEY(Email_Address)
);

CREATE TABLE Users(
   Username VARCHAR(10) NOT NULL,
   Password VARCHAR(50) NOT NULL,
   Email_Address VARCHAR(255) DEFAULT NULL,
   First_Name VARCHAR(20) NOT NULL,
   Last_Name VARCHAR(20) NOT NULL,
   Start_Date DATE NOT NULL,
   PRIMARY KEY (Username)
);

CREATE TABLE Admin(
  Username VARCHAR(10) NOT NULL,
  PRIMARY KEY (Username)
);

CREATE TABLE Employees(
  Username VARCHAR(10) NOT NULL,
  PRIMARY KEY (Username)
);

CREATE TABLE Volunteer(
  Username VARCHAR(10) NOT NULL,
  Phone_Number VARCHAR(20) NOT NULL,
  PRIMARY KEY (Username)
);

CREATE TABLE VolunteerHours(
  Username VARCHAR(10) NOT NULL,
  Date DATE NOT NULL,
  Hours INT NOT NULL,
  PRIMARY KEY (Username, Date, Hours)
);

CREATE TABLE Animal (
  Pet_ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  Description VARCHAR(200) NOT NULL,
  Age DECIMAL NOT NULL CONSTRAINT Age_Range CHECK (Age>0),
  Microchip_ID VARCHAR(15) DEFAULT NULL,
  Sex ENUM ('Male','Female','Unknown') NOT NULL,
  Alteration_Status BOOLEAN NOT NULL,
  Surrender_Reason VARCHAR(45) NOT NULL,
  Surrender_By_Animal_Control BOOLEAN DEFAULT (0),
  Surrender_Date DATE NOT NULL,
  Surrender_Submitter VARCHAR(250) NOT NULL,
  Adoption_Date DATE DEFAULT NULL,
  Adoption_Fee DECIMAL DEFAULT NULL,
  Adoption_Application_Number INT NULL,
  Species VARCHAR(50) NOT NULL,
  PRIMARY KEY (Pet_ID)
);

CREATE TABLE AnimalBreeds (
  Pet_ID INT NOT NULL,
  Breed_Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Pet_ID, Breed_Name)
);

CREATE TABLE Species (
  Name VARCHAR(50) NOT NULL,
  Max_Per_Shelter DECIMAL NOT NULL CONSTRAINT Shelter_Range CHECK (Max_Per_Shelter>1),
  PRIMARY KEY (Name)
);

CREATE TABLE Breed (
  Name VARCHAR(50) NOT NULL,
  Species_Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Name, Species_Name)
);

CREATE TABLE VaccineAdministration (
   Pet_ID INT NOT NULL,
   Species_Name VARCHAR(50) NOT NULL,
   Vaccine_Type VARCHAR(50) NOT NULL,
   Vaccination_Number INT DEFAULT NULL,
   Date_Administired DATE NOT NULL,
   Expiration_Date DATE NOT NULL,
   Vaccine_Submitter VARCHAR(10) NOT NULL,
   PRIMARY KEY (Pet_ID, Date_Administired, Vaccine_Type)
);

CREATE TABLE Vaccine (
   Vaccine_Type VARCHAR(250) NOT NULL,
   Species_Name VARCHAR(50) NOT NULL,
   Require_for_Adoption BOOLEAN NOT NULL,
   PRIMARY KEY (Species_Name,Vaccine_Type)
);

-- Constraints   Foreign Keys: FK_ChildTable_childColumn_ParentTable_parentColumn

ALTER TABLE VolunteerHours
  ADD CONSTRAINT fk_VolunteerHours_Username_Volunteer_Username
  FOREIGN KEY (Username) REFERENCES Volunteer(Username);

ALTER TABLE AdoptionApplication
  ADD CONSTRAINT fk_AdoptionApplication_EmailAddress_Adopter_EmailAddress
  FOREIGN KEY (Email_Address) REFERENCES Adopter(Email_Address);

ALTER TABLE Volunteer
  ADD CONSTRAINT fk_Volunteer_Username_User_Username
  FOREIGN KEY (Username) REFERENCES Users(Username);

ALTER TABLE AnimalBreeds
  ADD CONSTRAINT fk_AnimalBreeds_Breed_Name_Breed_Name
  FOREIGN KEY (Breed_Name) REFERENCES Breed(Name);

ALTER TABLE AnimalBreeds
  ADD CONSTRAINT fk_AnimalBreeds_Pet_ID_Animal_Pet_ID
  FOREIGN KEY (Pet_ID) REFERENCES Animal(Pet_ID);

ALTER TABLE Breed
  ADD CONSTRAINT fk_Breed_Species_Name_Species_Name
  FOREIGN KEY (Species_Name) REFERENCES Species(Name);

ALTER TABLE Animal
  ADD CONSTRAINT fk_Animal_Application_Number_Shelter_Application_Number
  FOREIGN KEY (Adoption_Application_Number) REFERENCES AdoptionApplication(Application_Number);

ALTER TABLE Animal
  ADD CONSTRAINT fk_Animal_Species_Species_Name
  FOREIGN KEY (Species) REFERENCES Species(Name);

ALTER TABLE Animal
  ADD CONSTRAINT fk_Animal_Surrender_Submitter_Users_Username
  FOREIGN KEY (Surrender_Submitter) REFERENCES Users(Username);

ALTER TABLE Admin
  ADD CONSTRAINT fk_Admin_Username_Users_Username
  FOREIGN KEY (Username) REFERENCES Users(Username);

ALTER TABLE Employees
  ADD CONSTRAINT fk_Employees_Username_Users_Username
  FOREIGN KEY (Username) REFERENCES Users(Username);
  
ALTER TABLE VaccineAdministration
  ADD CONSTRAINT fk_VaccineAdministration_Vaccine_Submitter_Users_Username
  FOREIGN KEY (Vaccine_Submitter) REFERENCES Users(Username);
  
ALTER TABLE VaccineAdministration
  ADD CONSTRAINT fk_VaccineAdministration_Pet_ID_Animal_Pet_ID
  FOREIGN KEY (Pet_ID) REFERENCES Animal(Pet_ID);
   
ALTER TABLE VaccineAdministration
  ADD CONSTRAINT fk_VaccineAdministration_Vaccine_Type_Vaccines_Vaccine_Type
  FOREIGN KEY (Species_Name,Vaccine_Type) REFERENCES Vaccine(Species_Name,Vaccine_Type);

ALTER TABLE Vaccine
  ADD CONSTRAINT fk_Vaccine_Species_Name_Species_Name
  FOREIGN KEY (Species_Name) REFERENCES Species(Name);