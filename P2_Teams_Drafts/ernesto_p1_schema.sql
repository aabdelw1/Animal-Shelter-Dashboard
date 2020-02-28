CREATE TABLE Adopter (
  Email_Address VARCHAR(250) NOT NULL,
  Phone_Number INT NOT NULL,
  Street VARCHAR(50) NOT NULL,
  City VARCHAR(50) NOT NULL,
  `State` VARCHAR(50) NOT NULL,
  ZIPCode VARCHAR(50) NOT NULL
  Applicant_Fist_Name VARCHAR(100) NOT NULL
  Applicant_Last_Name VARCHAR(100) NOT NULL
  PRIMARY KEY (Email_Address),
);

CREATE TABLE AdoptionApplication (
  Application_Number INT NOT NULL,
  Email_Address VARCHAR(250) NOT NULL,
  Date_Of_Application DATE NOT NULL,
  CoApplicant_First_Name VARCHAR(100) NOT NULL,
  CoApplicant_Last_Name VARCHAR(100) NOT NULL,
  `State` ENUM('Pending Approval', 'Approved', 'Rejected') DEFAULT 'Pending Approval',
  PRIMARY KEY (Application_Number),
  KEY(Email_Address),
);

-- Constraints   Foreign Keys: FK_ChildTable_childColumn_ParentTable_parentColumn

ALTER TABLE AdoptionApplication
  ADD CONSTRAINT fk_AdoptionApplication_EmailAddress_Adopter_EmailAddress FOREIGN KEY (Email_Address) REFERENCES Adopter (Email_Address);
 



