-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : lun. 23 fév. 2026 à 11:01
-- Version du serveur : 11.8.5-MariaDB-ubu2404
-- Version de PHP : 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `marsAi`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','super_admin') NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'super', 'admin', 'super.admin@laplateforme.io', '$2b$10$7fB7RE1unFNN7YIGJ0T5wuC.5c6BhvwdVCyXFJLWdToXTw6C2uZri', 'super_admin', '2026-01-30 08:39:42', '2026-02-11 13:30:20'),
(2, 'admin1', 'admin', 'admin1.admin@laplateforme.io', '$2b$10$ayAQQcxoTLR0cmlZWs9g6u5xe9yGWZhslZNrqQbtsn1yTaO0z9vre', 'admin', '2026-02-03 09:29:45', '2026-02-03 09:29:45'),
(3, 'chaymaa', 'labied', 'chaymaa.labied@laplateforme.io', '$2b$10$dGsjzsznSy25woqQIVfmduvzx2Wy5usv9JZ/D936tJ5QHEomGN7Pa', 'admin', '2026-02-12 11:53:48', '2026-02-12 11:53:48'),
(4, 'mehdi', 'ben-chaabane', 'mehdi.ben-chaabane@laplateform.io', '$2b$10$6Cl8PMLVQeLdpV8YdwkPXOJx9wz/ieA/w.0.wk1mu0eVWRcEMTxWO', 'admin', '2026-02-12 11:55:27', '2026-02-12 11:55:27'),
(5, 'nordine', 'ait-ouaraz', 'nordine.ait-ouaraz@laplateforme.io', '$2b$10$EAS6qw.yUakbClhqmDzO9ep3XgsFpDA6pwINfmEnYWeNM/2xQ..GG', 'admin', '2026-02-12 11:56:37', '2026-02-12 11:56:37'),
(6, 'amad-khaly', 'Diallo', 'amad-khaly.diallo@laplateforme.io', '$2b$10$rccI3p83/yDOLE6uH.FgOetJbgKOXu.mzScfkJE7qk19v4jSzFlhm', 'admin', '2026-02-12 11:58:44', '2026-02-12 11:58:44');

-- --------------------------------------------------------

--
-- Structure de la table `admin_movie_assignment`
--

CREATE TABLE `admin_movie_assignment` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rating` tinyint(4) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `flag` enum('green','yellow','red') DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `admin_movie_assignment`
--

INSERT INTO `admin_movie_assignment` (`id`, `admin_id`, `movie_id`, `rating`, `comment`, `flag`, `created_at`) VALUES
(1, 2, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(2, 3, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(3, 4, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(4, 5, 1, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(5, 6, 2, NULL, NULL, 'red', '2026-02-12 15:03:41'),
(6, 2, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(7, 3, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(8, 4, 2, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(9, 5, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(10, 6, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(11, 2, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(12, 3, 4, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(13, 4, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(14, 5, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(15, 6, 5, NULL, NULL, 'yellow', '2026-02-12 15:03:41'),
(16, 2, 5, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(17, 3, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(18, 4, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(19, 5, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(20, 6, 6, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(21, 2, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(22, 3, 7, NULL, NULL, 'red', '2026-02-12 15:03:41'),
(23, 4, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(24, 5, 7, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(25, 6, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(26, 2, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(27, 3, 8, NULL, NULL, 'yellow', '2026-02-12 15:03:41'),
(28, 4, 8, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(29, 5, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(30, 6, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(31, 2, 9, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(32, 3, 9, NULL, NULL, 'green', '2026-02-12 15:03:41'),
(33, 4, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(34, 5, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(35, 6, 10, NULL, NULL, 'green', '2026-02-12 15:03:41'),
(36, 2, 10, NULL, NULL, NULL, '2026-02-12 15:03:41'),
(37, 6, 9, 10, 'jgfhg', NULL, '2026-02-12 15:15:57'),
(38, 3, 6, 3, 'il respect pas les aspects', NULL, '2026-02-19 10:58:16'),
(39, 6, 10, 6, 'pas ouf', NULL, '2026-02-19 13:41:46'),
(40, 6, 2, 2, NULL, NULL, '2026-02-19 13:51:22'),
(41, 6, 5, 5, 'passable', NULL, '2026-02-19 13:51:53'),
(42, 3, 9, 7, NULL, 'green', '2026-02-20 09:02:50'),
(43, 3, 8, NULL, NULL, NULL, '2026-02-20 09:03:03'),
(44, 3, 7, NULL, NULL, NULL, '2026-02-20 09:03:26'),
(45, 3, 9, 7, NULL, NULL, '2026-02-20 13:48:58');

-- --------------------------------------------------------

--
-- Structure de la table `ai_declaration`
--

CREATE TABLE `ai_declaration` (
  `id` int(11) NOT NULL,
  `artwork_type` enum('100_ai','hybrid') NOT NULL,
  `tech_stack` varchar(500) DEFAULT NULL,
  `methodology` varchar(500) DEFAULT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `ai_declaration`
--

INSERT INTO `ai_declaration` (`id`, `artwork_type`, `tech_stack`, `methodology`, `movie_id`) VALUES
(1, '100_ai', 'Sora', 'prompt', 6),
(2, '100_ai', 'Freepik', 'j\'ai pris une vidéo par hasard sur freepik', 7),
(3, '100_ai', 'Artist.io', 'prompt', 8),
(4, 'hybrid', 'photoshop, sora et capcut', 'j\'ai fais un rpompt a l\'AI et ensuite j\'ai use photoshop pour modifier certaines partis et utiliser capcut pour monter', 9),
(5, '100_ai', 'FreePik', 'qsdlkfhqmsdlkfqsdflqksj qlsdjfhqlsdjkf q sldkjfhl', 11);

-- --------------------------------------------------------

--
-- Structure de la table `asset`
--

CREATE TABLE `asset` (
  `id` int(11) NOT NULL,
  `asset_type` enum('thumbnail','still','subtitle','other') NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_format` varchar(10) DEFAULT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `asset`
