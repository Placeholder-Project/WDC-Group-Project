-- MySQL dump 10.16  Distrib 10.2.15-MariaDB, for osx10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: placeholder
-- ------------------------------------------------------
-- Server version	10.2.15-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `placeholder`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `placeholder` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `placeholder`;

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bookings` (
  `email` varchar(40) DEFAULT NULL,
  `arrival` date DEFAULT NULL,
  `departure` date DEFAULT NULL,
  `no_adults` int(2) DEFAULT NULL,
  `no_children` int(2) DEFAULT NULL,
  `hotel_id` int(8) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  KEY `email` (`email`),
  KEY `hotel_id` (`hotel_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`email`) REFERENCES `Users` (`email`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `Hotels` (`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hotels`
--

DROP TABLE IF EXISTS `Hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hotels` (
  `hotel_name` varchar(40) DEFAULT NULL,
  `hotel_id` int(8) NOT NULL,
  `cost_per_night` int(4) DEFAULT NULL,
  `no_rooms` int(3) DEFAULT NULL,
  `photos` varchar(255) DEFAULT NULL,
  `features` varchar(10) DEFAULT NULL,
  `stars` int(1) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hotels`
--

LOCK TABLES `Hotels` WRITE;
/*!40000 ALTER TABLE `Hotels` DISABLE KEYS */;
INSERT INTO `Hotels` VALUES ('InterContinental',0,550,35,'images/hotel1.jpg','0,1,2,3',4,'bIG hoTEl','Adelaide',-35.000000,148.000000),('Hilton',1,400,29,'images/hotel2.jpg','0,2,3,4,5',3,'SmoL hoTEl','Adelaide',-35.990000,148.990000);
/*!40000 ALTER TABLE `Hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `email` varchar(40) NOT NULL,
  `Fname` varchar(40) DEFAULT NULL,
  `Lname` varchar(40) DEFAULT NULL,
  `GID` varchar(255) DEFAULT NULL,
  `pwd` varchar(40) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('sofia@g','Sofia','McCool',NULL,'cool',408008135,'1998-01-01');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-22 14:02:12
