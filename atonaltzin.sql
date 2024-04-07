-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-04-2024 a las 19:57:26
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atonaltzin`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

DROP TABLE IF EXISTS `administradores`;
CREATE TABLE IF NOT EXISTS `administradores` (
  `ID_Admin` int NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Contrasena` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID_Admin`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`ID_Admin`, `Usuario`, `Contrasena`) VALUES
(2, 'Admin2', '1223'),
(3, 'Admin2', '1233');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cabana`
--

DROP TABLE IF EXISTS `cabana`;
CREATE TABLE IF NOT EXISTS `cabana` (
  `ID_Cabana` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `PrecioPorNoche` decimal(10,2) DEFAULT NULL,
  `Capacidad` int DEFAULT NULL,
  `Ubicacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID_Cabana`),
  UNIQUE KEY `UQ_NombreCabana` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cabana`
--

INSERT INTO `cabana` (`ID_Cabana`, `Nombre`, `Descripcion`, `PrecioPorNoche`, `Capacidad`, `Ubicacion`) VALUES
(1, 'Cabana A', 'Para 2 personas, cómoda y cuenta con televisión', 800.00, 2, 'Carretera Teotongo sin #, Villa de Tamazulapm del progreso, Oaxaca'),
(2, 'Cabaña Z', 'Para 4 personas, cuenta con television, chimenea, cafetera y frigobar', 1600.00, 4, 'Carretera Teotongo sin #, Villa de Tamazulapm del progreso, Oaxaca'),
(3, 'Cabaña C', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 2400.00, 6, 'Carretera Teotongo sin #, Villa de Tamazulapm del progreso, Oaxaca'),
(4, 'Cabaña D', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 4000.00, 10, 'Carretera Teotongo sin #, Villa de Tamazulapm del progreso, Oaxaca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `ID_Cliente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'usuario',
  PRIMARY KEY (`ID_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_Cliente`, `Nombre`, `Apellido`, `Email`, `Telefono`, `password1`, `tipo`) VALUES
