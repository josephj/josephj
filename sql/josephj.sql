-- MySQL dump 10.11
--
-- Host: localhost    Database: josephjiang
-- ------------------------------------------------------
-- Server version	5.0.51a-24+lenny5

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
-- Table structure for table `blog_article`
--

DROP TABLE IF EXISTS `blog_article`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_article` (
  `blog_article_id` int(11) unsigned NOT NULL auto_increment,
  `blog_category_id` int(11) unsigned default NULL,
  `blog_category_title` varchar(100) default NULL,
  `blog_comment_total` smallint(5) unsigned NOT NULL default '0',
  `content` text NOT NULL,
  `is_show` char(1) NOT NULL default 'y',
  `last_update` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `selected_date` datetime NOT NULL,
  `title` varchar(100) default NULL,
  `is_nl2br` char(1) default 'y',
  `background` varchar(100) default NULL,
  `summary` varchar(255) default NULL,
  `keyword` varchar(255) default NULL,
  PRIMARY KEY  (`blog_article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `blog_article_backup`
--

DROP TABLE IF EXISTS `blog_article_backup`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_article_backup` (
  `blog_article_id` int(11) NOT NULL auto_increment,
  `blog_category_id` int(11) NOT NULL default '0',
  `title` varchar(100) default NULL,
  `content` text,
  `time` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`blog_article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `blog_category`
--

DROP TABLE IF EXISTS `blog_category`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_category` (
  `blog_category_id` int(11) unsigned NOT NULL auto_increment,
  `added_date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `blog_article_total` int(11) unsigned NOT NULL default '0',
  `content` text,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY  (`blog_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `blog_comment`
--

DROP TABLE IF EXISTS `blog_comment`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_comment` (
  `blog_comment_id` int(11) unsigned NOT NULL auto_increment,
  `blog_article_id` int(11) unsigned NOT NULL,
  `blog_article_title` varchar(100) NOT NULL,
  `added_date` datetime NOT NULL,
  `content` text NOT NULL,
  `email` varchar(100) default NULL,
  `is_show` char(1) NOT NULL default 'y',
  `nickname` varchar(50) NOT NULL,
  `response_id` int(11) default NULL,
  PRIMARY KEY  (`blog_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1774 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `blog_token`
--

DROP TABLE IF EXISTS `blog_token`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `blog_token` (
  `blog_token_id` int(11) unsigned NOT NULL auto_increment,
  `blog_article_id` int(11) unsigned NOT NULL,
  `added_date` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `content` varchar(255) default NULL,
  `current_access` int(11) unsigned NOT NULL default '0',
  `expire_date` datetime default NULL,
  `hash` varchar(100) NOT NULL,
  `latest_ip` varchar(15) default NULL,
  `latest_time` datetime default NULL,
  `max_access` int(11) unsigned default NULL,
  PRIMARY KEY  (`blog_token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `user` (
  `user_id` int(11) unsigned NOT NULL auto_increment,
  `user` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `added_date` datetime NOT NULL,
  `email` varchar(100) default NULL,
  `nickname` varchar(50) NOT NULL,
  PRIMARY KEY  (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
SET character_set_client = @saved_cs_client;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-02-26 13:47:22
