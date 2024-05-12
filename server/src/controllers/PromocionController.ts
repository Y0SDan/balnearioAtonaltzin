import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class PromocionController
{
    public async addPromocion(req: Request, res: Response): Promise<void> {
        const { id_cabana, descuento, Fecha_inicio, Fecha_fin } = req.body;
    
        // Verificar que las fechas sean válidas
        if (new Date(Fecha_inicio) >= new Date(Fecha_fin) || new Date(Fecha_inicio).getTime() === new Date(Fecha_fin).getTime()) {
            res.status(400).json({ message: 'Error: Las fechas de la promoción no son válidas' });
            return;
        }
    
        try {
            // Insertar la promoción
            const result = await pool.query("INSERT INTO promocion (id_cabana, descuento, Fecha_inicio, Fecha_fin) VALUES (?, ?, ?, ?)", [id_cabana, descuento, Fecha_inicio, Fecha_fin]);
            const ID_reservacion = result.insertId;
    
            res.json({ message: 'Reserva agregada exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al agregar la reserva' });
        }
    }
    
    public async showPromos(req: Request, res: Response ): Promise<void>{
        console.log("Promos");
        const respuesta = await pool.query('SELECT * FROM promocion');
        res.json( respuesta );
        console.log(respuesta);
        
    }
    public async showOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        console.log("id: ", id);
        
        const respuesta = await pool.query('SELECT * FROM promocion WHERE id_promocion = ?', [id]);
        if(respuesta.length>0){ 
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Promocion no encontrada'});
    }
    public async eliminarPromocion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM promocion WHERE id_promocion = ${id};`);
        res.json(resp);
    }

    // Actualizar una promoción y verificar que las fechas sean válidas
public async actualizarPromocion(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { id_cabana, descuento, Fecha_inicio, Fecha_fin } = req.body;

    // Verificar que las fechas sean válidas
    if (new Date(Fecha_inicio) >= new Date(Fecha_fin) || new Date(Fecha_inicio).getTime() === new Date(Fecha_fin).getTime()) {
        res.status(400).json({ message: 'Error: Las fechas de la promoción no son válidas' });
        return;
    }

    try {
        // Actualizar la promoción
        const result = await pool.query("UPDATE promocion SET id_cabana = ?, descuento = ?, Fecha_inicio = ?, Fecha_fin = ? WHERE id_promocion = ?", [id_cabana, descuento, Fecha_inicio, Fecha_fin, id]);

        res.json({ message: 'Promoción actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la promoción' });
    }
}


public async ObtenerDescuento(req: Request, res: Response): Promise<void> {
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
        const fechaRespuesta = await pool.query(fechaQuery, [id]);
        if (fechaRespuesta.length > 0 && fechaRespuesta[0].DentroDelRango === 1) {
            const descuentoRespuesta = await pool.query(descuentoQuery, [id]);
            if (descuentoRespuesta.length > 0) {
                const { Nombre, PrecioPorNoche, PrecioConDescuento } = descuentoRespuesta[0];
                res.json({ Nombre, PrecioPorNoche, PrecioConDescuento });
            } else {
                res.status(404).json({ message: 'No se encontró ninguna promoción activa para esta cabaña' });
            }
        } else {
            res.status(404).json({ message: 'La cabaña no se encuentra en promoción en este momento' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la promoción por ID de cabaña' });
    }
}



}
export const promocionesController = new PromocionController();