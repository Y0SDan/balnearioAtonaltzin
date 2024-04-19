"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promocionesController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class PromocionController {
    addPromocion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cabana, descuento, Fecha_inicio, Fecha_fin } = req.body;
            // Verificar que las fechas sean válidas
            if (new Date(Fecha_inicio) >= new Date(Fecha_fin) || new Date(Fecha_inicio).getTime() === new Date(Fecha_fin).getTime()) {
                res.status(400).json({ message: 'Error: Las fechas de la promoción no son válidas' });
                return;
            }
            try {
                // Insertar la promoción
                const result = yield database_1.default.query("INSERT INTO promocion (id_cabana, descuento, Fecha_inicio, Fecha_fin) VALUES (?, ?, ?, ?)", [id_cabana, descuento, Fecha_inicio, Fecha_fin]);
                const ID_reservacion = result.insertId;
                res.json({ message: 'Reserva agregada exitosamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al agregar la reserva' });
            }
        });
    }
    showPromos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM Promocion');
            res.json(respuesta);
        });
    }
    showOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("id: ", id);
            const respuesta = yield database_1.default.query('SELECT * FROM promocion WHERE id_promocion = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Promocion no encontrada' });
        });
    }
    eliminarPromocion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM promocion WHERE id_promocion = ${id};`);
            res.json(resp);
        });
    }
    // Actualizar una promoción y verificar que las fechas sean válidas
    actualizarPromocion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id_cabana, descuento, Fecha_inicio, Fecha_fin } = req.body;
            // Verificar que las fechas sean válidas
            if (new Date(Fecha_inicio) >= new Date(Fecha_fin) || new Date(Fecha_inicio).getTime() === new Date(Fecha_fin).getTime()) {
                res.status(400).json({ message: 'Error: Las fechas de la promoción no son válidas' });
                return;
            }
            try {
                // Actualizar la promoción
                const result = yield database_1.default.query("UPDATE promocion SET id_cabana = ?, descuento = ?, Fecha_inicio = ?, Fecha_fin = ? WHERE id_promocion = ?", [id_cabana, descuento, Fecha_inicio, Fecha_fin, id]);
                res.json({ message: 'Promoción actualizada exitosamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al actualizar la promoción' });
            }
        });
    }
    ObtenerDescuento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const fechaQuery = `
        SELECT
            IF(CURDATE() BETWEEN STR_TO_DATE(Fecha_inicio, '%Y-%m-%d') AND STR_TO_DATE(Fecha_fin, '%Y-%m-%d'), 1, 0) AS DentroDelRango
        FROM
            promocion
        WHERE
            id_cabana = ?
    `;
            const descuentoQuery = `
        SELECT
            Nombre,
            PrecioPorNoche,
            PrecioPorNoche * (1 - descuento/100) AS PrecioConDescuento
        FROM
            cabana
            JOIN promocion ON cabana.ID_Cabana = promocion.id_cabana
        WHERE
            cabana.ID_Cabana = ?
    `;
            try {
                const fechaRespuesta = yield database_1.default.query(fechaQuery, [id]);
                if (fechaRespuesta.length > 0 && fechaRespuesta[0].DentroDelRango === 1) {
                    const descuentoRespuesta = yield database_1.default.query(descuentoQuery, [id]);
                    if (descuentoRespuesta.length > 0) {
                        const { Nombre, PrecioPorNoche, PrecioConDescuento } = descuentoRespuesta[0];
                        res.json({ Nombre, PrecioPorNoche, PrecioConDescuento });
                    }
                    else {
                        res.status(404).json({ message: 'No se encontró ninguna promoción activa para esta cabaña' });
                    }
                }
                else {
                    res.status(404).json({ message: 'La cabaña no se encuentra en promoción en este momento' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al obtener la promoción por ID de cabaña' });
            }
        });
    }
}
exports.promocionesController = new PromocionController();
