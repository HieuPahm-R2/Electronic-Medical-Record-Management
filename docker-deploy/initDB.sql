-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: HustEt3260
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `appointment_clinical_service`
--

DROP TABLE IF EXISTS `appointment_clinical_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_clinical_service` (
  `appointment_id` bigint NOT NULL,
  `clinical_service_id` bigint NOT NULL,
  PRIMARY KEY (`appointment_id`,`clinical_service_id`),
  KEY `FK458vt6xg6x92onqpo3h1xd1pi` (`clinical_service_id`),
  CONSTRAINT `FK458vt6xg6x92onqpo3h1xd1pi` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`),
  CONSTRAINT `FK7f895velwyp8itvpgjtedwmhf` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_clinical_service`
--

LOCK TABLES `appointment_clinical_service` WRITE;
/*!40000 ALTER TABLE `appointment_clinical_service` DISABLE KEYS */;
INSERT INTO `appointment_clinical_service` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `appointment_clinical_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `appointment_start_time` datetime(6) NOT NULL,
  `contact` tinytext NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `notes` tinytext,
  `status` enum('CANCELED','COMPLETED','PENDING','SCHEDULED') NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2025-11-17 07:21:32.463524',NULL,'2025-11-17 08:04:27.073904',NULL,'2025-12-10 00:00:00.000000','phamvanthang786@gmail.com','hieu pahm','ve nha an tet','SCHEDULED',''),(2,'2025-12-03 01:20:12.776196',NULL,'2025-12-03 01:32:56.906820',NULL,'2025-12-25 17:00:00.000000','phamvanthang786@gmail.com','Phạm Trung Hiếu','NONONO','SCHEDULED','0978971623');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_test`
--

DROP TABLE IF EXISTS `blood_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_test` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blood_group` varchar(255) DEFAULT NULL,
  `blood_type` varchar(255) DEFAULT NULL,
  `conclusion` varchar(255) DEFAULT NULL,
  `glucose` decimal(38,2) DEFAULT NULL,
  `hb` decimal(38,2) DEFAULT NULL,
  `hct` decimal(38,2) DEFAULT NULL,
  `image_url` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `mch` decimal(38,2) DEFAULT NULL,
  `mcv` decimal(38,2) DEFAULT NULL,
  `neut` decimal(38,2) DEFAULT NULL,
  `rbc` decimal(38,2) DEFAULT NULL,
  `urea` decimal(38,2) DEFAULT NULL,
  `wbc` decimal(38,2) DEFAULT NULL,
  `clinical_service_id` bigint DEFAULT NULL,
  `medical_examination_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medical_examination_id` (`medical_examination_id`),
  KEY `FKpuj46kadfbhmeb092ct4rht7x` (`clinical_service_id`),
  CONSTRAINT `FKau4fxgon0b7sm3xauy5t6hwx7` FOREIGN KEY (`medical_examination_id`) REFERENCES `medical_examinations` (`id`),
  CONSTRAINT `FKpuj46kadfbhmeb092ct4rht7x` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_test`
--

LOCK TABLES `blood_test` WRITE;
/*!40000 ALTER TABLE `blood_test` DISABLE KEYS */;
INSERT INTO `blood_test` VALUES (4,'B','RH-','sdasdasd',4.00,8.00,9.00,'1764330140101-dockier.png',1.00,1.00,3.00,NULL,3.00,1.00,1,5),(5,'A','RH+','sádfsdfsdf',232.00,22.00,22.00,'1764330103303-hust_logo.png',22.00,22.00,22.00,NULL,2323.00,22.00,1,6),(9,'AB','RH-','dasdad',12.00,1.00,1.00,'1764557985725-5tobunS1.jpg',1.00,1.00,1.00,NULL,12.00,1.00,1,10),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,17),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,18),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,19),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,20);
/*!40000 ALTER TABLE `blood_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinical_info`
--

DROP TABLE IF EXISTS `clinical_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinical_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `circulatory_diagnosis` text,
  `respiratory_diagnosis` text,
  `genitourinary_diagnosis` text,
  `bone_diagnosis` text,
  `digestive_diagnosis` text,
  `nervous_diagnosis` text,
  `ent_diagnosis` text,
  `other_diagnoses` text,
  `syndrome` text,
  `medical_examination_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_clinical_info_visit` (`medical_examination_id`),
  CONSTRAINT `fk_clinical_info_visit` FOREIGN KEY (`medical_examination_id`) REFERENCES `medical_examinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinical_info`
--

LOCK TABLES `clinical_info` WRITE;
/*!40000 ALTER TABLE `clinical_info` DISABLE KEYS */;
INSERT INTO `clinical_info` VALUES (6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6),(11,'Vì thực tế FE chỉ gửi ID BE chỉ nên nhận ID.',NULL,'Vì thực tế FE chỉ gửi ID  BE chỉ nên nhận ID.','Vì thực tế FE chỉ gửi ID  BE chỉ nên nhận ID.','Vì thực tế FE chỉ gửi ID  BE chỉ nên nhận ID.','hihihi','Vì thực tế FE chỉ gửi ID  BE chỉ nên nhận ID.',NULL,'ádasdasds',10),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,17),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,18),(14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,19),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,20);
/*!40000 ALTER TABLE `clinical_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinical_match`
--

DROP TABLE IF EXISTS `clinical_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinical_match` (
  `clinical_info_id` bigint NOT NULL,
  `clinical_service_id` bigint NOT NULL,
  PRIMARY KEY (`clinical_info_id`,`clinical_service_id`),
  KEY `FK59yw4l1smp2oxevoyphlmbf7d` (`clinical_service_id`),
  CONSTRAINT `FK59yw4l1smp2oxevoyphlmbf7d` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`),
  CONSTRAINT `FKkmrwspxqd9rn6abrepcu5moqs` FOREIGN KEY (`clinical_info_id`) REFERENCES `clinical_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinical_match`
--

LOCK TABLES `clinical_match` WRITE;
/*!40000 ALTER TABLE `clinical_match` DISABLE KEYS */;
INSERT INTO `clinical_match` VALUES (11,2),(11,4);
/*!40000 ALTER TABLE `clinical_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinical_service`
--

DROP TABLE IF EXISTS `clinical_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinical_service` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `service_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinical_service`
--

LOCK TABLES `clinical_service` WRITE;
/*!40000 ALTER TABLE `clinical_service` DISABLE KEYS */;
INSERT INTO `clinical_service` VALUES (1,'Xét nghiệm công thức máu'),(2,'Xét nghiệm sinh hóa máu'),(3,'Xét nghiệm nước tiểu'),(4,'Chụp X-quang ngực thẳng'),(5,'Chụp cắt lớp vi tính (CT Scan) sọ não'),(6,'Chụp cộng hưởng từ (MRI) khớp gối'),(7,'Siêu âm ổ bụng tổng quát'),(8,'Siêu âm tim'),(9,'Nội soi dạ dày - tá tràng'),(10,'Điện tâm đồ (ECG)'),(11,'Siêu âm tuyến giáp'),(12,'Siêu âm Doppler mạch máu'),(13,'Nội soi tai mũi họng'),(14,'Nội soi đại tràng'),(15,'Xét nghiệm chức năng gan (AST, ALT, GGT)'),(16,'Xét nghiệm chức năng thận (Ure, Creatinin)'),(17,'Xét nghiệm mỡ máu (Cholesterol, Triglyceride)'),(18,'Đo loãng xương (DEXA Scan)'),(19,'Điện não đồ (EEG)'),(20,'Đo chức năng hô hấp (Spirometry)'),(21,'Xét nghiệm đông máu (PT, PTT)');
/*!40000 ALTER TABLE `clinical_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` tinytext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_department_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Khoa Khám bệnh','Tiếp nhận và khám sàng lọc ban đầu','2025-10-28 14:46:25','2025-10-28 14:46:25',NULL,NULL),(2,'Khoa Tim mạch','Chuyên điều trị các bệnh về tim mạch','2025-10-28 14:46:25','2025-10-28 14:46:25',NULL,NULL),(3,'Khoa Nội tổng hợp','Chuyên điều trị các bệnh nội khoa','2025-10-28 14:46:25','2025-10-28 14:46:25',NULL,NULL),(4,'Khoa Xét nghiệm','Thực hiện các xét nghiệm máu, sinh hóa...','2025-10-28 14:46:25','2025-10-28 14:46:25',NULL,NULL),(5,'Khoa Chẩn đoán hình ảnh','Thực hiện X-quang, MRI, CT...','2025-10-28 14:46:25','2025-10-28 14:46:25',NULL,NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnose_final`
--

DROP TABLE IF EXISTS `diagnose_final`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnose_final` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `main_disease` varchar(100) DEFAULT NULL,
  `comorbidity` varchar(100) DEFAULT NULL,
  `conclusion` mediumtext,
  `prognosis` text,
  `treatment_plan` mediumtext,
  `medical_examination_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_diagnose_final_visit` (`medical_examination_id`),
  CONSTRAINT `fk_diagnose_final_visit` FOREIGN KEY (`medical_examination_id`) REFERENCES `medical_examinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnose_final`
--

LOCK TABLES `diagnose_final` WRITE;
/*!40000 ALTER TABLE `diagnose_final` DISABLE KEYS */;
INSERT INTO `diagnose_final` VALUES (3,NULL,NULL,NULL,NULL,NULL,5),(4,NULL,NULL,NULL,NULL,NULL,6),(8,NULL,NULL,NULL,NULL,NULL,10),(9,NULL,NULL,NULL,NULL,NULL,17),(10,NULL,NULL,NULL,NULL,NULL,18),(11,NULL,NULL,NULL,NULL,NULL,19),(12,NULL,NULL,NULL,NULL,NULL,20);
/*!40000 ALTER TABLE `diagnose_final` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'0','<< Flyway Baseline >>','BASELINE','<< Flyway Baseline >>',NULL,'root','2025-11-03 06:30:27',0,1),(2,'1','alter relationship','SQL','V1__alter_relationship.sql',634291565,'root','2025-11-25 11:44:55',163,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_examinations`
--

DROP TABLE IF EXISTS `medical_examinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_examinations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `arrival_time` datetime(6) DEFAULT NULL,
  `reception_time` datetime(6) DEFAULT NULL,
  `referral_source` varchar(255) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `symptoms` text,
  `reason` text,
  `days_of_symptoms` int DEFAULT NULL,
  `personal_medical_history` text,
  `family_medical_history` text,
  `has_allergy` tinyint(1) DEFAULT '0',
  `allergy_months` int DEFAULT NULL,
  `uses_drugs` tinyint(1) DEFAULT '0',
  `drugs_months` int DEFAULT NULL,
  `uses_alcohol` tinyint(1) DEFAULT '0',
  `alcohol_months` int DEFAULT NULL,
  `uses_tobacco` tinyint(1) DEFAULT '0',
  `tobacco_months` int DEFAULT NULL,
  `has_other` tinyint(1) DEFAULT '0',
  `other_months` int DEFAULT NULL,
  `other_description` tinytext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `fk_medical_examinations_department` (`department_id`),
  CONSTRAINT `fk_medical_examinations_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `medical_examinations_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_examinations`
--

LOCK TABLES `medical_examinations` WRITE;
/*!40000 ALTER TABLE `medical_examinations` DISABLE KEYS */;
INSERT INTO `medical_examinations` VALUES (5,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,NULL,'2025-11-28 09:01:14','2025-11-28 09:01:14'),(6,11,'2025-11-21 05:00:00.000000','2025-11-28 06:00:00.000000','dfdfdf',1,'fđfdf',NULL,11,'fgfgfgffg','fgfgfgf',0,12,0,NULL,1,12,1,12,0,NULL,NULL,'2025-11-28 09:17:54','2025-11-28 10:16:52'),(10,11,'2025-10-30 09:00:00.000000','2025-10-30 09:15:00.000000','Bệnh viện tuyến dưới',1,'Đau ngực, ho khan update','Nghi ngờ viêm phổi',55,'Tiền sử hen suyễn lúc nhỏ.','Bố bị bệnh tim mạch.',0,120,0,NULL,1,60,1,120,0,NULL,NULL,'2025-11-29 08:28:34','2025-12-01 03:07:02'),(17,11,'2025-11-29 17:12:34.024704','2025-11-29 17:12:34.025240',NULL,2,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,0,60,0,NULL,0,NULL,NULL,'2025-11-29 10:12:34','2025-11-29 10:12:34'),(18,11,'2025-12-01 09:41:43.841834','2025-12-01 09:41:43.841834',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,NULL,'2025-12-01 02:41:43','2025-12-01 02:41:43'),(19,12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,NULL,'2025-12-02 03:10:08','2025-12-02 03:10:08'),(20,13,'2025-12-02 10:37:56.137780','2025-12-02 10:37:56.137780',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,NULL,'2025-12-02 03:37:56','2025-12-02 03:37:56');
/*!40000 ALTER TABLE `medical_examinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `patient_code` varchar(30) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(100) DEFAULT '',
  `phone` varchar(15) NOT NULL,
  `nationality` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `identity_card` varchar(50) NOT NULL,
  `insurance_number` varchar(50) NOT NULL,
  `insurance_expired` date DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `career` varchar(50) NOT NULL,
  `relative_name` varchar(50) NOT NULL,
  `relative_phone` varchar(35) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `full_name` varchar(50) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `ethnicity` varchar(35) NOT NULL,
  `religion` varchar(35) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_patient_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (10,'2025CAB5CB','2002-09-12','hihihi@gmail.com','0978971623','viet nam','xa dong quy, tien hai, thai binh','0458353459922','895078325008','2029-09-28','MALE','fuho','Da zi oi','0944347799','2025-11-28 09:01:15','2025-11-28 09:10:36',NULL,NULL,'Phạm Trung Hiếu',NULL,'Kinh','None'),(11,'20258CB9B2','2005-05-21','phuvehust@gmail.com','012344567891','japan','huyen vu thu, thai binh','034823844900','05832483249','2029-11-10','MALE','developer','quy loi','0357922955','2025-11-28 09:17:54','2025-12-02 03:57:15',NULL,NULL,'Vu Van Phu',NULL,'kinh','none'),(12,'2025D49F4A','2003-12-02','loi@gmail.com','6465464565464','Viet nam','Bac Giang','0458349534','05782984322','2029-12-10','MALE','Sinh vien','ABHBSb','02847832423','2025-12-02 03:10:09','2025-12-02 03:34:03',NULL,NULL,'Pham QUy loui update',NULL,'Kinh','No'),(13,'2025406DD2','2029-12-02','hoang@gmail.com','5245435','viet nam','nghe an','067567567','546456546','2025-12-31','MALE','kjkj','jkjkjhk','64564565','2025-12-02 03:37:56','2025-12-02 03:37:56',NULL,NULL,'Nguyen van nhoang',NULL,'gjjgj','jghjghj');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `api_path` varchar(255) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'/api/v1/add-patient',' ','2025-11-22 09:32:42.942531','POST','PATIENTS','Create a patient ',NULL,NULL),(2,'/api/v1/update-patient',' ','2025-11-22 09:32:42.971378','PUT','PATIENTS','Update a patient',NULL,NULL),(3,'/api/v1/delete-patient/{id}',' ','2025-11-22 09:32:42.979217','DELETE','PATIENTS','Delete a patient ',NULL,NULL),(4,'/api/v1/patient/{id}',' ','2025-11-22 09:32:42.982006','GET','PATIENTS','Get patient by id',NULL,NULL),(5,'/api/v1/patients',' ','2025-11-22 09:32:42.984774','GET','PATIENTS','Get patients with pagination',NULL,NULL),(6,'/api/v1/add-permission',' ','2025-11-22 09:32:42.987083','POST','PERMISSIONS','Create a permission',NULL,NULL),(7,'/api/v1/update-permission',' ','2025-11-22 09:32:42.989437','PUT','PERMISSIONS','Update a permission',NULL,NULL),(8,'/api/v1/delete-permission/{id}',' ','2025-11-22 09:32:42.991655','DELETE','PERMISSIONS','Delete a permission',NULL,NULL),(9,'/api/v1/permission/{id}',' ','2025-11-22 09:32:42.993405','GET','PERMISSIONS','Get a permission by id',NULL,NULL),(10,'/api/v1/permissions',' ','2025-11-22 09:32:42.995062','GET','PERMISSIONS','Get permission with pagination',NULL,NULL),(11,'/api/v1/medical-exams',' ','2025-11-22 09:32:42.996653','POST','MEDICAL_EXAMS','Create a Medical Exam',NULL,NULL),(12,'/api/v1/medical-exams',' ','2025-11-22 09:32:42.998217','PUT','MEDICAL_EXAMS','Update a Medical Exam',NULL,NULL),(13,'/api/v1/medical-exams/{id}',' ','2025-11-22 09:32:42.999278','DELETE','MEDICAL_EXAMS','Delete a Medical Exam',NULL,NULL),(14,'/api/v1/medical-exams/{id}',' ','2025-11-22 09:32:43.000909','GET','MEDICAL_EXAMS','Get Medical Exam by id',NULL,NULL),(15,'/api/v1/medical-exams/patient/{id}',' ','2025-11-22 09:32:43.002119','GET','MEDICAL_EXAMS','Get Medical Exam by patient id',NULL,NULL),(16,'/api/v1/medical-exams',' ','2025-11-22 09:32:43.003748','GET','MEDICAL_EXAMS','Get Medical Exam with pagination',NULL,NULL),(17,'/api/v1/clinical-info',' ','2025-11-22 09:32:43.005334','POST','CLINICAL_INFOS','Create a Clinical info',NULL,NULL),(18,'/api/v1/clinical-info',' ','2025-11-22 09:32:43.006397','PUT','CLINICAL_INFOS','Update a Clinical info',NULL,NULL),(19,'/api/v1/clinical-info/{id}',' ','2025-11-22 09:32:43.007997','DELETE','CLINICAL_INFOS','Delete a Clinical info',NULL,NULL),(20,'/api/v1/clinical-info/{id}',' ','2025-11-22 09:32:43.009067','GET','CLINICAL_INFOS','Get Clinical info by id',NULL,NULL),(21,'/api/v1/clinical-info/patient/{id}',' ','2025-11-22 09:32:43.010152','GET','CLINICAL_INFOS','Get Clinical info by patient Id',NULL,NULL),(22,'/api/v1/vital-signs',' ','2025-11-22 09:32:43.011236','POST','VITAL_SIGNS','Create a vital sign',NULL,NULL),(23,'/api/v1/vital-signs',' ','2025-11-22 09:32:43.012798','PUT','VITAL_SIGNS','Update a vital sign',NULL,NULL),(24,'/api/v1/vital-signs/{id}',' ','2025-11-22 09:32:43.014160','DELETE','VITAL_SIGNS','Delete a vital sign',NULL,NULL),(25,'/api/v1/vital-signs/{id}',' ','2025-11-22 09:32:43.015210','GET','VITAL_SIGNS','Get vital sign by id',NULL,NULL),(26,'/api/v1/vital-signs/patient/{id}',' ','2025-11-22 09:32:43.016275','GET','VITAL_SIGNS','Get vital sign with patient id',NULL,NULL),(27,'/api/v1/blood-tests',' ','2025-11-22 09:32:43.018581','POST','BLOOD_TESTS','Create a blood test',NULL,NULL),(28,'/api/v1/blood-tests',' ','2025-11-22 09:32:43.020152','PUT','BLOOD_TESTS','Update a blood test',NULL,NULL),(29,'/api/v1/blood-tests/{id}',' ','2025-11-22 09:32:43.021192','DELETE','BLOOD_TESTS','Delete a blood test',NULL,NULL),(30,'/api/v1/blood-tests/{id}',' ','2025-11-22 09:32:43.023854','GET','BLOOD_TESTS','Get blood test by id',NULL,NULL),(31,'/api/v1/blood-tests/patient/{id}',' ','2025-11-22 09:32:43.025431','GET','BLOOD_TESTS','Get blood test with pagination by patient',NULL,NULL),(32,'/api/v1/blood-tests/medical-exam/{id}',' ','2025-11-22 09:32:43.027532','GET','BLOOD_TESTS','Get blood test with pagination by medical-exam',NULL,NULL),(33,'/api/v1/radiology',' ','2025-11-22 09:32:43.029329','POST','RADIOLOGIES','Create a radiology',NULL,NULL),(34,'/api/v1/radiology',' ','2025-11-22 09:32:43.030910','PUT','RADIOLOGIES','Update a radiology',NULL,NULL),(35,'/api/v1/radiology/{id}',' ','2025-11-22 09:32:43.032120','DELETE','RADIOLOGIES','Delete a radiology',NULL,NULL),(36,'/api/v1/radiology/{id}',' ','2025-11-22 09:32:43.033183','GET','RADIOLOGIES','Get radiology by id',NULL,NULL),(37,'/api/v1/radiology/patient/{id}',' ','2025-11-22 09:32:43.034769','GET','RADIOLOGIES','Get radiology with pagination by patient',NULL,NULL),(38,'/api/v1/radiology/medical-exam/{id}',' ','2025-11-22 09:32:43.036046','GET','RADIOLOGIES','Get radiology with pagination by medical exam',NULL,NULL),(39,'/api/v1/diagnose-final',' ','2025-11-22 09:32:43.037630','POST','DIAGNOSE_FINALS','Create a diagnose final',NULL,NULL),(40,'/api/v1/diagnose-final',' ','2025-11-22 09:32:43.039199','PUT','DIAGNOSE_FINALS','Update a diagnose final',NULL,NULL),(41,'/api/v1/diagnose-final/{id}',' ','2025-11-22 09:32:43.040432','DELETE','DIAGNOSE_FINALS','Delete a diagnose final',NULL,NULL),(42,'/api/v1/diagnose-final/{id}',' ','2025-11-22 09:32:43.041490','GET','DIAGNOSE_FINALS','Get diagnose final by id',NULL,NULL),(43,'/api/v1/diagnose-final/patient/{id}',' ','2025-11-22 09:32:43.043107','GET','DIAGNOSE_FINALS','Get df with pagination by patient',NULL,NULL),(44,'/api/v1/diagnose-final/medical-exam/{id}',' ','2025-11-22 09:32:43.044269','GET','DIAGNOSE_FINALS','Get df with pagination by medical exam',NULL,NULL),(45,'/api/v1/appointments',' ','2025-11-22 09:32:43.051458','POST','APPOINTMENTS','Create a appointment',NULL,NULL),(46,'/api/v1/appointments',' ','2025-11-22 09:32:43.053083','PUT','APPOINTMENTS','Update a appointment',NULL,NULL),(47,'/api/v1/appointments/{id}',' ','2025-11-22 09:32:43.054132','DELETE','APPOINTMENTS','Delete a appointment',NULL,NULL),(48,'/api/v1/appointments/{id}',' ','2025-11-22 09:32:43.055634','GET','APPOINTMENTS','Get appointment by id',NULL,NULL),(49,'/api/v1/appointments',' ','2025-11-22 09:32:43.057194','GET','APPOINTMENTS','Get appointments with pagination',NULL,NULL),(50,'/api/v1/add-role',' ','2025-11-22 09:32:43.058233','POST','ROLES','Create a role',NULL,NULL),(51,'/api/v1/update-role',' ','2025-11-22 09:32:43.059895','PUT','ROLES','Update a role',NULL,NULL),(52,'/api/v1/delete-role/{id}',' ','2025-11-22 09:32:43.061459','DELETE','ROLES','Delete a role',NULL,NULL),(53,'/api/v1/role/{id}',' ','2025-11-22 09:32:43.063225','GET','ROLES','Get role by id',NULL,NULL),(54,'/api/v1/roles',' ','2025-11-22 09:32:43.064329','GET','ROLES','Get roles with pagination',NULL,NULL),(55,'/api/v1/add-user',' ','2025-11-22 09:32:43.065948','POST','USERS','Create a user',NULL,NULL),(56,'/api/v1/update-user',' ','2025-11-22 09:32:43.067010','PUT','USERS','Update a user',NULL,NULL),(57,'/api/v1/delete-user/{id}',' ','2025-11-22 09:32:43.068060','DELETE','USERS','Delete a user',NULL,NULL),(58,'/api/v1/user/{id}',' ','2025-11-22 09:32:43.069636','GET','USERS','Get a user by id',NULL,NULL),(59,'/api/v1/users',' ','2025-11-22 09:32:43.070685','GET','USERS','Get users with pagination',NULL,NULL),(60,'/api/v1/upload/video',' ','2025-11-22 09:32:43.072276','POST','EPISODES','Upload video',NULL,NULL),(61,'/api/v1/files',' ','2025-11-22 09:32:43.074034','POST','FILES','Upload file',NULL,NULL),(62,'/api/v1/clinical-info/service-name','HieuPahmR2',NULL,'GET','CLINICAL_INFOS','Get all clinical services',NULL,NULL),(63,'/api/v1/departments','HieuPahmR2',NULL,'GET','DEPARTSMENTS','Get all departments',NULL,NULL),(64,'/api/v1/vital-signs/medical-exam/{id}','HieuPahmR2',NULL,'GET','VITAL_SIGNS','Get vital sign by MedicalExam Id',NULL,NULL),(65,'/api/v1/clinical-info/medical-exam/{id}','HieuPahmR2',NULL,'GET','CLINICAL_INFOS','Get by Medical Exam Id',NULL,NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radiology`
--

DROP TABLE IF EXISTS `radiology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radiology` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clinical_service_id` bigint DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `conclusion` text,
  `medical_examination_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clinical_service_id` (`clinical_service_id`),
  UNIQUE KEY `medical_examination_id` (`medical_examination_id`),
  CONSTRAINT `FK6024uvtpmy8yrrqclf76squ15` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`),
  CONSTRAINT `fk_radiology_visit` FOREIGN KEY (`medical_examination_id`) REFERENCES `medical_examinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radiology`
--

LOCK TABLES `radiology` WRITE;
/*!40000 ALTER TABLE `radiology` DISABLE KEYS */;
INSERT INTO `radiology` VALUES (4,NULL,NULL,NULL,5),(5,NULL,NULL,NULL,6),(9,4,'1764904497518-gotoubun.jpg','fdfsdfsd',10),(10,NULL,NULL,NULL,17),(11,NULL,NULL,NULL,18),(12,NULL,NULL,NULL,19),(13,NULL,NULL,NULL,20);
/*!40000 ALTER TABLE `radiology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` bigint NOT NULL,
  `permission_id` bigint NOT NULL,
  KEY `FK2xn8qv4vw30i04xdxrpvn3bdi` (`permission_id`),
  KEY `FKtfgq8q9blrp0pt1pvggyli3v9` (`role_id`),
  CONSTRAINT `FK2xn8qv4vw30i04xdxrpvn3bdi` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `FKtfgq8q9blrp0pt1pvggyli3v9` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45),(1,46),(1,47),(1,48),(1,49),(1,50),(1,51),(1,52),(1,53),(1,54),(1,55),(1,56),(1,57),(1,58),(1,59),(1,60),(1,61),(1,62),(1,63),(1,64),(1,65),(2,45),(2,46),(2,47),(2,48),(2,49),(2,61),(3,1),(3,2),(3,3),(3,4),(3,5),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,61),(3,64);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'2025-11-22 09:32:43.159698',NULL,'2025-11-28 08:58:21.730804',NULL,_binary '','Contain full of permissions on this web service udpate','ADMIN'),(2,'2025-12-02 04:19:08.858526',NULL,'2025-12-02 04:19:08.858526',NULL,_binary '','basic permisison','USER'),(3,'2025-12-05 02:10:51.893511',NULL,'2025-12-06 02:49:21.491302',NULL,_binary '','nurse role in hospital','NURSE');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` mediumtext,
  `username` varchar(255) NOT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2025-11-22 09:32:43.373707',NULL,'2025-12-06 02:59:57.448775',NULL,NULL,'admin@gmail.com','$2a$10$hGaht3QkTfIotTXmxb9rV.dQRneyFe6SkUMe.KwuqJcdp.czPQDQC',NULL,'HieuPahmR2',1),(2,'2025-12-02 04:33:18.802447',NULL,'2025-12-03 01:16:26.691689',NULL,NULL,'user1@gmail.com','$2a$10$cvjLsu8zN8D8hyn9A3eR2u7U0Sr9iMlX8Ec3Hx4WjfeAzh0GN0zmq',NULL,'Phương Thảo',2),(3,'2025-12-06 02:22:49.938306',NULL,'2025-12-06 03:00:07.735655',NULL,NULL,'nurse@gmail.com','$2a$10$N3xqErdwty8NVB3jS1x3AenE/j5d2CHxIxjcL1J1FY7PHLAvKk/82','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJudXJzZUBnbWFpbC5jb20iLCJ1c2VyIGFjY291bnQiOnsiaWQiOjMsImVtYWlsIjoibnVyc2VAZ21haWwuY29tIiwibmFtZSI6Ik5ndXllbiBUaGFuaCBIb2EifSwiZXhwIjoxNzY1MDc2NDA3LCJpYXQiOjE3NjQ5OTAwMDd9.N1GhQpgX1_WmNRJqwc1_D_ZAqJy9-bXoBpCePxPBgfaDTtOa4t7Nd9gwEbEpc0PQ7EiCVla3r9bTeMp8EhV4hQ','Nguyen Thanh Hoa',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vital_signs`
--

DROP TABLE IF EXISTS `vital_signs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vital_signs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `temperature` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `heart_rate` int DEFAULT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `blood_type` varchar(10) DEFAULT NULL,
  `systolic_bp` int DEFAULT NULL,
  `diastolic_bp` int DEFAULT NULL,
  `pulse_rate` int DEFAULT NULL,
  `respiratory_rate` int DEFAULT NULL,
  `notes` mediumtext,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `medical_examination_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_vital_signs_visit` (`medical_examination_id`),
  CONSTRAINT `fk_vital_signs_visit` FOREIGN KEY (`medical_examination_id`) REFERENCES `medical_examinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vital_signs`
--

LOCK TABLES `vital_signs` WRITE;
/*!40000 ALTER TABLE `vital_signs` DISABLE KEYS */;
INSERT INTO `vital_signs` VALUES (4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 09:01:14.722651',NULL,'2025-11-28 09:01:14.722651',NULL,5),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-28 09:17:54.328093',NULL,'2025-11-28 09:17:54.328093',NULL,6),(9,32.00,32.00,32.00,36,'AB','RH',36,36,36,36,'hgfhfhfghfgh updateeee','2025-11-29 08:28:34.981690',NULL,'2025-12-01 05:20:45.243913',NULL,10),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-11-29 10:12:34.029620',NULL,'2025-11-29 10:12:34.029620',NULL,17),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-01 02:41:43.890492',NULL,'2025-12-01 02:41:43.890492',NULL,18),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-02 03:10:08.769154',NULL,'2025-12-02 03:10:08.769154',NULL,19),(13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-12-02 03:37:56.144119',NULL,'2025-12-02 03:37:56.144119',NULL,20);
/*!40000 ALTER TABLE `vital_signs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-06 11:55:13
