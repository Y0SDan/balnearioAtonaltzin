export class Cobros{
    IdCobro: number;
    IdReservacion: number;
    MontoCobrado: number;
    Fecha_Cobro: string;
    Estado: string;


    constructor() {
        this. IdCobro = 0;
        this. IdReservacion = 0;
        this. MontoCobrado = 0;
        this.Fecha_Cobro = '';
        this.Estado = 'pendiente';
    }
}