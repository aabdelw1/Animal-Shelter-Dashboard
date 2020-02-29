CREATE TABLE VaccineAdministration (
    Expiration_Date DATE NOT NULL,
    Vacination_Number INT NOT NULL,
    Date_Administired DATE NOT NULL,
    Vaccine VARCHAR(50) NOT NULL,
    PRIMARY KEY (Vaccination_Number, Date_Administired)

);

CREATE TABLE Vaccines (
    Vaccine_Type VARCHAR(250) NOT NULL,
    Require_for_Adoption BOOLEAN NOT NULL
    PRIMARY KEY (Vaccine_Type)
);


ALTER TABLE Vaccines
    ADD CONSTRAINT fk_Vaccine
    FOREIGN KEY (Vaccine_Type) REFERENCES Vaccine(Vaccine_Type);

ALTER TABLE VaccineAdministration
    ADD CONSTRAINT fk_VaccineAdministration_Vaccine_Type_Vaccines_Vaccine_Type
    FOREIGN KEY (Vaccine_Type) REFERENCES Vaccine(Vaccine_Type);

