export class Reservacion4{
    ID_Reservacion: number;
    ID_Cabana: number;
    ID_Cliente: number;
    FechaInicio: string;
    FechaFin: string;


    constructor() {
        this. ID_Reservacion = 0;
        this. ID_Cabana = 4;
        this. ID_Cliente = parseInt(localStorage.getItem('ID_Cliente') ?? '-1');;
        this.FechaInicio = '';
        this.FechaFin = '';
    }
}