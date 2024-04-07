export class Ofertas{
    id_promocion: number;
    id_cabana: number;
    descuento: number;
    Fecha_inicio: string;
    Fecha_fin: string;


    constructor() {
        this.id_promocion = 1;
        this.id_cabana = 1;
        this.descuento = 1;
        this.Fecha_inicio = " ";
        this.Fecha_fin = "  ";
    }
}