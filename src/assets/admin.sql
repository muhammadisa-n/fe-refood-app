-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 03, 2024 at 08:19 AM
-- Server version: 10.6.18-MariaDB
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `refoodap_db_refood_app`
--

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nama`, `email`, `password`, `ava_image_id`, `ava_image_url`, `refresh_token`, `verified_at`) VALUES
('admin', 'Administrator', 'admin@refood.site', '$2b$10$b5Qv6pm7sBPbnkKHnRiW2uQU2f/lHdL6VI8Q14YzOv4PF4ZHM/5Pa', NULL, NULL, NULL, '2024-06-29 17:07:55');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
