CREATE DATABASE IF NOT EXISTS fullstackdb;
USE fullstackdb;
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON fullstackdb.* TO 'root'@'localhost';

CREATE TABLE IF NOT EXISTS fullstackdb.lego_pieces (
      id INT PRIMARY KEY AUTO_INCREMENT,
      piece VARCHAR(255),
      type VARCHAR(255)
  );
