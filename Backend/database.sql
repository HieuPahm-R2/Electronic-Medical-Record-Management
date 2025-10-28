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
-- Table structure for table `blood_test`
--

DROP TABLE IF EXISTS `blood_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_test` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `clinical_service_id` int NOT NULL,
  `conclusion` varchar(255) DEFAULT NULL,
  `glucose` decimal(38,2) DEFAULT NULL,
  `urea` decimal(38,2) DEFAULT NULL,
  `rbc` decimal(38,2) DEFAULT NULL,
  `hb` decimal(38,2) DEFAULT NULL,
  `hct` decimal(38,2) DEFAULT NULL,
  `mcv` decimal(38,2) DEFAULT NULL,
  `mch` decimal(38,2) DEFAULT NULL,
  `wbc` decimal(38,2) DEFAULT NULL,
  `neut` decimal(38,2) DEFAULT NULL,
  `blood_group` varchar(255) NOT NULL,
  `blood_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clinical_service_id` (`clinical_service_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `blood_test_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `blood_test_ibfk_2` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_test`
--

LOCK TABLES `blood_test` WRITE;
/*!40000 ALTER TABLE `blood_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinical_info`
--

DROP TABLE IF EXISTS `clinical_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinical_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `clinical_service_id` int NOT NULL,
  `circulatory_diagnosis` text NOT NULL,
  `respiratory_diagnosis` text NOT NULL,
  `genitourinary_diagnosis` text NOT NULL,
  `bone_diagnosis` text NOT NULL,
  `rhm_diagnosis` text NOT NULL,
  `digestive_diagnosis` text NOT NULL,
  `nervous_diagnosis` text NOT NULL,
  `ent_diagnosis` text NOT NULL,
  `other_diagnoses` text NOT NULL,
  `syndrome` text,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `clinical_service_id` (`clinical_service_id`),
  CONSTRAINT `clinical_info_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `clinical_info_ibfk_2` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinical_info`
--

LOCK TABLES `clinical_info` WRITE;
/*!40000 ALTER TABLE `clinical_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinical_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinical_service`
--

DROP TABLE IF EXISTS `clinical_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinical_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinical_service`
--

LOCK TABLES `clinical_service` WRITE;
/*!40000 ALTER TABLE `clinical_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinical_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnose_final`
--

DROP TABLE IF EXISTS `diagnose_final`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnose_final` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `main_disease` varchar(100) NOT NULL,
  `comorbidity` varchar(100) NOT NULL,
  `conclusion` mediumtext NOT NULL,
  `prognosis` text,
  `treatment_plan` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `diagnose_final_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnose_final`
--

LOCK TABLES `diagnose_final` WRITE;
/*!40000 ALTER TABLE `diagnose_final` DISABLE KEYS */;
/*!40000 ALTER TABLE `diagnose_final` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_examinations`
--

DROP TABLE IF EXISTS `medical_examinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_examinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `arrival_time` date DEFAULT NULL,
  `reception_time` date NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `referral_source` varchar(255) DEFAULT NULL,
  `symptoms` text,
  `reason` text NOT NULL,
  `days_of_symptoms` int DEFAULT NULL,
  `personal_medical_history` text,
  `family_medical_history` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `medical_examinations_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_examinations`
--

LOCK TABLES `medical_examinations` WRITE;
/*!40000 ALTER TABLE `medical_examinations` DISABLE KEYS */;
/*!40000 ALTER TABLE `medical_examinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'202585BEAC','1990-05-15','nguyenvana@example.com','0987654321','Vietnamese','123 Le Loi Street, District 1, Ho Chi Minh City','012345678910','BHX-123456789',NULL,'Male','Engineer','Tran Thi B','0912345678','2025-10-11 09:41:19','2025-10-11 10:04:58',NULL,NULL,'Hoai Thang');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `radiology`
--

DROP TABLE IF EXISTS `radiology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radiology` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `clinical_service_id` int NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `conclusion` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clinical_service_id` (`clinical_service_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `radiology_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `radiology_ibfk_2` FOREIGN KEY (`clinical_service_id`) REFERENCES `clinical_service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `radiology`
--

LOCK TABLES `radiology` WRITE;
/*!40000 ALTER TABLE `radiology` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` mediumtext,
  `username` varchar(255) NOT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  KEY `FK60qlg9oata44io3a80yh31536` (`role_id`),
  CONSTRAINT `FK60qlg9oata44io3a80yh31536` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `refresh_token` varchar(512) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `refresh_token` (`refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vital_signs`
--

DROP TABLE IF EXISTS `vital_signs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vital_signs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `temperature` decimal(5,2) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `heart_rate` int NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `blood_type` varchar(10) NOT NULL,
  `systolic_bp` int NOT NULL,
  `diastolic_bp` int NOT NULL,
  `pulse_rate` int DEFAULT NULL,
  `respiratory_rate` int DEFAULT NULL,
  `notes` mediumtext,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `vital_signs_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vital_signs`
--

LOCK TABLES `vital_signs` WRITE;
/*!40000 ALTER TABLE `vital_signs` DISABLE KEYS */;
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

-- Dump completed on 2025-10-21 10:53:00
