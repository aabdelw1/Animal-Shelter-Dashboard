DROP DATABASE IF EXISTS cs6400_sp20_team054; 
SET default_storage_engine=InnoDB;
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS cs6400_sp20_team054 
    DEFAULT CHARACTER SET utf8mb4 
    DEFAULT COLLATE utf8mb4_unicode_ci;
USE cs6400_sp20_team054;

-- CREATE USER IF NOT EXISTS gatechUser@localhost IDENTIFIED BY 'gatech123';
-- GRANT SELECT, INSERT, UPDATE, DELETE, FILE ON *.* TO 'gatechUser'@'localhost';
-- GRANT ALL PRIVILEGES ON `gatechuser`.* TO 'gatechUser'@'localhost';
-- GRANT ALL PRIVILEGES ON `cs6400_sp20_team054`.* TO 'gatechUser'@'localhost';
-- FLUSH PRIVILEGES;

#-----------------------

CREATE TABLE Breed (
  Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Animal (
  Pet_ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  Description VARCHAR(200) NOT NULL,
  Age DECIMAL NOT NULL CONSTRAINT Age_Range CHECK (Age>0),
  Microchip_ID VARCHAR(15) DEFAULT NULL,
  Sex ENUM ('Male','Female','Unknown') DEFAULT NULL,
  Alteration_Status BOOLEAN DEFAULT NULL,
  Surrender_Reason VARCHAR(45) DEFAULT NULL,
  Surrender_By_Animal_Control BOOLEAN DEFAULT (0),
  Surrender_Date DATE NOT NULL,
  Adoption_Date DATE DEFAULT NULL,
  Adoption_Fee DECIMAL DEFAULT NULL,
  Adoption_Application_Number INT NOT NULL,
  Species VARCHAR(50),
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

CREATE TABLE BreedSpecies (
  Breed_Name VARCHAR(50) NOT NULL,
  Species_Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Breed_Name, Species_Name)
);

-- Constraints   Foreign Keys: FK_ChildTable_childColumn_ParentTable_parentColumn

ALTER TABLE AnimalBreeds
  ADD CONSTRAINT fk_AnimalBreeds_Breed_Name_Breed_Name
  FOREIGN KEY (Breed_Name) REFERENCES Breed(Name);
        
ALTER TABLE AnimalBreeds
  ADD CONSTRAINT fk_AnimalBreeds_Pet_ID_Animal_Pet_ID
  FOREIGN KEY (Pet_ID) REFERENCES Animal(Pet_ID);

ALTER TABLE BreedSpecies
  ADD CONSTRAINT fk_BreedSpecies_Breed_Name_Breed_Name
  FOREIGN KEY (Breed_Name) REFERENCES Breed(Name);
        
ALTER TABLE BreedSpecies
  ADD CONSTRAINT fk_BreedSpecies_Species_Name_Species_Name
  FOREIGN KEY (Species_Name) REFERENCES Species(Name);

ALTER TABLE Animal
  ADD CONSTRAINT fk_Animal_Application_Number_Shelter_Application_Number
  FOREIGN KEY (Adoption_Application_Number) REFERENCES AdoptionApplication(Application_Number);

ALTER TABLE Animal
  ADD CONSTRAINT fk_Animal_Species_Species_Name
  FOREIGN KEY (Species) REFERENCES Species(Name);

