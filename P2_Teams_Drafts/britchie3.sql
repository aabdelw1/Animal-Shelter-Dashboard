#DROP SCHEMA Shelter ;

CREATE SCHEMA Shelter ;

CREATE TABLE Shelter.Breed (
  Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Shelter.AdoptionApplication (
  Application_Number INT NOT NULL,
  # Rest of fields here
  PRIMARY KEY (Application_Number)
);

CREATE TABLE Shelter.Animal (
  Pet_ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  Description VARCHAR(200) NOT NULL,
  Age DECIMAL NOT NULL 
		CONSTRAINT Age_Range CHECK (Age>0),
  Microchip_ID VARCHAR(15) DEFAULT NULL,
  Sex VARCHAR(7) DEFAULT NULL 
		CONSTRAINT Sex_Values CHECK (Sex='Male' OR Sex='Female' OR Sex='Unknown'),
  Alteration_Status BOOLEAN DEFAULT NULL,
  Surrender_Reason VARCHAR(45) DEFAULT NULL,
  Surrender_By_Animal_Control BOOLEAN DEFAULT (0),
  Surrender_Date DATE NOT NULL,
  Adoption_Date DATE DEFAULT NULL,
  Adoption_Fee DECIMAL DEFAULT NULL,
  Adoption_Application_Number INT NOT NULL,
  PRIMARY KEY (Pet_ID),
  FOREIGN KEY (Adoption_Application_Number)
        REFERENCES Shelter.AdoptionApplication(Application_Number)
);

CREATE TABLE Shelter.AnimalBreeds (
  Pet_ID INT NOT NULL,
  Breed_Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Pet_ID, Breed_Name),
  FOREIGN KEY (Breed_Name)
        REFERENCES Shelter.Breed(Name),
  FOREIGN KEY (Pet_ID)
        REFERENCES Shelter.Animal(Pet_ID)
);

CREATE TABLE Shelter.Species (
  Name VARCHAR(50) NOT NULL,
  Max_Per_Shelter DECIMAL NOT NULL 
		CONSTRAINT Shelter_Range CHECK (Max_Per_Shelter>1),
  PRIMARY KEY (Name)
);

CREATE TABLE Shelter.BreedSpecies (
  Breed_Name VARCHAR(50) NOT NULL,
  Species_Name VARCHAR(50) NOT NULL,
  PRIMARY KEY (Breed_Name, Species_Name),
  FOREIGN KEY (Breed_Name)
        REFERENCES Shelter.Breed(Name),
  FOREIGN KEY (Species_Name)
        REFERENCES Shelter.Species(Name)
);

