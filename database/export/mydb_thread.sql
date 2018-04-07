CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text,
  `published` date NOT NULL,
  `picture` varchar(100) DEFAULT 'imgs/default.jpg',
  `user_id` int(11) NOT NULL,
  `sub_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_user1_idx` (`user_id`),
  KEY `fk_post_sub1_idx` (`sub_id`),
  CONSTRAINT `fk_post_sub1` FOREIGN KEY (`sub_id`) REFERENCES `sub` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (18,'New research finds that recovering gold, copper and other metals from e-waste is cheaper than obtaining these metals from mines.','Electronic waste — including discarded televisions, computers and mobile phones — is one of the fastest-growing waste categories worldwide. For years, recyclers have gleaned usable parts, including metals, from this waste stream. That makes sense from a sustainability perspective, but it’s been unclear whether it’s reasonable from an economic viewpoint. Now researchers report in ACS’ journal Environmental Science & Technology that recovering gold, copper and other metals from e-waste is cheaper than obtaining these metals from mines.','2018-04-04','imgs/default.jpg',9,3),(19,'Carbon taxes could make significant dent in climate change, study finds','Putting a price on carbon, in the form of a fee or tax on the use of fossil fuels, coupled with returning the generated revenue to the public in one form or another, can be an effective way to curb emissions of greenhouse gases. That’s one of the conclusions of an extensive analysis of several versions of such proposals, carried out by researchers at MIT and the National Renewable Energy Laboratory (NREL).\n\nWhat’s more, depending on the exact mechanism chosen, such a tax can also be fair and not hurt low-income households, the researchers report.\n\nThe analysis was part of a multigroup effort to apply sophisticated modeling tools to assess the impacts of various proposed carbon-pricing schemes. Eleven research teams at different institutions carried out the research using a common set of starting assumptions and policies. While significant details differed, all the studies agreed that carbon taxes can be effective and, if properly designed, need not be regressive.','2018-04-06','imgs/default.jpg',9,3),(20,'Today I donated my watch, phone, and $500 to a poor guy.','You can’t imagine the happiness I felt as I saw him put his pistol back in his pocket.','2018-04-02','imgs/default.jpg',9,4),(21,'If you sin 90 times you\'ll only be caught 45 times','Because Sin 90 = Cot 45','2018-04-05','imgs/default.jpg',9,4),(22,'An MIT linguistics professor was lecturing his class the other day.','\"In English,\" he said, \"a double negative forms a positive. However, in some languages, such as Russian, a double negative remains a negative. But there isn\'t a single language, not one, in which a double positive can express a negative.\"\n\nA voice from the back of the room said, \"Yeah, right.\"','2018-04-01','imgs/default.jpg',1,4),(23,'A boy asked his Bitcoin-investing dad...','...for $10.00 worth of Bitcoin currency.\n\nDad: $9.67? What do you need $10.32 for?','2018-03-07','imgs/default.jpg',1,4);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-07 20:38:31
