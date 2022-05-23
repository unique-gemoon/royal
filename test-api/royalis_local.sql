-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : mysqldb
-- Généré le : lun. 23 mai 2022 à 09:02
-- Version du serveur : 5.7.37
-- Version de PHP : 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `royalis_local`
--

-- --------------------------------------------------------

--
-- Structure de la table `appearancePlis`
--

CREATE TABLE `appearancePlis` (
  `id` int(11) NOT NULL,
  `duration` time DEFAULT NULL,
  `allottedTime` int(11) DEFAULT NULL,
  `signe` tinyint(1) DEFAULT '0',
  `pliId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `appearancePlis`
--

INSERT INTO `appearancePlis` (`id`, `duration`, `allottedTime`, `signe`, `pliId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '00:01:00', 1, 1, 1, 1, '2022-05-20 14:48:36', '2022-05-20 14:48:36'),
(2, '00:01:00', 1, 1, 2, 1, '2022-05-23 08:18:55', '2022-05-23 08:18:55');

-- --------------------------------------------------------

--
-- Structure de la table `commentNotifications`
--

CREATE TABLE `commentNotifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `commentId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `pliId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `originalname` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `isOuverture` tinyint(1) DEFAULT '0',
  `pliId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `media`
--

INSERT INTO `media` (`id`, `type`, `name`, `originalname`, `path`, `isOuverture`, `pliId`, `createdAt`, `updatedAt`) VALUES
(1, 'image', '1_1653058114248.png', 'png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png', 'public/uploads/media/1_1653058114248.png', 0, 1, '2022-05-20 14:48:34', '2022-05-20 14:48:34');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `threadId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `seen` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `pliNotifications`
--

CREATE TABLE `pliNotifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `pliId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `plis`
--

CREATE TABLE `plis` (
  `id` int(11) NOT NULL,
  `content` text,
  `ouverture` text,
  `duration` time DEFAULT NULL,
  `allottedTime` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `plis`
--

INSERT INTO `plis` (`id`, `content`, `ouverture`, `duration`, `allottedTime`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'test', '', '01:00:00', 61, 1, '2022-05-20 14:48:34', '2022-05-20 14:48:36'),
(2, 'test', '', '01:00:00', 61, 1, '2022-05-23 08:18:51', '2022-05-23 08:18:55');

-- --------------------------------------------------------

--
-- Structure de la table `sondageNotVotes`
--

CREATE TABLE `sondageNotVotes` (
  `id` int(11) NOT NULL,
  `mediumId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `sondageOptions`
--

CREATE TABLE `sondageOptions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mediumId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `sondageVotes`
--

CREATE TABLE `sondageVotes` (
  `id` int(11) NOT NULL,
  `sondageOptionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `subscriberNotifications`
--

CREATE TABLE `subscriberNotifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subscriberId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subscriberId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `threads`
--

CREATE TABLE `threads` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `threadUsers`
--

CREATE TABLE `threadUsers` (
  `id` int(11) NOT NULL,
  `threadId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `passwordResetTokenAt` datetime DEFAULT NULL,
  `tokenConfirmEmail` varchar(255) DEFAULT NULL,
  `roles` json DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT '0',
  `enabled` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `seenNotificationNewAccount` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `passwordResetToken`, `passwordResetTokenAt`, `tokenConfirmEmail`, `roles`, `lastLogin`, `confirmed`, `enabled`, `createdAt`, `updatedAt`, `seenNotificationNewAccount`) VALUES
