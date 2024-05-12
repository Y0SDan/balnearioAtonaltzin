export class Reservacion2{
    ID_Reservacion: number;
    ID_Cabana: number;
    ID_Cliente: number;
    FechaInicio: string;
    FechaFin: string;
    DiasReservados: number; // Nueva propiedad
    TotalAPagar: number; // Nueva propiedad
    PrecioPorNoche: number;
    


    constructor() {
        this. ID_Reservacion = 0;
        this. ID_Cabana = 2;
        this. ID_Cliente = parseInt(localStorage.getItem('ID_Cliente') ?? '-1');;
        this.FechaInicio = '';
        this.FechaFin = '';
        this.DiasReservados = 0; // Inicializar la propiedad
        this.TotalAPagar = 0; // Inicializar la propiedad
        this.PrecioPorNoche=0;

        
    }
}