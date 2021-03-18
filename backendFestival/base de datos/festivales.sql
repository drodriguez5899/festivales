-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2021 a las 20:30:15
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `festivales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `contenido` varchar(100) NOT NULL,
  `imgSrc` varchar(100) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `titulo`, `contenido`, `imgSrc`, `idUser`) VALUES
(18, 'medusa festival', 'dedeee', '', 8),
(27, 'ejemplo 2', 'dddddddddd', '', 8),
(35, 'ddddddddbgbggg', 'cccccccccccggbgg', '', 17),
(36, 'xsxssx', 'xxsssxs', '', 17),
(37, 'cddd', 'ddcddd', '', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `imgSrc` varchar(100) DEFAULT NULL,
  `pais` varchar(100) NOT NULL,
  `sexo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellidos`, `password`, `email`, `telefono`, `imgSrc`, `pais`, `sexo`) VALUES
(2, 'pedro', 'villacañas', '$2y$10$PZofZXdCfNsoNeLQaWpXIenl0adX6YVdlJdTjbNRLC7rRmfku8y6.', 'pedro@sasa', 656568685, 'http://localhost/backendphp/images/p-2-1614943799.png', 'polonia', 'masculino'),
(8, 'maria', 'rodriguez', '$2y$10$pAxw79JwvW.X6hrPouFk/uRPMNKbmtKCuATVx/F8oRPdAcsEHuU0K', 'maria@gre', 635230256, 'http://localhost/backendFestival/images/p-8-1615824214.jpg', 'Azerbaiyán', 'femenino'),
(15, 'david', 'rodriguez', '$2y$10$8KtXq7W0cD95wCD4/1/LyeyKOqiP5CvIHjvzEDA17DZNEqO72QrIy', 'david@ro', 623032563, 'http://localhost/backendFestival/images/p-15-1616082237.jpg', 'España', 'masculino'),
(16, 'roberto', 'calonge', '$2y$10$t2XqORjFqDwNNCrMSDjVfOtON7pKjD691vilF57EknhAeQOtaJfoi', 'roberto@sss', 632032566, 'http://localhost/backendFestival/images/p-16-1616095523.jpg', 'Colombia', 'masculino'),
(17, 'eeeeee', 'eeeeee', '$2y$10$ZjL8ylOm6P6TJfdAveKuS.Tw8XKdROPS.rni4wdi.3yIvp5CpZF16', 'eeeeeeee@ssss', 630560298, 'http://localhost/backendFestival/images/p-17-1616084951.jpg', 'Bahamas', 'masculino'),
(18, 'frfrrf', 'frfrrfr', '$2y$10$2qnoC6o1PLQhvjIZHpkd7u8WJFf2u8t1U5nnYroHOfWFilrgzwT8u', 'frfrrf@xssxs', 632032569, 'http://localhost/backendFestival/images/p-18-1616086423.jpg', 'Bahamas', 'femenino');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