--

INSERT INTO `asset` (`id`, `asset_type`, `file_path`, `file_format`, `movie_id`) VALUES
(1, 'thumbnail', '/uploads/thumbnail1.jpg', 'jpg', 2),
(2, 'still', 'uploads/assets/video-1770628427436-368732121.jpg', 'jpg', 9),
(3, 'still', 'uploads/assets/view-futuristic-concert-1770628427546-676111237.jpg', 'jpg', 9),
(4, 'still', 'uploads/assets/futuristic-set-with-dj-charge-music-using-virtual-reality-glasses-1770628427594-466118993.jpg', 'jpg', 9);

-- --------------------------------------------------------

--
-- Structure de la table `cms_content`
--

CREATE TABLE `cms_content` (
  `id` int(11) UNSIGNED NOT NULL,
  `content_key` varchar(191) NOT NULL,
  `locale` varchar(10) NOT NULL,
  `value` text NOT NULL,
  `page` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `cms_content`
--

INSERT INTO `cms_content` (`id`, `content_key`, `locale`, `value`, `page`, `description`, `created_at`, `updated_at`) VALUES
(1, 'home.hero.title', 'en', 'Un festival pour raconter fort.', NULL, NULL, '2026-02-11 13:52:32', '2026-02-11 13:53:00');

-- --------------------------------------------------------

--
-- Structure de la table `collaborator`
--

CREATE TABLE `collaborator` (
  `id` int(11) NOT NULL,
  `civility` varchar(10) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `collaborator`
--

INSERT INTO `collaborator` (`id`, `civility`, `first_name`, `last_name`, `role`, `email`, `movie_id`) VALUES
(1, 'Mr', 'Paul', 'Martin', 'Producer', 'paul.martin@example.com', 2),
(2, 'Mr', 'mehdi', 'mehdi', 'monteur video', 'mehdi.mehdi@laplateforme.io', 6),
(3, 'Mr', 'amad', 'diallo', 'realisateur', 'amad.diallo@laplateforme.io', 7),
(4, 'Mr', 'amad', 'diallo', 'realisateur', 'amad.diallo@laplateforme.io', 7);

-- --------------------------------------------------------

--
-- Structure de la table `filmmaker`
--

CREATE TABLE `filmmaker` (
  `id` int(11) NOT NULL,
  `civility` enum('Mr','Mrs') DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `job` varchar(100) DEFAULT NULL,
  `street` varchar(150) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `discovery_source` varchar(100) DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `filmmaker`
--

INSERT INTO `filmmaker` (`id`, `civility`, `first_name`, `last_name`, `birth_date`, `email`, `phone`, `mobile`, `job`, `street`, `postal_code`, `city`, `country`, `discovery_source`, `newsletter`) VALUES
(1, 'Mr', 'John', 'Doe', '1990-05-15', 'khalyamad.d@gmail.com', '0123456789', '0612345678', 'Director', '123 Rue Exemple', '75001', 'Paris', 'France', 'Social Media', 1),
(3, 'Mr', 'Amad khaly', 'Diallo', '2002-02-25', 'amad-khaly.diallo@laplateforme.io', '0758854873', '0758854873', 'DEV', '123 rue de la paix', '12345', 'Ville', 'pays', 'famille', 1),
(4, 'Mr', 'sadjo', 'kanoute', '1920-12-24', 'sadjo.kanoute@laplateforme.io', NULL, '01234567', 'DEV', NULL, NULL, 'Paris', 'France', 'laplateforme', 0),
(5, 'Mr', 'amad', 'diallo', '2000-11-03', 'amad.diallo@laplateforme.io', NULL, '01234567', 'DEV', NULL, NULL, 'Paris', 'Belgique', 'Famille', 0),
(7, 'Mr', 'amad', 'diallo', '2004-01-20', 'khalyamad.d@gqsdfl.com', NULL, '0758854873', 'TESTER', NULL, NULL, 'Paris', 'France', 'collègue', 0),
(8, 'Mr', 'mehdi', 'mehdi', '2001-02-20', 'mehdi.mehdi@laplateforme.io', NULL, '01234567', 'student', NULL, NULL, 'Paris', 'France', 'famille', 0),
(9, 'Mr', 'pierre', 'pierre', '1988-02-20', 'pierre@gmail.com', NULL, '01234567', 'Prof', NULL, NULL, 'France', 'PAris', 'formation', 0),
(12, 'Mr', 'diallo', 'khaly', '2000-01-20', 'khalyamad.d@gmail.com', NULL, '01234567', 'DEV', NULL, NULL, 'Parsi', 'Fr', 'family', 0),
(13, 'Mr', 'AMAD', 'DIALLO', '2000-02-20', 'khalyamad.d@gmail.com', NULL, '01234567', 'Dev', NULL, NULL, 'Parsi', 'Fr', 'sld', 0),
(14, 'Mr', 'qmsldk', 'qmsdlk', '2000-02-20', 'amad-khaly.diallo@laplateforme.io', NULL, '01234567', 'Dev', NULL, NULL, 'Paris', 'Fr', 'dsmfk', 0);

-- --------------------------------------------------------

--
-- Structure de la table `jury`
--

CREATE TABLE `jury` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` varchar(150) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `jury`
--

INSERT INTO `jury` (`id`, `first_name`, `last_name`, `role`, `bio`, `photo_url`, `created_at`, `updated_at`) VALUES
(2, 'Nordine', '-', 'President du Jury', 'Réalisateur éminent et leader dans l\'utilisation de l\'intelligence artificielle au cinéma.', '/images/allumer.png', '2026-02-13 09:08:00', '2026-02-13 09:15:43'),
(3, 'Ahamd', '-', 'Critique Cinema', 'Critique principal de magazines de cinéma et analyste technologique.', '/uploads/avatar.jpg', '2026-02-13 09:08:00', '2026-02-13 09:08:00'),
(4, 'Mehdi', '', 'Expert AI', 'Chercheur principal en modèles linguistiques et production d\'images.', 'Mehdi.jpg', '2026-02-13 09:08:00', '2026-02-13 11:09:10'),
(5, 'Sofia', 'Martinez', 'Productrice', 'Producteur de projets indépendants en Europe.', 'banner.png', '2026-02-13 09:08:00', '2026-02-13 11:12:01'),
(6, 'John', 'Doe', 'Producteur', 'Producteur de projets indépendants en Europe.', 'john.jpg', '2026-02-13 09:08:00', '2026-02-13 11:15:05'),
(7, 'Jane', 'Smith', 'Productrice', 'Productrice de projets indépendants en Europe.', '/uploads/avatar.jpg', '2026-02-13 09:08:00', '2026-02-13 09:08:00');

-- --------------------------------------------------------

--
-- Structure de la table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `original_title` varchar(150) NOT NULL,
  `english_title` varchar(150) NOT NULL,
  `duration` int(11) NOT NULL,
  `language` varchar(50) DEFAULT NULL,
  `synopsis_original` varchar(300) DEFAULT NULL,
  `synopsis_english` varchar(300) DEFAULT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `status` enum('in_process','approved','rejected','selected') DEFAULT 'in_process',
  `decision_reason` text DEFAULT NULL,
  `decision_at` datetime DEFAULT NULL,
  `is_winner` tinyint(1) NOT NULL DEFAULT 0,
  `filmmaker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `movie`
--

INSERT INTO `movie` (`id`, `original_title`, `english_title`, `duration`, `language`, `synopsis_original`, `synopsis_english`, `youtube_url`, `video_url`, `status`, `decision_reason`, `decision_at`, `is_winner`, `filmmaker_id`) VALUES
(1, 'Le Film Test', 'The Test Movie', 120, 'French', 'Ceci est un synopsis en français.', 'This is an English synopsis.', 'https://youtu.be/dQw4w9WgXcQ', NULL, 'rejected', NULL, '2026-02-05 15:26:47', 0, 1),
(2, 'Le Film Test', 'The Test Movie', 120, 'French', 'Ceci est un synopsis en français.', 'This is an English synopsis.', 'https://youtu.be/dQw4w9WgXcQ', NULL, 'rejected', NULL, '2026-02-06 13:42:40', 0, 1),
(4, 'title', 'title', 1, 'anglais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=CyMS7UqT53w', NULL, 'rejected', NULL, '2026-02-19 10:58:29', 0, 1),
(5, 'title', 'title', 10, 'angais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=LuykUqIniFE', NULL, 'selected', NULL, '2026-02-12 14:26:40', 0, 1),
(6, 'title', 'title', 5, 'anglais', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=pHKFWb5Zgk8', NULL, 'selected', 'je sais pas pourquoi', '2026-02-03 09:49:04', 0, 1),
(7, 'savane', 'savane', 1, 'Français', 'dans la savane', 'dans la savane', 'https://www.youtube.com/watch?v=0vI-icmWPww', NULL, 'in_process', NULL, NULL, 0, 4),
(8, 'Title', 'title', 0, 'English', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=OERknocIYKI', NULL, 'rejected', NULL, '2026-02-12 14:26:36', 0, 5),
(9, 'Futur souhaitable', 'futur', 1, 'Français', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=sdN8gdoYOYo', NULL, 'selected', NULL, '2026-02-12 15:15:47', 1, 7),
(10, 'titre', 'titre', 1, 'french', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=nTWKt1yKxVg', NULL, 'selected', NULL, '2026-02-20 09:17:46', 0, 8),
(11, 'titre', 'title', 15, 'En', 'synopsis', 'synopsis', 'https://www.youtube.com/watch?v=C5fbefyCXD8', 'uploads/videos/1771841693129-245859721.mp4', 'selected', NULL, NULL, 0, 14);

-- --------------------------------------------------------

--
-- Structure de la table `movie_tag`
--

CREATE TABLE `movie_tag` (
  `movie_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `movie_tag`
--

INSERT INTO `movie_tag` (`movie_id`, `tag_id`) VALUES
(6, 2),
(9, 3),
(9, 4),
(9, 5);

-- --------------------------------------------------------

--
-- Structure de la table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `newsletters`
--

INSERT INTO `newsletters` (`id`, `email`, `created_at`) VALUES
(1, 'amad-khaly.diallo@laplateforme.io', '2026-02-06 13:39:10'),
(2, 'mehdi.ben-chaabane@laplateforme.io', '2026-02-06 13:39:10'),
(3, 'nordine.ait-ouaraz@laplateforme.io', '2026-02-06 13:48:09'),
(5, 'chaymaa.labied@laplateforme.io', '2026-02-06 13:48:09'),
(6, 'jawad.zafari@laplateforme.io', '2026-02-06 13:48:09'),
(7, 'soumman.guirassy@laplateforme.io', '2026-02-06 13:48:09'),
(8, 'khalyamad.d@gmail.com', '2026-02-06 14:06:02');

-- --------------------------------------------------------

--
-- Structure de la table `notations`
--

CREATE TABLE `notations` (
  `id` int(10) UNSIGNED NOT NULL,
  `score` tinyint(3) UNSIGNED NOT NULL CHECK (`score` between 0 and 10),
  `comment` text DEFAULT NULL,
  `film_id` int(10) UNSIGNED NOT NULL,
  `admin_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ;

--
-- Déchargement des données de la table `notations`
--

INSERT INTO `notations` (`id`, `score`, `comment`, `film_id`, `admin_id`, `created_at`) VALUES
(1, 0, NULL, 1, 2, '2026-02-12 12:57:12'),
(2, 0, NULL, 1, 3, '2026-02-12 12:57:12'),
(3, 0, NULL, 2, 4, '2026-02-12 12:57:12'),
(4, 0, NULL, 2, 5, '2026-02-12 12:57:12'),
(5, 0, NULL, 4, 6, '2026-02-12 12:57:12'),
(6, 0, NULL, 4, 2, '2026-02-12 12:57:12'),
(7, 0, NULL, 5, 3, '2026-02-12 12:57:12'),
(8, 0, NULL, 5, 4, '2026-02-12 12:57:12'),
(9, 0, NULL, 6, 5, '2026-02-12 12:57:12'),
(10, 0, NULL, 6, 6, '2026-02-12 12:57:12'),
(11, 0, NULL, 7, 2, '2026-02-12 12:57:12'),
(12, 0, NULL, 7, 3, '2026-02-12 12:57:12'),
(13, 0, NULL, 8, 4, '2026-02-12 12:57:12'),
(14, 0, NULL, 8, 5, '2026-02-12 12:57:12'),
(15, 0, NULL, 9, 6, '2026-02-12 12:57:12'),
(16, 0, NULL, 9, 2, '2026-02-12 12:57:12'),
(17, 0, NULL, 10, 3, '2026-02-12 12:57:12'),
(18, 0, NULL, 10, 4, '2026-02-12 12:57:12');

-- --------------------------------------------------------

--
-- Structure de la table `partners`
--

CREATE TABLE `partners` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `partners`
--

INSERT INTO `partners` (`id`, `name`, `logo_url`, `description`, `website_url`, `created_at`, `updated_at`) VALUES
(1, 'partenaires', 'https://www.parteners.fr/logo', 'partenaire description', 'https://www.parteners.fr', '2026-02-06 12:15:56', '2026-02-06 12:15:56');

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `label` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `tag`
--

INSERT INTO `tag` (`id`, `label`) VALUES
(4, '#ai'),
(3, '#futur'),
(5, '#photoshop'),
(2, '#teste');

-- --------------------------------------------------------

--
-- Structure de la table `winner`
--

CREATE TABLE `winner` (
  `id` int(11) NOT NULL,
  `ranking` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `admin_movie_assignment`
--
ALTER TABLE `admin_movie_assignment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `movie_id` (`movie_id`);

--
-- Index pour la table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_asset_movie` (`movie_id`);

--
-- Index pour la table `cms_content`
--
ALTER TABLE `cms_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_key_locale` (`content_key`,`locale`);

--
-- Index pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_collaborator_movie` (`movie_id`);

--
-- Index pour la table `filmmaker`
--
ALTER TABLE `filmmaker`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `jury`
--
ALTER TABLE `jury`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movie_filmmaker` (`filmmaker_id`);

--
-- Index pour la table `movie_tag`
--
ALTER TABLE `movie_tag`
  ADD PRIMARY KEY (`movie_id`,`tag_id`),
  ADD KEY `fk_movie_tag_tag` (`tag_id`);

--
-- Index pour la table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `notations`
--
ALTER TABLE `notations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_notations_admin_film` (`film_id`,`admin_id`);

--
-- Index pour la table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `label` (`label`);

--
-- Index pour la table `winner`
--
ALTER TABLE `winner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category` (`category`,`ranking`),
  ADD KEY `fk_winner_movie` (`movie_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `admin_movie_assignment`
--
ALTER TABLE `admin_movie_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `asset`
--
ALTER TABLE `asset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `cms_content`
--
ALTER TABLE `cms_content`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `collaborator`
--
ALTER TABLE `collaborator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `filmmaker`
--
ALTER TABLE `filmmaker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `jury`
--
ALTER TABLE `jury`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `notations`
--
ALTER TABLE `notations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `winner`
--
ALTER TABLE `winner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ai_declaration`
--
ALTER TABLE `ai_declaration`
  ADD CONSTRAINT `fk_ai_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `asset`
--
ALTER TABLE `asset`
  ADD CONSTRAINT `fk_asset_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `collaborator`
--
ALTER TABLE `collaborator`
  ADD CONSTRAINT `fk_collaborator_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `fk_movie_filmmaker` FOREIGN KEY (`filmmaker_id`) REFERENCES `filmmaker` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `movie_tag`
--
ALTER TABLE `movie_tag`
  ADD CONSTRAINT `fk_movie_tag_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_movie_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `winner`
--
ALTER TABLE `winner`
  ADD CONSTRAINT `fk_winner_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;
COMMIT;

-- table pour stocker la phase du festival (1 ligne id=1)
CREATE TABLE IF NOT EXISTS `festival_phase` (
  `id` INT PRIMARY KEY,
  `phase` ENUM('phase1','phase2','phase3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `festival_phase` (`id`, `phase`) VALUES (1,'phase1')
  ON DUPLICATE KEY UPDATE phase = phase;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
