export class ReservacionAdmin{
    ID_Reservacion: number;
    ID_Cabana: number;
    ID_Cliente: number;
    FechaInicio: string;
    FechaFin: string;


    constructor() {
        this. ID_Reservacion = 0;
        this. ID_Cabana = 0;
        this. ID_Cliente = 0;
        this.FechaInicio = '';
        this.FechaFin = '';
    }
}