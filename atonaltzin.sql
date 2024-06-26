-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-05-2024 a las 07:50:09
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

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
  `Description` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `PrecioPorNoche` decimal(10,2) DEFAULT NULL,
  `Capacidad` int DEFAULT NULL,
  `foto` int NOT NULL,
  PRIMARY KEY (`ID_Cabana`),
  UNIQUE KEY `UQ_NombreCabana` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cabana`
--

INSERT INTO `cabana` (`ID_Cabana`, `Nombre`, `Descripcion`, `Description`, `PrecioPorNoche`, `Capacidad`, `foto`) VALUES
(1, 'Cabana A', 'Cómoda recámara equipada con 1 cama matrimonial, baño completo,\n          internet,\n          frigobar y cafetera.', 'Comfortable bedroom equipped with 1 double bed, bathroom, internet, frigobar and coffee maker.', '800.00', 2, 1),
(2, 'Cabaña Z', 'Acogedora cabaña de dos niveles con cuarto compartido, dos camas\n          matrimoniales,\n          baño completo con calentador solar, servicio de internet, TV con\n          cable, cafetera, frigobar\n          y chimenea con leña.', 'Comfortable two-level cabin with shared bedroom, two double beds, full bathroom with solar heater, internet service, cable TV, coffee maker, minibar and fireplace with wood burning stove.', '1600.00', 4, 1),
(3, 'Cabaña C', 'Acogedora cabaña de dos niveles, con sala en el primer nivel,\n          servicio de internet,\n          cafetera, frigobar, TV con cable, habitación compartida\n          con 3 camas matrimoniales, baño completo y chimenea con\n          leña.', 'Comfortable two level cabin, with living room, internet service, coffee maker, minibar, cable TV, shared bedroom with 3 double beds, full bathroom and fireplace with wood burning stove.', '2400.00', 6, 1),
(4, 'Cabaña D', 'Acogedora cabaña de dos niveles, con sala y baño en el primer\n          nivel, baño completo con calentador solar,\n          habitación compartida con 5 camas matrimoniales, chimenea con\n          leña, frigobar,\n          servicio de internet, TV con cable y cafetera.', 'Comfortable two level cabin, with living room and bathroom on the first level, full bathroom with solar heater, shared bedroom with 5 double beds, fireplace with wood burning stove, mini-bar, internet service, cable TV and coffee maker.', '4000.00', 10, 1);

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
  `foto` int NOT NULL,
  `Type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`ID_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_Cliente`, `Nombre`, `Apellido`, `Email`, `Telefono`, `password1`, `tipo`, `foto`, `Type`) VALUES
(27, 'Diego', 'Ramses', 'lorga_77@hotmail.com', '2345670987', '$2a$10$BWrDBpKUDsEop.KWmwF20uHjXzOzqFFd.3J2SQVCtMu7IZL0Upz9y', 'usuario', 1, 'user'),
(37, 'Evan', 'Lorga', 'lorga@gmail.com', '9514567890', '$2a$10$WiGup3/zK1m1KHsXJAh0c.8odfWcHL1.klFW5suxUq6weApZcTdvW', 'usuario', 0, 'user'),
(38, 'Diego Ramses ', 'Lorga Luz', 'ramseslorga@gmail.com', '9515451324', 'Reptilia', 'vendedor', 1, 'seller'),
(42, 'Marcos', 'Martinez', 'marcos@gmail.com', '9876543210', '$2a$10$k63QEvPjeJ0AE9C5mkasve.RqURa1PMQnxAKzri99d8KhNZEiGBL6', 'vendedor', 1, 'seller'),
(45, 'Gizelle', 'Ramirez', 'gizelle@gmail.com', '9876543212', '$2a$10$K3jloKecgDaaUUfcE9w6EeNefjfUsqAe1HZkTn6nnb6/zocvpeNpO', 'administrador', 1, 'administrator'),
(46, 'Ferras', 'Ramos', 'ferras@gmail.com', '987654331', '$2a$10$HaAqWzLOQ20DFgx2i5j0pulDuMHz/VN83qOABnbaF6Fu0Yyx2QWTy', 'usuario', 1, 'user'),
(48, 'Andres', 'Lopez', 'amlo@gmail.com', '9876543212', '$2a$10$sZF/W4C7TB5deqBKJ42z3eS5G04fnLF/2k0oiKsFaI8GaSJxDaU6G', 'usuario', 1, 'user'),
(49, 'Felipe', 'Lopez', 'felipe@gmail.com', '2123213123', '$2a$10$1wPJAls1.UGeL9YTarnwMeiyMF91x.YTB9S629TRRZrDJ3VBNuQWy', 'vendedor', 1, 'seller'),
(50, 'Juan', 'Molar', 'juan@gmail.com', '131313131', '$2a$10$dTVrrl1fCZdMmoVoAAC9AOofrThcUOyDzZp0HlGIO5LMkNw9DPiqG', 'usuario', 1, 'user'),
(51, 'Luis', 'Padilla Martinez', 'jorgepad002@gmail.com', '9532391234', '$2a$10$1IklUwL1Fl3Im6eI1vn6yOXaUpe0.Kb8ycU7eqevsgnJXe081tMUu', 'usuario', 1, 'user'),
(55, 'Pancho ', 'Lopez', 'pancho123@gmail.com', '9535371545', '$2a$10$YBYkCAeeYrrCnxRzp0zWn.52OSl33b/dFG2OW1uvGDVN/cMaQIHkC', 'administrador', 0, 'administrator'),
(56, 'Diego Ramses', 'Lorga Luz', 'diego0101@gmail.com', '9535371545', '$2a$10$Im24EFcFBjh3zaXUXOhneecTUlMktlCVwlecTIJd7nV4NTNdQHjx2', 'usuario', 0, 'user'),
(59, 'Diego Ramses', 'Lorga Luz', 'diego0121@gmail.com', '9535371545', '$2a$10$.AwlHzx.1YPpWMxJ8TCPYePrWhzap0DknkTk3NrhuGQMddHlL9F6.', 'usuario', 0, 'user'),
(60, 'Diego', 'Morales', 'morales@gmail.com', '21142', '$2a$10$oaRSm7znCScgqdAr234zLuOcjXpPCEi.AN5kX.kQ7kDAZC5zQwTLC', 'usuario', 0, 'user');

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
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cobros`
--

INSERT INTO `cobros` (`IdCobro`, `IdReservacion`, `MontoCobrado`, `Fecha_Cobro`, `Estado`) VALUES
(1, 1, '600', '2024-05-19', 'pagado'),
(2, 2, '1200', '2023-08-15', 'pagado'),
(3, 3, '1800', '2023-09-10', 'pagado'),
(94, 75, '4000', '2024-03-19', 'pagado'),
(95, 76, '2400', '2024-03-20', 'pagado'),
(99, 80, '1600', '2024-03-21', 'pagado'),
(105, 85, '2400', '2024-03-31 23:10:31', 'Pagado'),
(106, 86, '4000', '2024-03-31 23:10:40', 'Pagado'),
(107, 87, '4000', '2024-03-31 23:10:47', 'Pagado'),
(108, 88, '3200', '2024-03-31 23:17:58', 'Pagado'),
(109, 89, '3200', '2024-04-01 10:35:27', 'Pagado'),
(130, 110, '3200', '2024-04-19 06:26:18', 'Pagado'),
(131, 111, '6400', '2024-04-19 08:49:15', 'Paid'),
(132, 112, '1600', '2024-04-19 08:49:25', 'Pagado'),
(133, 113, '6400', NULL, 'Sin pagar'),
(134, 114, '1600', '2024-04-29 00:34:55', 'Paid'),
(135, 115, '800', NULL, 'Sin pagar');

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
-- Estructura de tabla para la tabla `imagenescabanas`
--

DROP TABLE IF EXISTS `imagenescabanas`;
CREATE TABLE IF NOT EXISTS `imagenescabanas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ID_Cabana` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `imagenescabanas`
--

INSERT INTO `imagenescabanas` (`id`, `ID_Cabana`) VALUES
(2, 2),
(1, 1),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promocion`
--

