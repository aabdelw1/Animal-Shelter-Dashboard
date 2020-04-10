DROP DATABASE IF EXISTS cs6400_sp20_team054;
SET default_storage_engine=InnoDB;
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS cs6400_sp20_team054
   DEFAULT CHARACTER SET utf8mb4
   DEFAULT COLLATE utf8mb4_unicode_ci;
USE cs6400_sp20_team054;

DROP USER gatechUser@localhost;
CREATE USER IF NOT EXISTS gatechUser@localhost IDENTIFIED WITH mysql_native_password BY 'gatech123';
GRANT SELECT, INSERT, UPDATE, DELETE, FILE ON *.* TO 'gatechUser'@'localhost';
GRANT ALL PRIVILEGES ON `gatechuser`.* TO 'gatechUser'@'localhost';
GRANT DROP ON TABLE `cs6400_sp20_team054`.* TO 'gatechUser'@'localhost';
GRANT CREATE ON TABLE `cs6400_sp20_team054`.* TO 'gatechUser'@'localhost';
GRANT ALTER ON TABLE `cs6400_sp20_team054`.* TO 'gatechUser'@'localhost';
GRANT REFERENCES ON TABLE `cs6400_sp20_team054`.* TO 'gatechUser'@'localhost';
FLUSH PRIVILEGES;