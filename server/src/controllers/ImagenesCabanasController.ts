import { Request, Response } from 'express';
import pool from '../database'; //acceso a la base de datos

class ImagenesCabanasController {
    public async addImage(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO imagenescabanas set ?", [req.body]);
        res.json(resp);
    }
    public async mostrarImagenesPorCabana(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT * FROM imagenescabanas WHERE ID_Cabana = ?', [id]);
        if (respuesta.length > 0) {
            res.json(respuesta);
            return;
        }
        res.status(404).json({ 'mensaje': 'La cabaña no tiene imagenes' });
    }
    public async deleteImage(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM imagenescabanas WHERE id = ${id}`);
        res.json(resp);
    }
}
export const imagenesCabanasController = new ImagenesCabanasController();