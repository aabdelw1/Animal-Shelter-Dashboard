-- volunteer of the month
-- For a selected month, the top 5 volunteers by total hours volunteered for that month will be provided in this report. 
-- Their first name, last name, email address, and number of hours volunteered will be displayed, 
-- ordered by total hours descending, followed by last name ascending in the event that there is a tie.

SELECT EXTRACT(YEAR_MONTH FROM hours.Date),u.First_Name, u.Last_Name, u.Email_Address, sum(Hours)
FROM Volunteer v
INNER JOIN Users u on v.Username = u.Username
INNER JOIN VolunteerHours hours on hours.Username=v.Username
GROUP BY EXTRACT(YEAR_MONTH FROM hours.Date),u.First_Name, u.Last_Name, u.Email_Address
ORDER BY EXTRACT(YEAR_MONTH FROM hours.Date), u.Last_Name, u.First_Name;