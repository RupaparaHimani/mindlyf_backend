CREATE DATABASE  IF NOT EXISTS `mindlyf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mindlyf`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: mindlyf.c2zet5os2jth.ap-south-1.rds.amazonaws.com    Database: mindlyf
-- ------------------------------------------------------
-- Server version	8.0.16

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `t_orders`
--

DROP TABLE IF EXISTS `t_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int(11) NOT NULL,
  `orderID` varchar(45) NOT NULL,
  `purpose` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123222232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_orders`
--

LOCK TABLES `t_orders` WRITE;
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
INSERT INTO `t_orders` VALUES (4,2323,'2020-07-15 10:59:21',4200,'pay_FEkMPegUU2MkUG','2'),(123222222,30,'2020-07-15 10:59:21',4200,'www','1'),(123222223,444,'2020-07-16 17:11:14',1000,'pay_FFFERFBoq8LF4V',''),(123222224,0,'2020-07-27 11:00:18',4200,'pay_FJUkwp2QWSEt0Q',''),(123222225,37,'2020-08-10 08:10:51',1000,'pay_FOzNPxvnoyvuko',''),(123222226,41,'2020-09-22 17:04:18',1000,'2122',''),(123222227,41,'2020-09-22 17:05:22',1000,'2122',''),(123222228,41,'2020-09-22 17:06:28',1000,'21123',''),(123222229,59,'2020-09-29 17:19:12',4200,'pay_FivRK1MHEzV8oV',''),(123222230,59,'2020-09-29 18:04:00',4500,'pay_FiwCfAvk8mYFUq',''),(123222231,59,'2020-09-29 18:05:49',3700,'pay_FiwEbChnvsGgv4','');
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `is_email_verified` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(45) DEFAULT NULL,
  `is_mobile_verified` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `address_1` varchar(45) DEFAULT NULL,
  `address_2` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (19,'h','jhg','uyt@jhg.com',87898767,'0','2020-07-05 05:19:46','2020-07-05 05:19:46','khgh','0',NULL,NULL,NULL,NULL,NULL,NULL),(20,'h','jhg','uyt@jhg.com',87898767,'0','2020-07-05 05:21:09','2020-07-05 05:21:09','khgh','0',NULL,NULL,NULL,NULL,NULL,NULL),(21,'h','jhg','uyt@jhg.com',87898767,'0','2020-07-05 05:21:18','2020-07-05 05:21:18','khghs','0',NULL,NULL,NULL,NULL,NULL,NULL),(22,'we','ww','sdf@kjh.com',8790,'0','2020-07-05 05:21:33','2020-07-05 05:21:33','89','0',NULL,NULL,NULL,NULL,NULL,NULL),(23,'sdf','sfsdf','sdf@sdf.om',2147483647,'0','2020-07-05 05:21:52','2020-07-05 05:21:52','fsdf','0',NULL,NULL,NULL,NULL,NULL,NULL),(24,'sdf','sfsdf','sdf@sdf.om',2147483647,'0','2020-07-05 05:22:53','2020-07-05 05:22:53','fsdf','0',NULL,NULL,NULL,NULL,NULL,NULL),(25,'sdf','sfsdf','sdf@sdf.om',2147483647,'0','2020-07-05 05:23:17','2020-07-05 05:23:17','fsdf','0',NULL,NULL,NULL,NULL,NULL,NULL),(26,'sdf','sfsdf','sdf@sdf.om',2147483647,'0','2020-07-05 05:24:11','2020-07-05 05:24:11','fsdf','0',NULL,NULL,NULL,NULL,NULL,NULL),(27,'sdf','sfsdf','sdf@sdf.om',2147483647,'0','2020-07-05 05:24:52','2020-07-05 05:24:52','fsdf','0',NULL,NULL,NULL,NULL,NULL,NULL),(28,'jhg','ghh','hg@gh.com',1121212121,'0','2020-07-05 05:27:58','2020-07-05 05:27:58','asd','0',NULL,NULL,NULL,NULL,NULL,NULL),(29,'arnab','chau','0@sdf.com',232340,'0','2020-07-05 05:28:37','2020-07-05 05:28:37','test','0',NULL,NULL,NULL,NULL,NULL,NULL),(30,'chau','chau','0AA@sdf.com',2147483647,'0','2020-07-05 05:33:41','2020-07-05 05:33:41','d','0',NULL,NULL,NULL,NULL,NULL,NULL),(31,'sdf','sdf','sdf@sdf.com',23234234,'0','2020-07-05 05:36:37','2020-07-05 05:36:37','ddd','0',NULL,NULL,NULL,NULL,NULL,NULL),(32,'k','k','kk@gh.com',87678,'0','2020-07-05 05:37:09','2020-07-05 05:37:09','ttt','0',NULL,NULL,NULL,NULL,NULL,NULL),(33,'hggh','hgjh','gf@jh.com',87878,'0','2020-07-05 05:40:03','2020-07-05 05:40:03','yyy','0',NULL,NULL,NULL,NULL,NULL,NULL),(34,'ljh','kjh','kjh@kjg.com',786876,'0','2020-07-05 05:42:48','2020-07-05 05:42:48','hh','0',NULL,NULL,NULL,NULL,NULL,NULL),(35,'sdf','sdf','sdf@sdf.cm',234234,'0','2020-07-05 05:43:19','2020-07-05 05:43:19','we','0',NULL,NULL,NULL,NULL,NULL,NULL),(36,'asd','asd','qwd@wd.com',2147483647,'0','2020-07-05 05:45:01','2020-07-05 05:45:01','aa','0',NULL,NULL,NULL,NULL,NULL,NULL),(37,'Tushar','Parmar','npurple8@gmail.com',2147483647,'0','2020-07-06 07:36:55','2020-07-06 07:36:55','tush1996','0',NULL,NULL,NULL,NULL,NULL,NULL),(38,'Kaushabh','Mall','kaushabhmall25@gmail.com',2147483647,'0','2020-07-27 11:35:23','2020-07-27 11:35:23','721544014','0',NULL,NULL,NULL,NULL,NULL,NULL),(39,'Tushar','Parmar','tusharparmar96@yahoo.com',2147483647,'0','2020-08-10 10:58:15','2020-08-10 10:58:15','tush1996','0',NULL,NULL,NULL,NULL,NULL,NULL),(40,'test','test','test@test.com',2147483647,'0','2020-08-25 09:23:33','2020-08-25 09:23:33','123456','0',NULL,NULL,NULL,NULL,NULL,NULL),(41,'HRU','HRU','test@narola.email',2147483647,'0','2020-08-25 15:32:57','2020-08-25 15:32:57','password','0',NULL,NULL,NULL,NULL,NULL,NULL),(42,'test','test','befast2018@gmail.com',366132132,'0','2020-09-21 17:49:25','2020-09-21 17:49:25',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(43,NULL,NULL,'priyankatarpara2810@gmail.com',NULL,'0','2020-09-21 17:50:05','2020-09-21 17:50:05',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(44,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-21 18:05:01','2020-09-21 18:05:01',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(45,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-21 18:06:06','2020-09-21 18:06:06',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(46,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-21 18:07:14','2020-09-21 18:07:14',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(47,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-21 18:17:40','2020-09-21 18:17:40',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(48,'test4','test1','test4@test.com',2147483647,'0','2020-09-21 18:28:09','2020-09-21 18:28:09','123','0',NULL,NULL,NULL,NULL,NULL,NULL),(49,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-22 17:34:17','2020-09-22 17:34:17',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(50,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-22 17:35:29','2020-09-22 17:35:29',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(51,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-22 17:38:15','2020-09-22 17:38:15',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(52,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-23 18:01:04','2020-09-23 18:01:04',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(53,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-23 18:01:59','2020-09-23 18:01:59',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(54,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-23 18:04:13','2020-09-23 18:04:13',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(55,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-23 18:06:00','2020-09-23 18:06:00',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(56,'test','test','rupaparahimani@gmail.com',2147483647,'0','2020-09-24 16:42:33','2020-09-24 16:42:33','password','0',NULL,NULL,NULL,NULL,NULL,NULL),(57,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-24 16:47:24','2020-09-24 16:47:24',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL),(58,'tushar','parmar','tushar.mindsight@gmail.com',2147483647,'0','2020-09-28 12:15:36','2020-09-28 12:15:36','tush1996','0',NULL,NULL,NULL,NULL,NULL,NULL),(59,'Eauction','2018','befast2018@gmail.com',NULL,'0','2020-09-28 15:45:15','2020-09-28 15:45:15',NULL,'0',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mindlyf'
--

--
-- Dumping routines for database 'mindlyf'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-30 15:49:43