(27, 'Diego', 'Ramses', 'lorga_77@hotmail.com', '2345670987', '123', 'administrador'),
(37, 'Evan', 'Lorga', 'lorga@gmail.com', '9514567890', 'wuero', 'seller'),
(38, 'Diego Ramses ', 'Lorga Luz', 'ramseslorga@gmail.com', '9515451324', 'Reptilia', 'usuario'),
(42, 'Marcos', 'Martinez', 'marcos@gmail.com', '9876543210', '$2a$10$k63QEvPjeJ0AE9C5mkasve.RqURa1PMQnxAKzri99d8KhNZEiGBL6', 'seller'),
(45, 'Gizelle', 'Ramirez', 'gizelle@gmail.com', '9876543212', '$2a$10$K3jloKecgDaaUUfcE9w6EeNefjfUsqAe1HZkTn6nnb6/zocvpeNpO', 'administrador'),
(46, 'Ferras', 'Ramos', 'ferras@gmail.com', '987654331', '$2a$10$HaAqWzLOQ20DFgx2i5j0pulDuMHz/VN83qOABnbaF6Fu0Yyx2QWTy', 'usuario'),
(50, 'Ricardo Daniel', 'Lopez Jiménez', 'yosd4n@gmail.com', '+529513958304', '$2a$10$C43UCLEFvlFyw/hl6pKliemQkudKugQ0mJGE.cOj2XBzhM8CryYmq', 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cobros`
--

DROP TABLE IF EXISTS `cobros`;
CREATE TABLE IF NOT EXISTS `cobros` (
  `IdCobro` int NOT NULL AUTO_INCREMENT,
  `IdReservacion` int DEFAULT NULL,
  `MontoCobrado` decimal(10,0) DEFAULT NULL,
  `Fecha_Cobro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IdCobro`),
  KEY `IdReservacion` (`IdReservacion`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cobros`
--

INSERT INTO `cobros` (`IdCobro`, `IdReservacion`, `MontoCobrado`, `Fecha_Cobro`, `Estado`) VALUES
(1, 1, 600, '2024-05-19', 'pagado'),
(2, 2, 1200, '2023-08-15', 'pagado'),
(3, 3, 1800, '2023-09-10', 'pagado'),
(94, 75, 4000, NULL, NULL),
(95, 76, 2400, NULL, NULL),
(99, 80, 1600, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
CREATE TABLE IF NOT EXISTS `imagenes` (
  `IdImagen` int NOT NULL AUTO_INCREMENT,
  `IdCabana` int DEFAULT NULL,
  `NombreImagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DescripcionCabana` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IdImagen`),
  KEY `IdCabana` (`IdCabana`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`IdImagen`, `IdCabana`, `NombreImagen`, `DescripcionCabana`, `Imagen`) VALUES
(1, 1, 'CabanaA1.jpg', 'Para 2 personas, comoda y cuenta con television', 'C:/Users/Ramses/Downloads/Cabanas/CabanaA1.jpg'),
(2, 1, 'CabanaA2.jpg', 'Para 2 personas, comoda y cuenta con television', 'C:/Users/Ramses/Downloads/Cabanas/CabanaA2.jpg'),
(3, 1, 'CabanaA3.jpg', 'Para 2 personas, comoda y cuenta con television', 'C:/Users/Ramses/Downloads/Cabanas/CabanaA3.jpg'),
(4, 1, 'CabanaA4.jpg', 'Para 2 personas, comoda y cuenta con television', 'C:/Users/Ramses/Downloads/Cabanas/CabanaA4.jpg'),
(5, 1, 'CabanaA5.jpg', 'Para 2 personas, comoda y cuenta con television', 'C:/Users/Ramses/Downloads/Cabanas/CabanaA5.jpg'),
(6, 1, 'CabanaA6.jpg', 'Para 2 personas, comoda y cuenta con television', 'C:/Users/Ramses/Downloads/Cabanas/CabanaA6.jpg'),
(7, 2, 'CabanaB1.jpg', 'Para 4 personas, cuenta con televisión, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaB1.jpg'),
(8, 2, 'CabanaB2.jpg', 'Para 4 personas, cuenta con televisión, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaB2.jpg'),
(9, 2, 'CabanaB3.jpg', 'Para 4 personas, cuenta con televisión, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaB3.jpg'),
(10, 2, 'CabanaB4.jpg', 'Para 4 personas, cuenta con televisión, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaB4.jpg'),
(11, 2, 'CabanaB5.jpg', 'Para 4 personas, cuenta con televisión, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaB5.jpg'),
(12, 2, 'CabanaB6.jpg', 'Para 4 personas, cuenta con televisión, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaB6.jpg'),
(13, 3, 'CabanaC1.jpg', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaC1.jpg'),
(14, 3, 'CabanaC2.jpg', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaC2.jpg'),
(15, 3, 'CabanaC3.jpg', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaC3.jpg'),
(16, 3, 'CabanaC4.jpg', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaC4.jpg'),
(17, 3, 'CabanaC5.jpg', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaC5.jpg'),
(18, 3, 'CabanaC6.jpg', 'Para 6 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaC6.jpg'),
(19, 4, 'CabanaD1.jpg', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaD1.jpg'),
(20, 4, 'CabanaD2.jpg', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaD2.jpg'),
(21, 4, 'CabanaD3.jpg', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaD3.jpg'),
(22, 4, 'CabanaD4.jpg', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaD4.jpg'),
(23, 4, 'CabanaD5.jpg', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaD5.jpg'),
(24, 4, 'CabanaD6.jpg', 'Para 10 personas, cuenta con television, chimenea, cafetera y frigobar', 'C:/Users/Ramses/Downloads/Cabanas/CabanaD6.jpg'),
(26, 19, 'Cabaña T2', 'Para 14 personas, cómoda, cuenta con televisión, cocina, fogata e internet', 'C:/Users/Ramses/Downloads/Cabanas/CabanaT2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

DROP TABLE IF EXISTS `reservaciones`;
CREATE TABLE IF NOT EXISTS `reservaciones` (
  `ID_Reservacion` int NOT NULL AUTO_INCREMENT,
  `ID_Cabana` int DEFAULT NULL,
  `ID_Cliente` int DEFAULT NULL,
  `FechaInicio` varchar(19) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FechaFin` varchar(19) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID_Reservacion`),
  KEY `ID_Cabaña` (`ID_Cabana`),
  KEY `ID_Cliente` (`ID_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`ID_Reservacion`, `ID_Cabana`, `ID_Cliente`, `FechaInicio`, `FechaFin`) VALUES
(1, 1, 1, '2023-07-01', '2023-07-12'),
(2, 2, 2, '2023-08-15', '2023-08-20'),
(3, 3, 3, '2023-09-10', '2023-09-15'),
(74, 1, 38, '2024-03-11', '2024-03-15'),
(75, 1, 38, '2024-03-11', '2024-03-15'),
(76, 1, 27, '2024-03-11', '2024-03-13'),
(80, 1, 27, '2024-03-11', '2024-03-12'),
(82, 1, 42, '2024-03-18', '2024-03-21');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cobros`
--
ALTER TABLE `cobros`
  ADD CONSTRAINT `cobros_ibfk_1` FOREIGN KEY (`IdReservacion`) REFERENCES `reservaciones` (`ID_Reservacion`),
  ADD CONSTRAINT `fk_cobros_reservaciones` FOREIGN KEY (`IdReservacion`) REFERENCES `reservaciones` (`ID_Reservacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD CONSTRAINT `ID_Cabana` FOREIGN KEY (`ID_Cabana`) REFERENCES `cabana` (`ID_Cabana`) ON DELETE CASCADE,
  ADD CONSTRAINT `NombreDeLaNuevaRestriccion` FOREIGN KEY (`ID_Cabana`) REFERENCES `cabana` (`ID_Cabana`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;