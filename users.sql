-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 02:20 PM
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
(1, 'Aymen', 'Aymen.raji2021b@gmail.com', '12345678', '2024-01-21 15:17:05'),
(2, 'aymen_raji', 'rajiaymen2@gmail.com', '12345678', '2024-01-21 22:14:19'),
(3, 'ahmed', 'ahmed@gmail.com', 'hamid', '2024-01-21 22:30:53'),
(4, 'aymen_raji', 'ahem@ja', '1234', '2024-01-21 22:36:27'),
(5, 'hame', 'hame@gmail.com', 'hame', '2024-01-21 22:36:53'),
(6, 'hame3', 'hame@gmail.com', 'hame', '2024-01-21 22:38:58'),
(7, 'aymen_raji3', 'hame@yahoo.com', 'hame', '2024-01-21 22:39:51'),
(8, 'hame4', 'hame@dali.com', 'hame', '2024-01-21 22:42:23'),
(9, 'dali', 'dali@gmial.com', 'dali', '2024-01-21 22:44:54'),
(10, 'dali', 'dali@gamil.com', 'dal', '2024-01-21 22:45:15'),
(11, 'Raji', 'rajiaymen2@gmail.com', '1111', '2024-01-21 22:46:23'),
(12, 'Raji', 'raji@gamil.com', '1111', '2024-01-21 22:46:51'),
(13, 'Raji', 'raji@gamil.com', '1111', '2024-01-21 22:47:05'),
(14, 'Osman', 'Osman@stars-egypt.org', '1111', '2024-01-21 22:47:33'),
(15, 'Mohamed ', 'mohamed@gamil.com', '1111', '2024-01-21 22:48:24'),
(16, 'Fouad', 'fouad@stars-egypt.org', '1111', '2024-01-21 22:53:15'),
(17, 'Merwan', 'merwan@gmail.com', '1111', '2024-01-22 11:22:27'),
(18, 'Majed', 'majed@gmail.com', '1111', '2024-01-22 11:41:49'),
(19, 'Khaled', 'Khaled@gmail.com', '1111', '2024-01-22 11:46:54'),
(20, 'Mustafa', 'Mustafa@gmail.cm', '1111', '2024-01-22 11:54:14'),
(21, 'Wedraji', 'aymen_raji@gmail.com', '1111', '2024-01-22 13:08:28'),
(22, 'fgsre', 'muf5r@gmail.com', '1234', '2024-01-23 09:05:32');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
