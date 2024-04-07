export class Ofertas{
    Id_promocion: number;
    Id_cabana: number;
    descuento: number;
    Fecha_Inicio: string;
    Fecha_Fin: string;


    constructor() {
        this.Id_promocion = 1;
        this.Id_cabana = 1;
        this.descuento = 1;
        this.Fecha_Inicio = " ";
        this.Fecha_Fin = "  ";
    }
}