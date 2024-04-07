export class Ofertas{
    id_promocion: number;
    id_cabana: number;
    descuento: number;
    Fecha_inicio: string;
    Fecha_fin: string;


    constructor() {
        this.id_promocion = 0;
        this.id_cabana = 2;
        this.descuento = 15;
        this.Fecha_inicio = " ";
        this.Fecha_fin = " ";
    }
}