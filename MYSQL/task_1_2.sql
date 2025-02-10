-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: task_1
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bonus`
--

DROP TABLE IF EXISTS `bonus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bonus` (
  `WORKER_REF_ID` int DEFAULT NULL,
  `BONUS_DATE` datetime NOT NULL,
  `BONUS_AMOUNT` decimal(10,2) NOT NULL,
  KEY `WORKER_REF_ID` (`WORKER_REF_ID`),
  CONSTRAINT `bonus_ibfk_1` FOREIGN KEY (`WORKER_REF_ID`) REFERENCES `worker` (`WORKER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bonus`
--

LOCK TABLES `bonus` WRITE;
/*!40000 ALTER TABLE `bonus` DISABLE KEYS */;
INSERT INTO `bonus` VALUES (1,'2016-02-20 00:00:00',5000.00),(2,'2016-06-11 00:00:00',3000.00),(3,'2016-02-20 00:00:00',4000.00),(1,'2016-02-20 00:00:00',4500.00),(2,'2016-06-11 00:00:00',3500.00);
/*!40000 ALTER TABLE `bonus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `dept_no` int NOT NULL,
  `dept_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`dept_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (10,'Finance'),(20,'IT'),(30,'Sales'),(40,'HR'),(50,'Marketing'),(60,'R&D'),(70,'Operations'),(80,'Legal'),(90,'Support'),(100,'Administration');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `emp_id` int NOT NULL,
  `emp_name` varchar(100) DEFAULT NULL,
  `job_title` varchar(50) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `commission` decimal(10,2) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `dept_no` int DEFAULT NULL,
  `street_address` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'John Doe','Manager',12000.00,1000.00,'2003-01-20',30,'123 Elm St','New York','Manager','First Bank Corporation'),(2,'Jane Smith','Clerk',9000.00,100000.00,'2022-10-14',20,'456 Oak St','Los Angeles','Clerk','Tech Corp'),(3,'Mike Johnson','Salesman',1500.00,NULL,'2003-01-22',30,'789 Pine St','Chicago','Salesman','First Bank Corporation'),(4,'Emily Davis','Analyst',1300.00,200.00,'2022-12-01',10,'321 Maple St','Houston','Analyst','Tech Corp'),(5,'Robert Brown','President',20000.00,NULL,'2025-01-21',10,'654 Spruce St','Phoenix','President','First Bank Corporation'),(6,'Nancy Wilson','Manager',18000.00,2000.00,'2021-03-10',20,'987 Willow St','Miami','Manager','Finance World'),(7,'Kevin Martin','Analyst',8000.00,NULL,'2022-09-23',20,'876 Cedar St','San Francisco','Analyst','Prime Inc.'),(8,'Sara Lee','Clerk',7000.00,300.00,'2022-05-17',10,'654 Palm St','Philadelphia','Clerk','Tech Corp'),(9,'David Wong','Engineer',6000.00,800.00,'2023-01-30',60,'321 Fir St','Seattle','Engineer','AutoTech'),(10,'Aamy Green','Director',15000.00,NULL,'2021-08-14',30,'789 Oak St','Atlanta','Director','First Bank Corporation'),(11,'Jack White','Salesman',2500.00,100.00,'2023-09-13',30,'123 Maple St','Denver','Salesman','First Bank Corporation'),(12,'Linda Scott','HR',5500.00,NULL,'2022-02-22',40,'456 Birch St','San Jose','HR','Tech Corp'),(13,'Chris Kim','Consultant',6500.00,500.00,'2021-12-07',70,'567 Spruce St','Dallas','Consultant','Prime Inc.'),(14,'Patricia Brown','Analyst',14000.00,NULL,'2021-06-30',10,'432 Cypress St','Austin','Analyst','Tech Corp'),(15,'Stephen Young','Actor',9000.00,0.00,'2024-03-20',30,'123 Elmwood Ave','New York','Actor','Prime Inc.'),(16,'Barbara Clark','Manager',18000.00,2000.00,'2021-03-10',20,'987 Willow St','Miami','Manager','Finance World'),(17,'Justin Foster','Admin',6000.00,NULL,'2022-08-01',100,'421 Cedar St','Indianapolis','Administrator','Govt. Org'),(18,'Nancy Sanders','Teacher',10000.00,600.00,'2023-05-12',20,'125 Willow St','Newark','Teacher','Public School'),(19,'Alice Peterson','Accountant',11000.00,0.00,'2022-10-20',50,'215 Birch Ave','Salt Lake City','Accountant','Agri Tech'),(20,'Mark Bell','Consultant',13000.00,NULL,'2022-07-14',70,'341 Pine St','San Francisco','Consultant','Agri Tech'),(21,'Rachel Ramirez','Analyst',12500.00,NULL,'2021-10-13',20,'654 Oak Lane','Savannah','Analyst','AutoTech'),(22,'Jeff Allen','Technician',10500.00,900.00,'2025-01-20',80,'876 Cedar Rd','Tulsa','Technician','Innovation Group'),(23,'Anna Gonzales','Coordinator',9500.00,700.00,'2024-08-25',50,'111 Maple Court','Tampa','Coordinator','Finance World'),(24,'Nina Hernandez','Designer',7000.00,0.00,'2023-06-05',10,'231 Ash Blvd','Orlando','Designer','Media Corp'),(25,'Carlos Scott','Teacher',7300.00,NULL,'2024-02-28',20,'654 Birch Ave','Austin','Teacher','University Inc.'),(26,'Chloe King','Artist',11500.00,300.00,'2023-11-19',40,'321 Elm St','Nashville','Artist','Entertainment Ltd.'),(27,'Hannah Ross','Scientist',14000.00,NULL,'2022-01-21',60,'654 Birch Lane','Fresno','Scientist','BioTech'),(28,'James Collins','Architect',12000.00,1000.00,'2023-06-23',90,'321 Pine Rd','Raleigh','Architect','Design Tech'),(29,'Anthony Price','Technician',17000.00,1200.00,'2023-03-15',80,'123 Fir Blvd','St. Louis','Technician','AutoTech'),(30,'Eugene Murphy','Photographer',9000.00,400.00,'2024-09-04',10,'543 Chestnut St','Indianapolis','Photographer','Media Corp'),(31,'Rebecca Henderson','Director',14500.00,0.00,'2022-02-13',30,'654 Elm Ave','Detroit','Director','Entertainment Ltd.'),(32,'Olivia Wood','Technologist',9900.00,300.00,'2021-11-10',20,'987 Cedar Rd','Cincinnati','Technologist','Innovation Group'),(33,'Roger Wright','Manager',20000.00,NULL,'2024-10-07',70,'789 Pine St','Omaha','Manager','Prime Inc.'),(34,'Jackie Lewis','Professor',20000.00,NULL,'2022-04-28',20,'654 Maple St','Columbus','Professor','University Inc.'),(35,'Emma Cartarerr','Engineer',5000.00,0.00,'2023-06-25',20,'987 Willow Street','Indianapolis','Engineer','AutoTech'),(36,'Keith Garcia','CEO',25000.00,2000.00,'2022-01-05',10,'789 Oak Avenue','Minneapolis','CEO','Finance World'),(37,'Alex Reed','Designer',14000.00,NULL,'2024-05-17',10,'345 Cedar Blvd','Denver','Designer','Media Corp'),(38,'Johnny Evans','Consultant',8000.00,NULL,'2022-07-05',70,'654 Birch Road','Columbus','Consultant','Prime Inc.');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `title` (
  `WORKER_REF_ID` int DEFAULT NULL,
  `WORKER_TITLE` varchar(50) NOT NULL,
  `AFFECTED_FROM` datetime NOT NULL,
  KEY `WORKER_REF_ID` (`WORKER_REF_ID`),
  CONSTRAINT `title_ibfk_1` FOREIGN KEY (`WORKER_REF_ID`) REFERENCES `worker` (`WORKER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
INSERT INTO `title` VALUES (1,'Manager','2016-02-20 00:00:00'),(2,'Executive','2016-06-11 00:00:00'),(8,'Executive','2016-06-11 00:00:00'),(5,'Manager','2016-06-11 00:00:00'),(4,'Asst. Manager','2016-06-11 00:00:00'),(7,'Executive','2016-06-11 00:00:00'),(6,'Lead','2016-06-11 00:00:00'),(3,'Lead','2016-06-11 00:00:00');
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `WORKER_ID` int NOT NULL,
  `FIRST_NAME` varchar(50) NOT NULL,
  `LAST_NAME` varchar(50) NOT NULL,
  `SALARY` decimal(10,2) NOT NULL,
  `JOINING_DATE` datetime NOT NULL,
  `DEPARTMENT` varchar(50) NOT NULL,
  PRIMARY KEY (`WORKER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (1,'Monika','Patel',100000.00,'2014-02-20 09:00:00','HR'),(2,'Niharika','Verma',80000.00,'2014-06-11 09:00:00','Admin'),(3,'Vishal','Singhal',300000.00,'2014-02-20 09:00:00','HR'),(4,'Amitabh','Singh',500000.00,'2014-02-20 09:00:00','Admin'),(5,'Vivek','Bhatti',500000.00,'2014-06-11 09:00:00','Admin'),(6,'Vipul','Diwan',200000.00,'2014-06-11 09:00:00','Account'),(7,'Satish','Kumar',75000.00,'2014-01-20 09:00:00','Account'),(8,'Geetika','Chauhan',90000.00,'2014-04-11 09:00:00','Admin');
/*!40000 ALTER TABLE `worker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-23 12:32:28
