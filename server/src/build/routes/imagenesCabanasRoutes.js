"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImagenesCabanasController_1 = require("../controllers/ImagenesCabanasController");
class ImagenesCabanasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crearImagenCabana/', ImagenesCabanasController_1.imagenesCabanasController.addImage);
        this.router.get('/MostrarImagenesPorCabana/:id', ImagenesCabanasController_1.imagenesCabanasController.mostrarImagenesPorCabana);
        this.router.delete('/eliminarImagenCabana/:id', ImagenesCabanasController_1.imagenesCabanasController.deleteImage);
    }
}
const imagenesCabanasRoutes = new ImagenesCabanasRoutes();
exports.default = imagenesCabanasRoutes.router;