DROP TABLE IF EXISTS `promocion`;
CREATE TABLE IF NOT EXISTS `promocion` (
  `id_promocion` int NOT NULL AUTO_INCREMENT,
  `id_cabana` int NOT NULL,
  `descuento` int NOT NULL,
  `Fecha_inicio` varchar(19) NOT NULL,
  `Fecha_fin` varchar(19) NOT NULL,
  PRIMARY KEY (`id_promocion`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `promocion`
--

INSERT INTO `promocion` (`id_promocion`, `id_cabana`, `descuento`, `Fecha_inicio`, `Fecha_fin`) VALUES
(1, 1, 12, '2024-04-05', '2024-04-09'),
(2, 1, 25, '2024-04-02', '2024-04-08'),
(3, 2, 20, '2024-04-02', '2024-04-06'),
(5, 1, 10, '2024-04-04', '2024-04-08'),
(6, 1, 8, '2024-04-04', '2024-04-10'),
(7, 2, 10, '2024-04-05', '2024-04-12'),
(9, 3, 35, '2024-04-09', '2024-04-29'),
(11, 2, 25, '2024-04-10', '2024-04-15');

--
-- Disparadores `promocion`
--
DROP TRIGGER IF EXISTS `before_insert_promocion`;
DELIMITER $$
CREATE TRIGGER `before_insert_promocion` BEFORE INSERT ON `promocion` FOR EACH ROW BEGIN
    IF NEW.Fecha_inicio >= NEW.Fecha_fin OR NEW.Fecha_inicio = NEW.Fecha_fin THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Las fechas de la promoción no son válidas';
    END IF;
END
$$
DELIMITER ;

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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(82, 1, 42, '2024-03-18', '2024-03-21'),
(83, 1, 48, '2024-03-20', '2024-03-22'),
(84, 1, 48, '2024-03-20', '2024-03-25'),
(85, 1, 48, '2024-03-28', '2024-03-30'),
(86, 1, 48, '2024-03-02', '2024-03-06'),
(87, 1, 48, '2024-03-02', '2024-03-06'),
(88, 1, 48, '2024-03-03', '2024-03-06'),
(89, 1, 48, '2024-03-04', '2024-03-07'),
(90, 1, 48, '2024-03-04', '2024-03-06'),
(91, 1, 48, '2024-03-04', '2024-03-06'),
(92, 2, 48, '2024-03-05', '2024-03-07'),
(93, 2, 48, '2024-03-06', '2024-03-07'),
(94, 1, 48, '2024-03-05', '2024-03-08'),
(110, 1, -1, '2024-04-22', '2024-04-26'),
(111, 2, 48, '2024-04-08', '2024-04-12'),
(112, 2, 48, '2024-04-25', '2024-04-26'),
(113, 2, 48, '2024-04-15', '2024-04-19'),
(114, 2, 48, '2024-04-29', '2024-04-30'),
(115, 1, 48, '2024-05-22', '2024-05-23');

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
