DROP DATABASE IF EXISTS Shelter;
CREATE DATABASE IF NOT EXISTS Shelter;

CREATE TABLE IF NOT EXISTS Shelter.Users(
    Username VARCHAR(10) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    UserType VARCHAR(10) NOT NULL,
    EmailAddress VARCHAR(255) DEFAULT NULL,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    StartDate DATE NOT NULL,
    PRIMARY KEY (Username)
);

CREATE TABLE IF NOT EXISTS Shelter.Volunteer(
    Username VARCHAR(10) NOT NULL,
    PhoneNumber VARCHAR(20) NOT NULL,
    FOREIGN KEY (Username) REFERENCES Shelter.Users(Username)
);

CREATE TABLE IF NOT EXISTS Shelter.VolunteerHours(
    Username VARCHAR(10) NOT NULL,
    Date DATE,
    Hours int DEFAULT NULL,
    PRIMARY KEY (Username, Date),
    FOREIGN KEY (Username) REFERENCES Shelter.Volunteer(Username)
);