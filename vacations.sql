CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vacation_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (1,'1','2'),(2,'1','3'),(3,'2','3'),(4,'5','3'),(5,'1','4'),(6,'2','4'),(7,'5','4'),(21,'2','5'),(22,'4','5'),(23,'1','5');
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ADMIN','Avi','Edri','be926142d7af9d2b9e786f5be35194a9','ADMIN'),(2,'avi','Avi','Edri','be926142d7af9d2b9e786f5be35194a9','USER'),(3,'test','test','test','be926142d7af9d2b9e786f5be35194a9','USER'),(4,'nato','nato','nato','be926142d7af9d2b9e786f5be35194a9','USER'),(5,'yair','yair','rachum','be926142d7af9d2b9e786f5be35194a9','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `vacation_destination` varchar(45) NOT NULL,
  `vacation_description` varchar(1000) NOT NULL,
  `vacation_start_date` varchar(45) NOT NULL,
  `vacation_end_date` varchar(45) NOT NULL,
  `vacation_price` varchar(45) NOT NULL,
  `vacation_image` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`vacation_id`),
  UNIQUE KEY `vacation_id_UNIQUE` (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Paris','Paris nicknamed the \"City of light\" is the capital city of France, and the largest city in France. ... Paris is also the center of French economy, politics, traffic and culture. ','2021-08-30T21:00:00.000Z','2021-09-03T21:00:00.000Z','1500','https://www.celebritycruises.com/content/dam/celebrity/new-images/itinerary-images/europe/paris-eifel-tower-3840x2160.jpg'),(2,'London','London is the capital city of the United Kingdom. It is the U.K.\'s largest metropolis and its economic, transportation, and cultural centre.','2021-08-28T21:00:00.000Z','2021-09-02T21:00:00.000Z','2500','https://www.hiboox.com/wp-content/uploads/2019/12/london.jpg'),(3,'Barcelona','Barcelona is the capital city of Catalonia, which is a region of Spain. Barcelona is the largest city on the Mediterranean coast.','2021-08-22T21:00:00.000Z','2021-08-26T21:00:00.000Z','1500','https://cdn.europe4kidstours.com/wp-content/uploads/2018/03/Absolute_Barcelona-2.jpg'),(4,'New York','Located where the Hudson and East rivers empty into one of the world\'s premier harbours, New York is both the gateway to the North American continent and its preferred exit to the oceans of the globe.','2021-08-05T12:16:52.004Z','2021-08-05T12:16:52.004Z','3100','https://healthsouls.com/wp-content/uploads/2015/02/new_york_1.jpg'),(5,'Rome','Rome is located on the western coast of central Italy along the Tevere River. ','2021-08-30T21:00:00.000Z','2021-09-02T21:00:00.000Z','2000','https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-25 11:03:45
