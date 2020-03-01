USE cs6400_sp20_team054;

-- volunteer lookup
-- this report will allow an entry for first name and/or last name and 
-- return any results whose values contain the criteria. 
-- An entry of last name for “Jon” would return “Jonson”, “Jonstone”, “Jonsdottir”, etc. 
-- The results should display the volunteer’s first name, last name, email address, and phone number, 
-- sorted by last name ascending and first name ascending.

SELECT u.First_Name, u.Last_Name, u.Email_Address, v.Phone_Number
FROM Volunteer v
INNER JOIN Users u on v.Username = u.Username
WHERE u.Last_Name like 'S%'  
ORDER BY u.Last_Name, u.First_Name;
