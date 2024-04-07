"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PromocionController_1 = require("../controllers/PromocionController");
class promocionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/addPromocion/', PromocionController_1.promocionesController.addPromocion);
        this.router.get('/showPromos/', PromocionController_1.promocionesController.showPromos);
        this.router.get('/showOne/:id', PromocionController_1.promocionesController.showOne);
        this.router.get('/ObtenerDescuento/:id', PromocionController_1.promocionesController.ObtenerDescuento);
        this.router.delete('/eliminarPromocion/:id', PromocionController_1.promocionesController.eliminarPromocion);
        this.router.put('/actualizarPromocion/:id', PromocionController_1.promocionesController.actualizarPromocion);
    }
}
const promocionnRoutes = new promocionesRoutes();
exports.default = promocionnRoutes.router;
