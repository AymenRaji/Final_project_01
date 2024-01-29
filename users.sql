-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2024 at 10:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flask_user`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `date`) VALUES
(1, 'Aymen', 'Aymen.raji2021b@gmail.com', '*84AAC12F54AB666ECFC', '2024-01-28 12:08:56'),
(2, 'aymen_raji', 'rajiaymen2@gmail.com', '*84AAC12F54AB666ECFC', '2024-01-28 12:08:56'),
(3, 'ahmed', 'ahmed@gmail.com', '*879EB7F2A542F9BB898', '2024-01-28 12:08:56'),
(4, 'aymen_raji', 'ahem@ja', '*A4B6157319038724E35', '2024-01-28 12:08:56'),
(5, 'hame', 'hame@gmail.com', '*F89D848F828CAC4EF64', '2024-01-28 12:08:56'),
(6, 'hame3', 'hame@gmail.com', '*F89D848F828CAC4EF64', '2024-01-28 12:08:56'),
(7, 'aymen_raji3', 'hame@yahoo.com', '*F89D848F828CAC4EF64', '2024-01-28 12:08:56'),
(8, 'hame4', 'hame@dali.com', '*F89D848F828CAC4EF64', '2024-01-28 12:08:56'),
(9, 'dali', 'dali@gmial.com', '*51417F6CE96E66D4FF8', '2024-01-28 12:08:56'),
(10, 'dali', 'dali@gamil.com', '*49B3C0BEFB256E8E21D', '2024-01-28 12:08:56'),
(11, 'Raji', 'rajiaymen2@gmail.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(12, 'Raji', 'raji@gamil.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(13, 'Raji', 'raji@gamil.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(14, 'Osman', 'Osman@stars-egypt.org', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(15, 'Mohamed ', 'mohamed@gamil.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(16, 'Fouad', 'fouad@stars-egypt.org', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(17, 'Merwan', 'merwan@gmail.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(18, 'Majed', 'majed@gmail.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(19, 'Khaled', 'Khaled@gmail.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(20, 'Mustafa', 'Mustafa@gmail.cm', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(21, 'Wedraji', 'aymen_raji@gmail.com', '*89C6B530AA78695E257', '2024-01-28 12:08:56'),
(22, 'fgsre', 'muf5r@gmail.com', '*A4B6157319038724E35', '2024-01-28 12:08:56'),
(23, 'Mobasher', 'Mobasher@gmail.com', '*832EB84CB764129D05D', '2024-01-28 12:08:56'),
(24, 'Khalil', 'Khalil@gmail.com', '1111', '2024-01-28 12:40:39'),
(25, 'Arij', 'arij@gmail.com', '1111', '2024-01-28 13:33:57'),
(26, 'Adiam', 'Adiam@gmail.com', '1111', '2024-01-28 15:44:53'),
(27, 'Atia', 'Atia@gmail.com', '1111', '2024-01-28 15:50:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
