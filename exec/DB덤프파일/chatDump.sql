-- MySQL dump 10.19  Distrib 10.3.32-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: CHAT
-- ------------------------------------------------------
-- Server version	10.3.32-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_log`
--

DROP TABLE IF EXISTS `chat_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_log` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `is_over` bit(1) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `chatroom_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `FKfu00vyepktotpkpe9vyosg2ih` (`chatroom_id`),
  CONSTRAINT `FKfu00vyepktotpkpe9vyosg2ih` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_log`
--

LOCK TABLES `chat_log` WRITE;
/*!40000 ALTER TABLE `chat_log` DISABLE KEYS */;
INSERT INTO `chat_log` VALUES (33,'2022-02-17 23:20:04','\0','안녕하세요!','admin',11),(34,'2022-02-17 23:20:23','\0','반갑습니다!','ssafy3',11),(35,'2022-02-17 23:20:27','\0','만나서 반가워요','admin',11),(36,'2022-02-17 23:20:35','\0','바쁘신가요?','admin',11),(37,'2022-02-17 23:20:37','\0','아뇨','ssafy3',11),(38,'2022-02-17 23:20:40','\0','괜찮습니다','ssafy3',11),(39,'2022-02-17 23:20:43','\0','저는 너무 졸립네요','admin',11),(40,'2022-02-17 23:20:47','\0','그럼 자러가볼게요','admin',11),(41,'2022-02-17 23:20:49','\0','안녕','admin',11),(42,'2022-02-17 23:20:51','\0','ㅋㅋㅋㅋㅋ 화이팅 하세요!','ssafy3',11),(43,'2022-02-17 23:24:04','\0','안녕하세요!','ssafy2',12),(44,'2022-02-17 23:24:15','\0','안녕하세요!','admin',12),(45,'2022-02-17 23:25:07','\0','화로대 구매하실건가요?','admin',12),(46,'2022-02-17 23:25:53','\0','얼마에 주실건가요?','ssafy2',12),(47,'2022-02-17 23:26:04','\0','5만원 생각하고 있습니다.','admin',12),(48,'2022-02-17 23:26:13','\0','5만원 너무 비싼데;;','ssafy2',12),(49,'2022-02-17 23:26:39','','공감2 댓글댓글달기 국어사전이나 백과사전에서 화로대를 찾아보면 나오는 게 없다. 그나마 있는 게 \'화로\'인데 화로란 숯불을 담아 놓은 그릇으로 주로 불씨를 보존하거나 난방을 위해 쓴다고 정의하고 있다. 화로대와 화로는 쓰임이 크게 다를 것 같지 않지만 엄연히 구분이 가능한데도 화로대는 아직 사전에 등재조차 되어 있지 않다.  캠핑을 다니다보면 너무도 자주 ','admin',12),(50,'2022-02-17 23:26:58','\0','이렇게 좋은거랍니다','admin',12),(51,'2022-02-17 23:27:02','\0','모르겠어요;; 무섭네요','ssafy2',12),(52,'2022-02-17 23:27:56','\0','혹시 캠핑 좋아하세요?','ssafy3',11),(53,'2022-02-17 23:28:36','\0','캠핑 좋죠~','admin',11),(54,'2022-02-17 23:28:45','\0','그렇다면 캠나바다를 추천해요!','ssafy3',11),(55,'2022-02-17 23:43:08','\0','저기요','nayoung',13),(56,'2022-02-17 23:43:11','\0','안녕하세요','nayoung',13),(57,'2022-02-17 23:43:13','\0','반갑습니다 ㅎㅎ','nayoung',13);
/*!40000 ALTER TABLE `chat_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room` (
  `chatroom_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user1` varchar(255) DEFAULT NULL,
  `user2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chatroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (11,'admin','ssafy3'),(12,'admin','ssafy2'),(13,'nayoung','ssafy4');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `over_message`
--

DROP TABLE IF EXISTS `over_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `over_message` (
  `overMessageId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `over_message` varchar(5000) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `message_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`overMessageId`),
  KEY `FKgvykmxp0i0djehv2yu4gu9hxh` (`message_id`),
  CONSTRAINT `FKgvykmxp0i0djehv2yu4gu9hxh` FOREIGN KEY (`message_id`) REFERENCES `chat_log` (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `over_message`
--

LOCK TABLES `over_message` WRITE;
/*!40000 ALTER TABLE `over_message` DISABLE KEYS */;
INSERT INTO `over_message` VALUES (1,'듣는 말이 화로대라 이는 뜻밖이다. 사전이 보수적으로 편찬되기 때문이기도 하겠지만 화로대가 의외의 신조어이자 생활 속으로 파고든 지 얼마 되지 않은 물건임을 새삼 알게 된다. 캠핑이 붐이라지만 아직은 캠핑을 바라보는 많은 이들의 생소함을 대변하고 있는 것이리라. 생각해보면 LTE, 디지털, IT, SNS 등이 난무하는 이 시대에 화로대란 물건은 어색해 보이기도 하다.  화로대는 화로와 달리 실외에서 사용하는 경우가 대부분이며 특히 캠핑장에서 주로 쓰인다. 용도는 요리와 불놀이 두 가지로 압축된다. 또한, 접이식이 대부분이고 본체인 화로대, 그 화로대를 올려 놓는 화로대 받침, 그릴(석쇠), 그릴을 올려 높낮이를 조절하는 석쇠 걸이(그릴 스탠드, 그릴 브릿지), 화로대 안에서 숯이나 재를 받아주는 숯받이, 그리고 수납가방 이렇게 6종 세트로 구성되는 게 보통이다.',NULL,49);
/*!40000 ALTER TABLE `over_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-17 19:16:27