(1, 'jacob', 'jacob@example.com', '$2a$10$vaYpCOphpgL04zbXkHoi4OV2cFRcX/Kn69JNDqiueSQRvoxERqo8u', NULL, NULL, '4482113be10f317ba8ec777bbf7b1e1218451817', '[\"ROLE_USER\"]', '2022-05-20 14:48:19', 0, 1, '2022-05-20 14:48:19', '2022-05-20 14:48:19', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appearancePlis`
--
ALTER TABLE `appearancePlis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pliId` (`pliId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `commentNotifications`
--
ALTER TABLE `commentNotifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `commentId` (`commentId`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pliId` (`pliId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `parentId` (`parentId`);

--
-- Index pour la table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pliId` (`pliId`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `threadId` (`threadId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `pliNotifications`
--
ALTER TABLE `pliNotifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `pliId` (`pliId`);

--
-- Index pour la table `plis`
--
ALTER TABLE `plis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `sondageNotVotes`
--
ALTER TABLE `sondageNotVotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mediumId` (`mediumId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `sondageOptions`
--
ALTER TABLE `sondageOptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mediumId` (`mediumId`);

--
-- Index pour la table `sondageVotes`
--
ALTER TABLE `sondageVotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sondageOptionId` (`sondageOptionId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `subscriberNotifications`
--
ALTER TABLE `subscriberNotifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `subscriberId` (`subscriberId`);

--
-- Index pour la table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `subscriberId` (`subscriberId`);

--
-- Index pour la table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `threadUsers`
--
ALTER TABLE `threadUsers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `threadId` (`threadId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `appearancePlis`
--
ALTER TABLE `appearancePlis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `commentNotifications`
--
ALTER TABLE `commentNotifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `pliNotifications`
--
ALTER TABLE `pliNotifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `plis`
--
ALTER TABLE `plis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `sondageNotVotes`
--
ALTER TABLE `sondageNotVotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sondageOptions`
--
ALTER TABLE `sondageOptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sondageVotes`
--
ALTER TABLE `sondageVotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `subscriberNotifications`
--
ALTER TABLE `subscriberNotifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `threads`
--
ALTER TABLE `threads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `threadUsers`
--
ALTER TABLE `threadUsers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appearancePlis`
--
ALTER TABLE `appearancePlis`
  ADD CONSTRAINT `appearancePlis_ibfk_7` FOREIGN KEY (`pliId`) REFERENCES `plis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appearancePlis_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commentNotifications`
--
ALTER TABLE `commentNotifications`
  ADD CONSTRAINT `commentNotifications_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentNotifications_ibfk_4` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_10` FOREIGN KEY (`pliId`) REFERENCES `plis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_11` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_12` FOREIGN KEY (`parentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`pliId`) REFERENCES `plis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_7` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pliNotifications`
--
ALTER TABLE `pliNotifications`
  ADD CONSTRAINT `pliNotifications_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pliNotifications_ibfk_4` FOREIGN KEY (`pliId`) REFERENCES `plis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `plis`
--
ALTER TABLE `plis`
  ADD CONSTRAINT `plis_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sondageNotVotes`
--
ALTER TABLE `sondageNotVotes`
  ADD CONSTRAINT `sondageNotVotes_ibfk_7` FOREIGN KEY (`mediumId`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sondageNotVotes_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sondageOptions`
--
ALTER TABLE `sondageOptions`
  ADD CONSTRAINT `sondageOptions_ibfk_1` FOREIGN KEY (`mediumId`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sondageVotes`
--
ALTER TABLE `sondageVotes`
  ADD CONSTRAINT `sondageVotes_ibfk_7` FOREIGN KEY (`sondageOptionId`) REFERENCES `sondageOptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sondageVotes_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `subscriberNotifications`
--
ALTER TABLE `subscriberNotifications`
  ADD CONSTRAINT `subscriberNotifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscriberNotifications_ibfk_2` FOREIGN KEY (`subscriberId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `subscribers`
--
ALTER TABLE `subscribers`
  ADD CONSTRAINT `subscribers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscribers_ibfk_2` FOREIGN KEY (`subscriberId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `threadUsers`
--
ALTER TABLE `threadUsers`
  ADD CONSTRAINT `threadUsers_ibfk_7` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `threadUsers_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
